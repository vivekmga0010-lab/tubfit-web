import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-public-assets',
      configureServer(server) {
        server.middlewares.use('/admin', (req, res) => {
          const adminPath = path.resolve('public/admin.html');
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(fs.readFileSync(adminPath, 'utf8'));
        });
        server.middlewares.use('/uploads', express.static(path.resolve('public/uploads')));
        server.middlewares.use('/Favicon.png', express.static(path.resolve('public/Favicon.png')));
      },
    },
  ],
  publicDir: false,
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
