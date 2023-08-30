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

const manualModules = ['utils', 'hooks']

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      afterBuild: () => {
        const directoryPath = '.';
        const regexToDelete = /\w+\.d\.ts$/;
        fs.readdirSync(directoryPath).forEach((file) => {
          const filePath = path.join(directoryPath, file);
          if (regexToDelete.test(file) && !file.includes('index.d.ts')) {
            try {
              fs.unlinkSync(filePath);
              console.log(`Deleted file: ${filePath}`);
            } catch (err) {
              console.error(`Error deleting file: ${err}`);
            }
          }
        });
      }
    }),
  ],
  build: {
    minify: true,
    reportCompressedSize: true,
    cssCodeSplit: true,
    outDir: '.',
    lib: {
      entry: entries,
      name: 'react-evefyou-common',
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      input: {
        'index': './common/index.ts',
        'hooks': './common/hooks/index.ts',
        'utils': './common/utils/index.ts',
      },
      output: {
        minifyInternalExports: false,
        manualChunks: (id) => {
          console.log('id', id)
          for (const k of manualModules) {
            if (id.includes(k)) {
              const name = id.split(k.concat('/'))[1]
              if (name === 'index.ts') {
                return k
              }
              console.log('name', id, name)
              if (name.includes('/index.ts')) {
                return `${k}/${name.split('/index.ts')[0]}`
              }
              return `${k}/${name.split('.ts')[0]}`
            }
          }
        },
        chunkFileNames: () => '[format]/[name]/index.js',
        entryFileNames: (chunkInfo) => chunkInfo.name.includes('index')
          ? '[format]/index.js'
          : '[format]/[name]/index.js'
      },
      external: regexOfPackages
    }
  }
})
