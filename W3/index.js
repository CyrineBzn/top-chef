var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'https://restaurant.michelin.fr/28u6ql7/le-jardin-des-remparts-beaune'
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var Name;
      var json = { Name : ""};

      $('.poi_intro-display-title').filter(function(){
        var data = $(this);
        Name = data.text().trim();
        json.Name = Name;
       
      })
    }
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
