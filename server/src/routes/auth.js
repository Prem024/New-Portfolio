import crypto from 'node:crypto';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, getJwtSecret, requireAuth } from '../middleware/auth.js';

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

/**
 * Compare two strings in constant time to avoid timing side-channels.
 */
function timingSafeMatch(input, expected) {
  const inputBuf = Buffer.from(input, 'utf8');
  const expectedBuf = Buffer.from(expected, 'utf8');
  if (inputBuf.length !== expectedBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(inputBuf, expectedBuf);
}

/**
 * Verify password against ADMIN_PASSWORD_HASH (bcrypt) or ADMIN_PASSWORD.
 */
async function verifyAdminPassword(password) {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  const plainPassword = process.env.ADMIN_PASSWORD;
  if (!plainPassword) {
    throw new Error('Neither ADMIN_PASSWORD_HASH nor ADMIN_PASSWORD is configured.');
  }

  return timingSafeMatch(password, plainPassword);
}

/**
 * Build cookie options appropriate for local dev vs production HTTPS.
 */
function getCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    maxAge: TOKEN_TTL_SECONDS * 1000,
    path: '/',
  };
}

/**
 * Create authentication router for admin login, logout, and session check.
 */
export function createAuthRouter() {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    try {
      const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
      const password = typeof req.body?.password === 'string' ? req.body.password : '';

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      if (!configuredEmail) {
        return res.status(500).json({ error: 'Admin email is not configured on the server' });
      }

      const emailMatches = email.toLowerCase() === configuredEmail;
      const passwordMatches = await verifyAdminPassword(password);

      if (!emailMatches || !passwordMatches) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ email: configuredEmail }, getJwtSecret(), {
        expiresIn: TOKEN_TTL_SECONDS,
      });

      res.cookie(AUTH_COOKIE_NAME, token, getCookieOptions());
      return res.json({
        admin: { email: configuredEmail },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Authentication service failed' });
    }
  });

  router.post('/logout', (_req, res) => {
    const { maxAge: _maxAge, ...clearOpts } = getCookieOptions();
    res.clearCookie(AUTH_COOKIE_NAME, clearOpts);
    return res.json({ success: true });
  });

  router.get('/me', requireAuth, (req, res) => {
    return res.json({ admin: req.admin });
  });

  return router;
}
