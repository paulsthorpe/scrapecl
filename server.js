var
  cheerio = require('cheerio');
  express = require('express');
  request = require('request');
  hbs = require('express-handlebars');
  app = express();
  routes = require('./routes/index');
  port = 8089;

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views'}));
app.set('view engine', 'hbs');
app.use('/', routes);

app.listen(port, function(){
  console.log('Running');
});
// app.get('/scrape', function(req, res){
  // url = 'https://www.craigslist.org/about/sites#US';

  // request(url, function(err, response, html){

  //   if(!err){
  //     var $ = cheerio.load(html);

  //     var locations = [];
  //     var cntrys = $('h1');
      
  //     for(var i = 0; i < cntrys.length; i++){

  //         var states = [];
  //         var country = $('h1').eq(i).text();

  //         $('.colmask').eq(i).find('h4').map(function(i, el){
  //             var cities = [];
  //             $(this).next('ul').find('li').map(function(i, el){
  //               cities.push({
  //                   'name': $(this).find('a').text(),
  //                   'link': $(this).find('a').attr('href')
  //             });
  //             var state = [];
  //           state[$(this).text()] = cities;
  //           states.push(state);
  //         });
  //         locations[country] = states;
  //       });
  //     }
  //     }
      
  //     console.log(locations);
    
  // });

//   craigslist = require('node-craigslist');

//   client = new craigslist.Client({
//     city : 'seattle'
//   });

// client
// .search('240sx')
//   .then((listings) => {
//     // play with listings here...
//     listings.forEach((listing) => console.log(listing));
//   })
//   .catch((err) => {
//     console.error(err);
//   });
