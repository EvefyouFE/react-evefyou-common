/*
 * @Author: EvefyouFE
 * @Date: 2023-08-10 13:42:48
 * @FilePath: \react-evefyou-common\vite.config.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';
import fs from 'fs';

const pathResolve = (v: string) => path.resolve(__dirname, v)

const externalPackages = [...Object.keys(pkg.peerDependencies)]
const regexOfPackages = externalPackages
  .map(packageName => new RegExp(`^${packageName}(\\/.*)?`));

const entries = {
  'index': pathResolve('common/index.ts'),
}

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      rollupTypes: true
    }),
  ],
  build: {
    minify: true,
    reportCompressedSize: true,
    cssCodeSplit: true,
    outDir: '.',
    lib: {
      entry: entries,
      fileName: (format) => `${format}/index.js`,
      name: 'react-evefyou-common',
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        manualChunks: (id) => {
          if (id.includes('hooks/use')) {
            console.log('hooks', id.split('/hooks/')[1].split('.ts')[0])
            return 'hooks/'.concat(id.split('/hooks/')[1].split('.ts')[0])
          }
          if (id.includes('utils/')) {
            console.log('utils', id.split('/utils/')[1].split('.ts')[0])
            return 'utils/'.concat(id.split('/utils/')[1].split('.ts')[0])
          }
        },
        chunkFileNames: () => '[format]/[name]/index.js',
      },
      external: regexOfPackages
    }
  }
})
