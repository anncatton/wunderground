$(function() {

  var API_KEY = "905ae13579633139";
  var searchTemplate = _.template($('#search-template').html());

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

});








    // $.getJSON(request).then


//       // setTimeout(function() {
//       //   $('#result').html(output).removeClass('hidden');
//       // }, 1000);

//     });

//   });

//   // $('#clear-button').on('click', function() {
//   //   $('#result').addClass('hidden');
//   //   setTimeout(function() {
//   //     $('#result').html('');
//   //   }, 1000);
//   // });
// });