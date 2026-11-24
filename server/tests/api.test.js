import test from 'node:test';
import assert from 'node:assert/strict';
import { PassThrough, Readable } from 'node:stream';
import { createApp } from '../src/app.js';

function createMockPool() {
  const rows = [];
  let nextId = 1;

  return {
    rows,
    async query(sql, params = []) {
      const normalized = sql.replace(/\s+/g, ' ').trim();

      if (normalized === 'SELECT 1') {
        return { rows: [{ '?column?': 1 }], rowCount: 1 };
      }

      if (normalized.startsWith('INSERT INTO contact_messages')) {
        const [name, email, subject, message] = params;
        const record = {
          id: nextId++,
          name,
          email,
          subject,
          message,
          is_read: false,
          created_at: new Date().toISOString(),
        };
        rows.unshift(record);
        return { rows: [record], rowCount: 1 };
      }

      if (normalized.includes('COUNT(*)::int AS total_count')) {
        const unread = rows.filter((r) => !r.is_read).length;
        return {
          rows: [{ total_count: rows.length, unread_count: unread }],
          rowCount: 1,
        };
      }

      if (
        normalized.startsWith(
          'SELECT id, name, email, subject, message, is_read, created_at FROM contact_messages'
        )
      ) {
        let filtered = [...rows];
        if (normalized.includes('is_read = FALSE')) {
          filtered = filtered.filter((r) => !r.is_read);
        } else if (normalized.includes('is_read = TRUE')) {
          filtered = filtered.filter((r) => r.is_read);
        }
        if (params.length > 0) {
          const term = params[0].replace(/%/g, '').toLowerCase();
          filtered = filtered.filter(
            (r) =>
              r.name.toLowerCase().includes(term) ||
              r.email.toLowerCase().includes(term) ||
              r.subject.toLowerCase().includes(term) ||
              r.message.toLowerCase().includes(term)
          );
        }
        return { rows: filtered, rowCount: filtered.length };
      }

      if (normalized.startsWith('UPDATE contact_messages SET is_read')) {
        const [isRead, id] = params;
        const found = rows.find((r) => r.id === id);
        if (!found) return { rows: [], rowCount: 0 };
        found.is_read = isRead;
        return { rows: [found], rowCount: 1 };
      }

      if (normalized.startsWith('DELETE FROM contact_messages')) {
        const [id] = params;
        const idx = rows.findIndex((r) => r.id === id);
        if (idx === -1) return { rows: [], rowCount: 0 };
        const [removed] = rows.splice(idx, 1);
        return { rows: [{ id: removed.id }], rowCount: 1 };
      }

      throw new Error(`Unexpected SQL in mock pool: ${normalized}`);
    },
  };
}

/**
 * Invoke an Express app in-process without opening TCP sockets.
 */
function invokeApp(app, { method = 'GET', url = '/', headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const bodyString = body !== undefined ? JSON.stringify(body) : null;
    const req = new Readable({
      read() {
        if (bodyString !== null) {
          this.push(bodyString);
        }
        this.push(null);
      },
    });

    const normalizedHeaders = {};
    for (const [k, v] of Object.entries(headers)) {
      normalizedHeaders[k.toLowerCase()] = v;
    }
    if (bodyString !== null) {
      normalizedHeaders['content-type'] = 'application/json';
      normalizedHeaders['content-length'] = String(Buffer.byteLength(bodyString));
    }

    req.method = method;
    req.url = url;
    req.headers = normalizedHeaders;
    const mockSocket = new PassThrough();
    req.connection = mockSocket;
    req.socket = mockSocket;

    const resHeaders = {};
    const chunks = [];
    const res = {
      statusCode: 200,
      locals: {},
      setHeader(name, value) {
        resHeaders[name.toLowerCase()] = value;
      },
      getHeader(name) {
        return resHeaders[name.toLowerCase()];
      },
      removeHeader(name) {
        delete resHeaders[name.toLowerCase()];
      },
      writeHead(code, hdrs) {
        this.statusCode = code;
        if (hdrs) {
          for (const [k, v] of Object.entries(hdrs)) {
            this.setHeader(k, v);
          }
        }
        return this;
      },
      write(chunk) {
        if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        return true;
      },
      end(chunk) {
        if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        const text = Buffer.concat(chunks).toString('utf8');
        let json = null;
        try {
          json = text ? JSON.parse(text) : null;
        } catch {
          json = null;
        }
        resolve({ status: this.statusCode, headers: resHeaders, text, json });
      },
    };

    app.handle(req, res, (err) => {
      if (err) reject(err);
      else resolve({ status: 404, headers: resHeaders, text: '', json: null });
    });
  });
}

test('contact submission saves message and requires login to view/manage', async () => {
  process.env.ADMIN_EMAIL = 'admin@example.com';
  process.env.ADMIN_PASSWORD = 'super-secret-password';
  process.env.JWT_SECRET = 'test-jwt-secret-key-for-unit-tests';

  const pool = createMockPool();
  const app = createApp(pool);

  // 1. Unauthenticated /api/messages must return 401
  const unauthRes = await invokeApp(app, { method: 'GET', url: '/api/messages' });
  assert.equal(unauthRes.status, 401);

  // 2. Invalid contact submission returns 400
  const badContactRes = await invokeApp(app, {
    method: 'POST',
    url: '/api/contact',
    body: { name: 'Test', email: 'bad-email', subject: 'Hi', message: 'short' },
  });
  assert.equal(badContactRes.status, 400);

  // 3. Valid contact submission saves message (201)
  const contactRes = await invokeApp(app, {
    method: 'POST',
    url: '/api/contact',
    body: {
      name: 'Alice',
      email: 'alice@example.com',
      subject: 'Project Inquiry',
      message: 'Hello Prem, would love to collaborate on a MERN app.',
    },
  });
  assert.equal(contactRes.status, 201);
  assert.equal(contactRes.json.success, true);
  assert.equal(contactRes.json.message.name, 'Alice');
  assert.equal(contactRes.json.message.is_read, false);

  // 4. Wrong credentials fail login
  const badLoginRes = await invokeApp(app, {
    method: 'POST',
    url: '/api/auth/login',
    body: { email: 'admin@example.com', password: 'wrong' },
  });
  assert.equal(badLoginRes.status, 401);

  // 5. Valid credentials succeed and return token + set cookie
  const loginRes = await invokeApp(app, {
    method: 'POST',
    url: '/api/auth/login',
    body: { email: 'admin@example.com', password: 'super-secret-password' },
  });
  assert.equal(loginRes.status, 200);
  assert.equal(loginRes.json.admin.email, 'admin@example.com');
  assert.ok(loginRes.json.token);
  const setCookie = loginRes.headers['set-cookie'];
  assert.ok(setCookie && String(setCookie).includes('admin_token='));

  const authHeaders = { Authorization: `Bearer ${loginRes.json.token}` };

  // 6. Authenticated admin can fetch messages
  const listRes = await invokeApp(app, {
    method: 'GET',
    url: '/api/messages',
    headers: authHeaders,
  });
  assert.equal(listRes.status, 200);
  assert.equal(listRes.json.totalCount, 1);
  assert.equal(listRes.json.unreadCount, 1);
  assert.equal(listRes.json.messages[0].subject, 'Project Inquiry');

  // 7. Mark message as read
  const readRes = await invokeApp(app, {
    method: 'PATCH',
    url: `/api/messages/${contactRes.json.message.id}/read`,
    headers: authHeaders,
    body: { is_read: true },
  });
  assert.equal(readRes.status, 200);
  assert.equal(readRes.json.message.is_read, true);

  // 8. Delete message
  const delRes = await invokeApp(app, {
    method: 'DELETE',
    url: `/api/messages/${contactRes.json.message.id}`,
    headers: authHeaders,
  });
  assert.equal(delRes.status, 200);

  const emptyRes = await invokeApp(app, {
    method: 'GET',
    url: '/api/messages',
    headers: authHeaders,
  });
  assert.equal(emptyRes.json.totalCount, 0);
});
