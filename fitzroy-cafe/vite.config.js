import { defineConfig } from 'vite';
import { blogPlugin } from './build/blog-plugin.js';

export default defineConfig({
  // Multi-page: the homepage plus generated /blog/ pages.
  appType: 'mpa',
  plugins: [blogPlugin()],
});
