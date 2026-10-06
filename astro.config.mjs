// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // En GitHub Pages el sitio vive en /fractalweb/, en local en /
  site: 'https://fractal-865.github.io',
  base: process.env.GITHUB_ACTIONS ? '/fractalweb' : undefined,
  vite: {
    plugins: [tailwindcss()]
  }
});