import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate and normalize contact form payload.
 */
export function validateContactPayload(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const subject = typeof body?.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!name || name.length > 120) {
    return { error: 'Please provide a valid name (1-120 characters).' };
  }
  if (!email || email.length > 255 || !EMAIL_REGEX.test(email)) {
    return { error: 'Please provide a valid email address.' };
  }
  if (!subject || subject.length > 255) {
    return { error: 'Please provide a valid subject (1-255 characters).' };
  }
  if (!message || message.length < 10 || message.length > 5000) {
    return { error: 'Please provide a message between 10 and 5000 characters.' };
  }

  return { data: { name, email, subject, message } };
}

/**
 * Create public contact submission and protected admin messages routers.
 */
export function createContactRouter(pool) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { data, error } = validateContactPayload(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    try {
      const result = await pool.query(
        `INSERT INTO contact_messages (name, email, subject, message)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, subject, message, is_read, created_at`,
        [data.name, data.email, data.subject, data.message]
      );

      return res.status(201).json({
        success: true,
        message: result.rows[0],
      });
    } catch (err) {
      console.error('Failed to save contact message:', err);
      return res.status(500).json({ error: 'Unable to save message right now. Please try again later.' });
    }
  });

  return router;
}

/**
 * Create protected admin messages router (list, mark read/unread, delete).
 */
export function createMessagesRouter(pool) {
  const router = express.Router();

  router.use(requireAuth);

  router.get('/', async (req, res) => {
    try {
      const status = typeof req.query.status === 'string' ? req.query.status : 'all';
      const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';

      const conditions = [];
      const values = [];

      if (status === 'unread') {
        conditions.push('is_read = FALSE');
      } else if (status === 'read') {
        conditions.push('is_read = TRUE');
      }

      if (search) {
        values.push(`%${search}%`);
        const idx = values.length;
        conditions.push(
          `(name ILIKE $${idx} OR email ILIKE $${idx} OR subject ILIKE $${idx} OR message ILIKE $${idx})`
        );
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      const [messagesResult, countsResult] = await Promise.all([
        pool.query(
          `SELECT id, name, email, subject, message, is_read, created_at
           FROM contact_messages
           ${whereClause}
           ORDER BY created_at DESC`,
          values
        ),
        pool.query(
          `SELECT
             COUNT(*)::int AS total_count,
             COUNT(*) FILTER (WHERE is_read = FALSE)::int AS unread_count
           FROM contact_messages`
        ),
      ]);

      const counts = countsResult.rows[0] || { total_count: 0, unread_count: 0 };

      return res.json({
        messages: messagesResult.rows,
        totalCount: counts.total_count,
        unreadCount: counts.unread_count,
      });
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      return res.status(500).json({ error: 'Failed to load messages' });
    }
  });

  router.patch('/:id/read', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    const isRead = typeof req.body?.is_read === 'boolean' ? req.body.is_read : true;

    try {
      const result = await pool.query(
        `UPDATE contact_messages
         SET is_read = $1
         WHERE id = $2
         RETURNING id, name, email, subject, message, is_read, created_at`,
        [isRead, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.json({ message: result.rows[0] });
    } catch (err) {
      console.error('Failed to update message status:', err);
      return res.status(500).json({ error: 'Failed to update message' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    try {
      const result = await pool.query(
        `DELETE FROM contact_messages WHERE id = $1 RETURNING id`,
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.json({ success: true, id });
    } catch (err) {
      console.error('Failed to delete message:', err);
      return res.status(500).json({ error: 'Failed to delete message' });
    }
  });

  return router;
}
