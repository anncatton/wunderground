$(function() {

  var API_KEY = ;
  var searchTemplate = _.template($('#search-template').html());
  var conditionsTemplate = _.template($('#conditions-template').html());

  $('#city-search').submit(function(event) {
    event.preventDefault();
    
    var query = $('#city-name').val();
    var request = {
      url: 'http://autocomplete.wunderground.com/aq',
      data: { query: query, cb: 'jsonpCallback' },
      jsonpCallback: 'jsonpCallback',
      dataType: 'jsonp'
    };

    $.ajax(request).then(function(data) {
      var output = '';

      data.RESULTS.forEach(function(city) {
        output += searchTemplate({
          cityName: city.name,
          country: city.c,
          latitude: city.lat,
          longitude: city.lon,
        });
      });

      $('#result').html(output);
    });

  });
  
  $('#result').on('click', '.city-data', function(event) {
    event.preventDefault();
    var cityName = $(this).children('.city').text().split(",");
    var euroCountry = cityName[1].replace(" ", "");
    var countryName = $(this).children('.country').text();
    if (countryName == "US") {
      console.log("It's American!");
    } else {
      var request = {
        url: 'http://api.wunderground.com/api/' + API_KEY + '/conditions/q/' + euroCountry + "/" + cityName[0] + '.json',
      };
    }

    $.ajax(request).then(function(data) {
      var output = '';
      var conditions = data.current_observation
      
      output += conditionsTemplate({
        city: cityName.join(),
        feelsLike: conditions.feelslike_c,
        weather: conditions.weather,
        tempC: conditions.temp_c,
        obsTime: conditions.observation_time,
      });
      $('#result').hide();
      $('#conditions').html(output);
    });

  });

});

