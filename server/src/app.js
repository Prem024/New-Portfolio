import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createAuthRouter } from './routes/auth.js';
import { createContactRouter, createMessagesRouter } from './routes/messages.js';

/**
 * Parse comma-separated CLIENT_ORIGIN env var into an allowed origins list.
 */
function getAllowedOrigins() {
  const raw = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

/**
 * Construct and configure the Express application with injected pg Pool.
 */
export function createApp(pool) {
  const app = express();
  const allowedOrigins = getAllowedOrigins();

  app.use(
    cors({
      origin(origin, callback) {
        // Allow requests without Origin header (curl, server-to-server, same-origin proxy)
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true,
    })
  );

  app.use(express.json({ limit: '100kb' }));
  app.use(cookieParser());

  app.get('/api/health', async (_req, res) => {
    try {
      await pool.query('SELECT 1');
      return res.json({ status: 'ok', database: 'connected' });
    } catch (err) {
      console.error('Health check DB error:', err);
      return res.status(503).json({ status: 'error', database: 'disconnected' });
    }
  });

  app.use('/api/auth', createAuthRouter());
  app.use('/api/contact', createContactRouter(pool));
  app.use('/api/messages', createMessagesRouter(pool));

  return app;
}
