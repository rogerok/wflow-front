/// <reference types="vitest" />

import * as path from 'node:path';

import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import circleDependency from 'vite-plugin-circular-dependency';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  root: __dirname,
  cacheDir: './node_modules/.vite/wflow-front',
  server: {
    port: 4200,
    host: true,
    proxy: {
      '/api': {
        //TODO: add to .env, get based on environment
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
    hmr: true,
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    circleDependency({
      outputFilePath: './circleDep',
      circleImportThrowErr: false,
    }),
    react(),
    mkcert(),
    TanStackRouterVite({
      routesDirectory: './src/app/routes',
    }),
    svgr({
      svgrOptions: {
        ref: true,
        svgo: true,
        titleProp: true,
        icon: true,
      },
      include: '**/*.svg',
    }),
    checker({
      typescript: true,
    }),
    // nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist/wflow-front',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
        @use "src/app/styles/variables/breakpoints.scss" as *;
        @use "src/app/styles/mixins/mixins.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },
  // test: {
  //   watch: false,
  //   globals: true,
  //   environment: 'jsdom',
  //   include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  //   reporters: ['default'],
  //   coverage: { reportsDirectory: './coverage/wflow-front', provider: 'v8' },
  // },
});
