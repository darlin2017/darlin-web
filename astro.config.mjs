// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TEMP: darlin.tokyo isn't pointed at this deployment yet, so OGP previews
  // (og:image, canonical, etc.) would 404 against it. Switch back once the
  // custom domain goes live.
  site: 'https://darlin-web.vercel.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/') && !page.endsWith('/404'),
    }),
  ]
});