/*
 * @Author: EvefyouFE
 * @Date: 2023-08-10 13:42:48
 * @FilePath: \js-evefyou-utils\vite.config.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import path from "path";
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';
import { and, any, anyPass, equals, filter, flip, includes, last, not, pipe, split, test } from "ramda";
import fs from 'fs';

const libName = 'common'
const libFullName = `react-evefyou-${libName}`

const pathResolve = (v: string) => path.resolve(__dirname, v)


const depPackages = [...Object.keys(pkg.dependencies)]
const externalPackages = [...Object.keys(pkg.peerDependencies)]
const regexOfPackages = externalPackages
  .map(packageName => new RegExp(`^${packageName}(\\/.*)?`));


const entries = Object.keys(pkg.exports)
  .reduce((acc, cur) => {
    const isIndex = cur === '.'
    cur = cur.split('./')[1]
    const key = isIndex ? 'index' : cur
    const val = isIndex ? pathResolve(`${libName}/index.ts`) : pathResolve(`${libName}/${cur}/index.ts`)
    acc[key] = val
    return acc
  }, {})

function moveFile(oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error('移动文件失败:', err);
    } else {
      console.log('文件已成功移动到新位置');
    }
  });
}
const components = filter(
  pipe(
    anyPass(
      [
        equals('.'),
      ]
    ),
    not
  )
)(Object.keys(pkg.exports))

const formats = ['es', 'cjs']
function moveCjsFiles() {
  const f = 'cjs'
  components.forEach(comp => {
    fs.rm(pathResolve(`./${f}/${comp}.d.ts`), err => {
      console.error('删除文件失败:', err);
    })
    fs.rm(pathResolve(`./cjs/${comp}/index.d.ts`), err => {
      console.error('删除文件失败:', err);
    })
    fs.copyFile(pathResolve(`./es/${comp}/index.d.ts`), pathResolve(`./cjs/${comp}/index.d.ts`), err => {
      console.error('拷贝文件失败:', err, pathResolve(`./es/${comp}/index.d.ts`), pathResolve(`./cjs/${comp}/index.d.ts`));
    })
  })
}
function moveEsFiles() {
  const f = 'es'
  components.forEach(comp => {
    const oldComp = pipe(split('/'), last)(comp)
    const oldPath = pathResolve(`./${f}/${oldComp}.d.ts`)
    const newPath = pathResolve(`./${f}/${comp}/index.d.ts`)
    // console.log('move', oldPath, newPath)
    moveFile(oldPath, newPath)

    fs.rm(pathResolve(`./${f}/${comp}.d.ts`), err => {
      console.error('删除文件失败:', err);
    })
  })
}
function deleteFiles(files: string[]) {
  files.forEach(f => {
    fs.rm(f, { recursive: true }, (err) => {
      if (err) throw err;
      console.log(`${f}已删除`);
    })
  })
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      outDir: formats,
      rollupTypes: true,
      afterBuild() {
        console.log('start...', new Date().getTime())
        setTimeout(() => {
          moveEsFiles()
          moveCjsFiles()
          // const idxFiles = formats.map(f => pathResolve(`${f}/index.d.ts`))
          // deleteFiles(idxFiles)
          // moveFile(pathResolve(`dist/index.d.ts`), idxFiles[0])
          // moveFile(pathResolve(`dist/index.d.cts`), idxFiles[1])
          // deleteFiles([pathResolve('dist')])
        }, 5000);
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
      name: libFullName,
      formats: formats as any,
    },
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        chunkFileNames: '[format]/[name].js',
        entryFileNames: (chunkInfo) => chunkInfo.name === 'index'
          ? '[format]/[name].js' : '[format]/[name]/index.js'
      },
      external: (id) => {
        return and(
          not(any(flip(includes)(id as any), depPackages)),
          any(flip(test)(id), regexOfPackages)
        )
      }
    }
  }
})
