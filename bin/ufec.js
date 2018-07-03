#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { green, red, cyan } = require('chalk');
const { exec } = require('child_process');
const program = require('commander');
const pkg = require('../package.json');

function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}

program
  .version(pkg.version, '-v, --version')
  // .option('-c, --create [moduleName]', 'Create an ufec module.')
  .option('--svg [path]', 'Init svg files.')
  .parse(process.argv);

if (program.svg && isString(program.svg)) {
  const from = path.resolve(__dirname, '../iconfonts/svgs/*');
  const to = path.resolve(process.cwd(), program.svg);
  const shellList = [
    `echo ${green(`Moving ufec svgs to ${program.svg}`)}`,
    `cp ${from} ${to}`
  ];
  if (!fs.existsSync(to)) {
    shellList.unshift(`mkdir ${to}`);
  }
  const sh = shellList.join(' && ');
  const childProcess = exec(sh, (err) => {
    if (err) throw err;
    console.log(green(`\nMove svgs to ${program.svg} success!\n`));
  });
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
}