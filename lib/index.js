#!/usr/bin/env node
// Above line of code is needed to tell your computer that
// it should run this file with a node command

var headlineScraper = require('./headlineScraper');
var cliOptions = require('./cliOptions.js');

var match = false;
if(process.argv[2] === 'canada' || process.argv[2] === 'usa' || process.argv[2] === 'uk' || process.argv[2] === 'toronto' || process.argv[2] === 'montreal' || process.argv[2] === 'vancouver' || process.argv[2] === 'CA' || process.argv[2] === 'NY' || process.argv[2] === 'IL' || process.argv[2] === 'TX' || process.argv[2] === 'MA' ){
  match = true;
  headlineScraper();
}


if (!match) {
  program.help();
}