/// <reference types="vitest" />

import * as path from 'node:path';

import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import * as process from 'process';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import circleDependency from 'vite-plugin-circular-dependency';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

import { EnvSchema } from './src/shared/config/vite/EnvSchema';

export default defineConfig(({ mode }) => {
  const env = EnvSchema.safeParse(loadEnv(mode, process.cwd()));

  if (!env.success) {
    throw Error(
      '\n' + env.error.errors.map((error) => error.message).join('\n'),
    );
  }

  return {
    root: __dirname,
    cacheDir: './node_modules/.vite/wflow-front',
    server: {
      port: 4200,
      host: true,
      proxy: {
        '/api': {
          target: env.data.VITE_API_URL,
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
    test: {
      watch: !process.env.CI,
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: { reportsDirectory: './coverage/wflow-front', provider: 'v8' },
      setupFiles: 'src/shared/tests/setup.ts',
    },
  };
});
