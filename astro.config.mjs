// @ts-check
import { defineConfig, envField } from 'astro/config';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://myci.cz',
  integrations: [svelte()],
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs'],
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      ORDER_EMAIL: envField.string({ context: 'server', access: 'secret', default: 'info@myci.cz' }),
    },
  },
});
