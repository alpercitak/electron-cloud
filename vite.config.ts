import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webfontDownload from 'vite-plugin-webfont-dl';
import { resolve } from 'path';

import { cloudflare } from "@cloudflare/vite-plugin";

const SPACE_GROTESK_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap' as const;

export default defineConfig({
  plugins: [react(), webfontDownload([SPACE_GROTESK_FONT_URL]), cloudflare()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/three/')) {
            return 'three-core';
          }
          if (id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'three-react';
          }
          if (id.includes('@react-three/postprocessing') || id.includes('postprocessing')) {
            return 'three-effects';
          }
          if (id.includes('node_modules/leva')) {
            return 'ui-vendor';
          }
          return 'vendor';
        },
      },
    },
  },
});