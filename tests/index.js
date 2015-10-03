var should = require('should');
var intercept = require("intercept-stdout");
var headlineScraper = require('../lib/headlineScraper');

// TODO: add tests to check if any site selector paths are broken

describe('headline-scraper', function() {
  var captured_text = "";
  process.argv[2] = 'toronto';

  before('wait for scraper', function(done) {
    var unhook_intercept = intercept(function(txt) {
        captured_text += txt;
    });
    headlineScraper();
    done();

    it('console should be equal', function(){
      should.equal(captured_text, '');
    });

    console.log(captured_text);
  });

});