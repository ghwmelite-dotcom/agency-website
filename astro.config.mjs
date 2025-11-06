import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yoursite.com',
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    mdx(),
    sitemap()
  ],
  vite: {
    build: {
      cssMinify: 'lightningcss'
    }
  }
});
