import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';

const SPACE_GROTESK_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap' as const;

export default defineConfig({
  plugins: [react(), webfontDownload([SPACE_GROTESK_FONT_URL])],
  build: {
    // The lazy scene chunk is mostly three.js + drei + postprocessing (~1.25 MB, ~355 kB gzip)
    chunkSizeWarningLimit: 1300,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
