#!/usr/bin/env node

var program = require('commander')
  ,  _ = require('lodash')
  ,  nuga = require('./nuga-write');

program
  .version('0.0.1')
  .option('-i, --input <file>', 'input file')
  .option('-s, --spec <file>', 'column width spec')
  .option('-o, --output <file>', 'file to output CSV')
  .parse(process.argv);



if (_.isString(program.input) && _.isString(program.output) && _.isString(program.spec)) {
  nuga.write(program.input, program.output, program.spec)
} else {
  console.log("Input file, spec, and output file are required.");
}
