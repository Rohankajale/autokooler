import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "tailwindcss";

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    plugins: [react()],
    server: {
    host: true,
    strictPort: true,
    port: 8000,
    },
    base: '/autokooler.onrender.com/',
  };
});