import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function resolveBackendTarget(): string {
  if (process.env.VITE_API_PROXY_TARGET) {
    return process.env.VITE_API_PROXY_TARGET;
  }

  const serverEnvPath = path.resolve(__dirname, 'server/.env');
  if (fs.existsSync(serverEnvPath)) {
    const match = fs.readFileSync(serverEnvPath, 'utf8').match(/^PORT=(\d+)/m);
    if (match) {
      return `http://localhost:${match[1]}`;
    }
  }

  return 'http://localhost:5005';
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: resolveBackendTarget(),
        changeOrigin: true,
      },
    },
  },
});
