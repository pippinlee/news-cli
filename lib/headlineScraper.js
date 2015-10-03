// Grab all necessary modules for this project
var scraperjs = require('scraperjs');
var fs = require('fs');
var path = require('path');
var colours = require('cli-color');

// We can use the readFile method of the fs module to parse our
// json file and get the info we need to put it into the scraper

// Using path.resolve(__dirname, './data.json') means we will have a
// concrete path to the data.json file

// __dirname is a global variable that represents the directory
// of the current file

// Using the path.resolve method also helps with reducing errors
// and unique Windows gotchas for file paths
// and unique Windows gotchas for file paths


module.exports = function headlines() {
  fs.readFile(path.resolve(__dirname, './data.json'), {encoding: 'UTF-8'}, function(err, data) {
    // This if statement catches any errors
    if (err){
      process.stdout.write(err) && process.exit(1);
    }

    // To use the JSON data we use JSON.parse
    var headlineData = JSON.parse(data);
    // We want to get the array of Canadian headlines
    var canada = headlineData.canada;
    var usa = headlineData.usa;
    var uk = headlineData.UK;
    var toronto = headlineData.toronto;
    var montreal = headlineData.montreal;
    var vancouver = headlineData.vancouver;
    var CA = headlineData.CA;
    var NY = headlineData.NY;
    var IL = headlineData.IL;
    var TX = headlineData.TX;
    var MA = headlineData.MA;

    // arg logic
    if (process.argv[2] === 'canada'){
      var userInput = canada;
    } else if (process.argv[2] === 'usa') {
      var userInput = usa;
    } else if (process.argv[2] === 'toronto') {
      var userInput = toronto;
    } else if (process.argv[2] === 'uk') {
      var userInput = uk;
    } else if (process.argv[2] === 'montreal') {
      var userInput = montreal;
    } else if (process.argv[2] === 'vancouver') {
      var userInput = vancouver;
    } else if (process.argv[2] === 'CA') {
      var userInput = CA;
    } else if (process.argv[2] === 'NY') {
      var userInput = NY;
    } else if (process.argv[2] === 'IL') {
      var userInput = IL;
    } else if (process.argv[2] === 'TX') {
      var userInput = TX;
    } else if (process.argv[2] === 'MA') {
      var userInput = MA;
    }

    process.stdout.write(colours.red.bgWhite.underline('NEWS HEADLINES'));

    // Now we have a variable named canada that is an array of different
    // news sites and their url and query paths

    // Below we go through the canada array with forEach and use scraperjs
    // with the url, name, and query of each news site

    // Each index in the array will give us 1 headline which we can access
    // console.log(e.name + ': ' + news);
    userInput.forEach(function(e) {
      scraperjs.StaticScraper
          .create(e.url)
          .scrape(function($){
            return $(e.query).map(function() {
              return $(this).text();
            }).get();
          }, function(news) {
              var makeString = news.join(", ");
              news = makeString.replace(/(\r\n|\n|\r)/gm,'');
              news = news.replace(/\s\s+/g, '');
              process.stdout.write('\n' + colours.blue.underline (e.name) + ': ' + colours.green(news) );
            }
          );
    });
  });
}