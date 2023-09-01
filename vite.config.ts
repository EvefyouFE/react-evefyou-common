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
import { always, concat, equals, flip, head, includes, isNil, isNotNil, last, not, pipe, reject, split, useWith, when } from "ramda";
import fs from 'fs';


const pathResolve = (v: string) => path.resolve(__dirname, v)

const externalPackages = [...Object.keys(pkg.peerDependencies)]
const regexOfPackages = externalPackages
  .map(packageName => new RegExp(`^${packageName}(\\/.*)?`));

const entries = {
  'index': pathResolve('common/index.ts'),
  'utils/index': pathResolve('common/utils/index.ts'),
}

function moveFile(oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error('移动文件失败:', err);
    } else {
      console.log('文件已成功移动到新位置');
    }
  });
}

// const dtsFiles = [
//   'C:/projects/frontend/evefyou/react-evefyou-common/cjs/index.d.ts',
//   'C:/projects/frontend/evefyou/react-evefyou-common/es/index.d.ts'
// ]
const dtsFiles = [
  pathResolve('es/index.d.ts'),
  pathResolve('cjs/index.d.ts'),
]
const tsupFiles = [
  pathResolve('dist/index.d.ts'),
  pathResolve('dist/index.d.cts'),
]

// console.log('dtsFiles', dtsFiles)
// console.log('tsupFiles', tsupFiles)

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      outDir: ['es', 'cjs'],
      rollupTypes: true,
      afterBuild() {
        tsupFiles.forEach((f, idx) => {
          fs.unlinkSync(dtsFiles[idx])
          moveFile(f, dtsFiles[idx])
        })
        const dir = pathResolve('dist')
        console.log('rm dir', dir)
        fs.rm(dir, { recursive: true }, (err) => {
          if (err) throw err;
          console.log('目录已删除');
        })
      },
    })
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
      output: {
        minifyInternalExports: false,
        manualChunks: (id) => {
          const name = pipe(
            split('common/'),
            last,
            when(includes('types'), always('index.ts')),
            when(isNotNil, pipe(
              split('.ts'),
              head,
              when(pipe(
                includes('index'),
                not
              ), s => s.concat('/index'))
            ))
          )(id) as string
          return name
        },
        chunkFileNames: '[format]/[name].js',
        entryFileNames: '[format]/[name].js'
      },
      external: regexOfPackages
    }
  }
})
