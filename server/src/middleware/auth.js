import jwt from 'jsonwebtoken';

export const AUTH_COOKIE_NAME = 'admin_token';

/**
 * Resolve the JWT signing secret from environment variables.
 */
export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not configured.');
  }
  return secret;
}

/**
 * Extract JWT from the httpOnly cookie or Authorization Bearer header.
 */
export function extractToken(req) {
  const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];
  if (cookieToken) {
    return cookieToken;
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  return null;
}

/**
 * Express middleware ensuring the request carries a valid admin JWT.
 */
export function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.admin = { email: payload.email };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}
