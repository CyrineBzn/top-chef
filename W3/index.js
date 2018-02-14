var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
/*
app.get('/scrape', function(req, res){
  url = 'https://restaurant.michelin.fr/28u6ql7/le-jardin-des-remparts-beaune'
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var Name, Location;
      var json = { Name : "", Location: ""};

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
exports = module.exports = app;*/

function get_number_page(url, callback) {
  request(url, function (error, response, html) {
       if (!error) {
           var $ = cheerio.load(html);
           var nbr = $('ul.pager').children('.last').prev().children().html();
           callback(nbr);
       }
   });
 }
 function get_url_page(url, callback) {
      var urls_tab = [];
      request(url, function (error, response, html) {
          if (!error) {
              var $ = cheerio.load(html);
              $('a[class=poi-card-link]').each(function (i, elem) {
                urls='https://restaurant.michelin.fr' + $(elem).attr('href')
                urls_tab.push(urls);
              }
            );
      if(callback) callback(urls_tab); 
          }
      });
  }
  
function get_infos_restaurent(url, callback){
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var name,street,city,postalcode,locality,country,chef,price ;
      var name = $('h1').first().text();
      var street= $('.thoroughfare').first().text();
      var postalcode = $('.postal-code').first().text();;
      var locality = $('.locality').first().text();
      var country= $('.country').first().text();
      var chef = $('.field--name-field-chef').children('.field__items').text();
      var price= $('.poi_intro-display-prices').first().text().trim();
      var restaurant = {
              "name": name,
              "street": street,
              "postalcode": postalcode,
              "locality": locality,
              "country": country,
              "address": street + ' ,' + postalcode + ' ' + locality+' ,'+ country,
              "chef": chef,
              "price": price,
              "url": url
                    };
  if(callback) callback(restaurant); 
  console.log(restaurant);
     }
  });
}

function write_json(url){
  var json = { "restaurants": [] };
  get_number_page(url, function (nbr) {
  for (var i = 1; i < +nbr + 1; i++) {
    get_url_page(url + '/page-' + i.toString(), function (arr) {
      arr.forEach(function (elem) {
       get_infos_restaurent(elem, function (restaurant) {
        json.restaurants.push(restaurant);
         fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
           console.log('Restaurent successfully written! - Check your project directory for the output.json file');
         });
       });
      });
    });
   }
  });
}

 //get_number_page('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin');
 //get_url_page('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin');
 //get_infos_restaurent('https://restaurant.michelin.fr/28u6ql7/le-jardin-des-remparts-beaune');
 write_json('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin');