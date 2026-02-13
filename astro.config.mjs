// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  integrations: [svelte()],
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs'],
  },
});
