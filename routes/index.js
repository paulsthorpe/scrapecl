import getCountries from '../controllers/locations.controller';
var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


router.get("/location", function(req, res){
    var url = 'https://www.craigslist.org/about/sites';
    request(url, function(err, response, html){
        var $ = cheerio.load(html);
        var locations = getCountries($);
        res.json(locations);
    }); 
});

router.get("/categories", function(req, res){
    var url = 'https://raleigh.craigslist.org';
    request(url, function(err, response, html){
        var $ = cheerio.load(html);
        var categories = getCategories($);
        res.json(categories);
    }); 
});

router.get('/search', function(req, res){
    var url = 'https://raleigh.craigslist.org/d/for-sale/search/sss';
    request(url, function(err, response, html){
        var $ = cheerio.load(html);
        var searchResults = getResults($);
        res.json(searchResults);
    });
})

module.exports = router;