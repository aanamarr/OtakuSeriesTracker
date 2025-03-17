import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import injectHTML from "vite-plugin-html-inject";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import concat from '@vituum/vite-plugin-concat';
import FastGlob from 'fast-glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: "/OtakuSeriesTracker/",
  root: "src",
  publicDir: "../public",
  build: {
    minify: "esbuild",
    outDir: "docs",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: "src/index.html",
    },
  },
  server: {
    open: "/index.html",
  },
});
