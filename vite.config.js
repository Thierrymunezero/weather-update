
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  base: '/', // Set this to your subpath if needed (e.g., '/subpath/')
  plugins: [react()],
  server: {
    host: true,
    port: process.env.PORT || 3000,
  },
  build: {
    outDir: 'dist', // Default is 'dist', but you can change it
  },
}));
