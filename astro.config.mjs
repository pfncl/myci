// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  integrations: [svelte()],
  adapter: cloudflare(),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs'],
  },
});
