import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-public-assets',
      configureServer(server) {
        server.middlewares.use('/admin', (req, res, next) => {
          const adminPath = path.resolve('public/admin.html');
          if (fs.existsSync(adminPath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(adminPath, 'utf8'));
          } else {
            next();
          }
        });
      },
    },
  ],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/uploads': 'http://localhost:3000',
    },
  },
});
