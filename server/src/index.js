import dotenv from 'dotenv';
import { createPool, initDb } from './db.js';
import { createApp } from './app.js';

dotenv.config({ path: new URL('../.env', import.meta.url) });

const PORT = Number(process.env.PORT) || 5005;

async function start() {
  const pool = createPool();
  await initDb(pool);

  const app = createApp(pool);
  app.listen(PORT, () => {
    console.log(`Portfolio Messages API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
