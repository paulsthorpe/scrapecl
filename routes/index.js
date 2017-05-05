var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

router.get("/", function(req, res){
    var url = 'https://www.craigslist.org/about/sites';
    var url = 'https://raleigh.craigslist.org';
    request(url, function(err, response, html){
        var $ = cheerio.load(html);
        // var locations = getCountries($);
        var categories = getCategories($);
        categories = 
        fs.writeFile(__dirname + "/tmp/test", JSON.stringify(categories), function(err) {
            if(err) {
                return console.log(err);
            }
        });
        res.render('index', {
            // locals: locations
            categories: categories
        });
    }); 
 
});

function getCategories($){
    var categories = [];
    $('.ban').each(function(){
        categories.push({
            name: $(this).find('span').text(),
            link: $(this).find('a').attr('href'),
            sub: getSubCategories($, this)
        });
    });
    return categories;
}

function getSubCategories($, prevElem){
    var sub = [];
    $(prevElem).next('.cats').find('ul').each(function(index, el){
        var data = getSubData($, this);
        sub.push(data);
    });
    var listCount = sub.length;
    subCategories = [];
    for(var i = 0; i < listCount; i++){
        // console.log(sub[i]);
        subCategories = subCategories.concat(sub[i]);
    }
    console.log(subCategories);
    return subCategories;
}

function getSubData($, el){
    var subCats = [];
    $(el).find('li').each(function(i, elem){
        subCats.push({
            name: $(elem).find('span').first().text(),
            link: $(elem).find('a').first().attr('href')
        });
    });
    return subCats;
}

function getCountries($){
      var locations = [];
      var cntrys = $('h1').each(function(i){
          locations.push({
              country: $(this).text(),
              states: getStates($, this)
          });
      });
      return locations;
}

function getStates($, prevElem){
    var states = [];
        $(prevElem).next('.colmask').find('h4').map(function(i, el){
            var state = {
            name: $(this).text(),
            cities: getCities($, this)
            };
        states.push(state);
        });
    return states;
}

function getCities($, prevElem){
    var cities = [];
    $(prevElem).next('ul').find('li').map(function(i, el){
        cities.push({
            name: $(this).find('a').text(),
            link: $(this).find('a').attr('href')
        });
    });
    return cities;
}



module.exports = router;