import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webfontDownload from 'vite-plugin-webfont-dl';
import { resolve } from 'path';

const SPACE_GROTESK_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap' as const;

export default defineConfig({
  plugins: [react(), webfontDownload([SPACE_GROTESK_FONT_URL])],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    rolldownOptions: {
      preserveEntrySignatures: 'allow-extension',
      output: {
        strictExecutionOrder: true,
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom)[\\/]/,
              priority: 30,
            },
            {
              name: 'three-postprocessing',
              test: /node_modules[\\/]@react-three\/postprocessing[\\/]/,
              priority: 25,
              maxSize: 250000,
            },
            {
              name: 'three-react',
              test: /node_modules[\\/](@react-three\/fiber|@react-three\/drei|its-fine|react-use-measure|suspend-react)[\\/]/,
              priority: 20,
              maxSize: 250000,
            },
            {
              name: 'three-core',
              test: /node_modules[\\/]three[\\/]/,
              priority: 15,
              maxSize: 300000,
            },
            {
              name: 'postprocessing-vendor',
              test: /node_modules[\\/](postprocessing|n8ao)[\\/]/,
              priority: 12,
              maxSize: 300000,
            },
            {
              name: 'ui-vendor',
              test: /node_modules[\\/](leva|@radix-ui|@floating-ui|@stitches|react-colorful|react-dropzone|colord|dequal|merge-value|v8n|file-selector|attr-accept)[\\/]/,
              priority: 10,
              maxSize: 200000,
            },
            {
              name: 'three-controls',
              test: /node_modules[\\/](three-stdlib|camera-controls)[\\/]/,
              priority: 9,
              maxSize: 200000,
            },
            {
              name: 'vendor',
              test: /node_modules[\\/]/,
              priority: 5,
            },
          ],
        },
      },
    },
  },
});
