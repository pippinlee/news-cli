var program = require('commander');

module.exports = program
  .version(require('../package.json').version)
  .option('canada', 'Just Canadian headlines')
  .option('usa', 'Just US headlines')
  .option('uk', 'Just UK headlines')
  .option('toronto', 'Toronto headlines')
  .option('montreal', 'Montreal headlines')
  .option('vancouver', 'Vancouver headlines')
  .option('CA', 'California headlines')
  .option('NY', 'New York headlines')
  .option('IL', 'Illinois headlines')
  .option('TX', 'Texas headlines')
  .option('MA', 'Massachusetts headlines')
  .option('More updates to this module soon!', '')
  .parse(process.argv);