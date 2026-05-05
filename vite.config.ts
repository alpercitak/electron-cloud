import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }
          if (id.includes('react-dom') || id.includes('/react/')) {
            return 'react-vendor';
          }
          if (id.includes('/three/')) {
            return 'three-core';
          }
          if (id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'three-react';
          }
          if (id.includes('@react-three/postprocessing') || id.includes('postprocessing')) {
            return 'three-effects';
          }
          if (id.includes('leva')) {
            return 'ui-vendor';
          }
          return 'vendor';
        },
      },
    },
  },
});
