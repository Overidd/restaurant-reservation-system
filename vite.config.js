// vite.config.js
import path from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const viteConfig = defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setupTest.js',
    include: ['./test/**/*.test.jsx'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  base: '/',
})

export default viteConfig
