const rollup = require('rollup');
const { uglify } = require('rollup-plugin-uglify');
const buble = require('@rollup/plugin-buble');
const typescript = require('rollup-plugin-typescript2');
const pkg = require('../package.json');

const banner = `
/*!
 * hardware-suit ${pkg.version} (${pkg.homepage})
 * Copyright 2020-${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license}
 */
`.trim();

const input = 'src/index.ts';

const plugins = [
  typescript({
    sourceMap: true,
    include: 'src/**/*'
  }),
];

const outputOptions = {
  strict: true,
  name: 'hardware-suit',
  banner,
};

async function build() {
  const bundle = await rollup.rollup({ input: 'lib/index.js' });

  await bundle.write(Object.assign({}, outputOptions, {
    sourcemap: true,
    // format: 'es',
    file: 'dist/hardware-suit.js',
  }));
}

// 编译成 ES6 模块化文件
async function buildEsm() {
  const bundle = await rollup.rollup({ input, plugins });

  await bundle.write(Object.assign({}, outputOptions, {
    sourcemap: true,
    format: 'es',
    file: 'dist/hardware-suit.esm.js',
  }));
}

// 编译成 umd 文件
async function buildUmd() {
  // plugins.push(
  //   buble()
  // );

  const bundle = await rollup.rollup({ input, plugins });

  await bundle.write(Object.assign({}, outputOptions, {
    sourcemap: true,
    format: 'umd',
    file: './dist/hardware-suit.js',
  }));
}

// 编译成 umd 文件，并压缩
async function buildUmdUglify() {
  plugins.push(
    uglify({
      output: {
        preamble: banner,
      }
    })
  );

  const bundle = await rollup.rollup({ input, plugins });

  await bundle.write(Object.assign({}, outputOptions, {
    sourcemap: true,
    format: 'umd',
    file: './dist/hardware-suit.min.js',
  }));
}

async function build() {
  await build()
  // await buildEsm();
  // await buildUmd();
  // await buildUmdUglify();
}

build().catch(e => console.log(e));
