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

export default { getCountries };