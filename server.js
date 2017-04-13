var
  cheerio = require('cheerio');
  express = require('express');
  request = require('request');
  hbs = require('express-handlebars');
  app = express();
  routes = require('./routes/index');
  port = 8089;

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use('/', routes);

app.listen(port, function(){
  console.log('Running');
});

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
