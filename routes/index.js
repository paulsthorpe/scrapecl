var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get("/", function(req, res){
   var url = 'https://www.craigslist.org/about/sites#US';

 var locals = request(url, function(err, response, html){
    var $ = cheerio.load(html);
    var locations = getCountries($);
     for(var i = 0; i < locations.length; i++){
        locations[i].states.push(getStates($, i, locations));
    }
    console.log(locations[0].states[0].cities[0].name)

  });

    // res.render('index', {locals: locals[0].country});
});

function getCountries($){
      var locations = [];
      var cntrys = $('h1').each(function(){
          locations.push({
              "country": $(this).text(),
              "states": []
          });
      });
      return locations;
}

function getStates($, i, locations){
    states = [];
    $('.colmask').eq(i).find('h4').map(function(i, el){
        var state = {
            "name": $(this).text(),
            "cities": getCities($, this)
        };
        states.push(state);

    });
    return states;
}

function getCities($, elem){
    var cities = [];
    $(elem).next('ul').find('li').map(function(i, el){
        cities.push({
            'name': $(this).find('a').text(),
            'link': $(this).find('a').attr('href')
        });
    });
    console.log(cities);
    return cities;
}

module.exports = router;