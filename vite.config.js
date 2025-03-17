import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/OtakuSeriesTracker/",
  publicDir: "public",
  build: {
    minify: "esbuild",
    outDir: "docs",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    open: "/index.html",
  },
  plugins: [react()], 
});
