const axios = require('axios');

//get weather information based on lat/long
exports.getWeather = (req, res) => {
  //mocking lat long request here, it should come down req.body from client
  const lat = 38.901021;
  const long = -77.245018;

  //setting up the API request URL
  //data that is being ommitted
  const exclude = 'minutely,hourly,alerts,flags';

  //API KEY Secret
  const key = process.env.DARKSKY;
  //generate the url
  const url = `https://api.darksky.net/forecast/${key}/${lat},${long}?exclude=${exclude}`;

  axios
    .get(url)
    .then(response => {
      //Filter only first 5 days of the forecast
      let forecast = response.data.daily.data.slice(0, 5).map(dayData => {
        let newDay = {
          time: dayData.time,
          summary: dayData.summary,
          icon: dayData.icon,
          high: dayData.temperatureHigh,
          low: dayData.temperatureLow
        };
        return newDay;
      });

      const output = {
        summary: response.data.currently.summary,
        icon: response.data.currently.icon,
        temp: response.data.currently.temperature,
        humi: response.data.currently.humidity,
        forecast: forecast
      };
      res.send(output);
    })
    .catch(error => {
      console.error(error);
      res.json(error);
    });
};

exports.getGoogleLocation = (req, res) => {
  //Input query String, partial or full
  //Output - Array of 5 closest suggestions, perhaps containing the lat long

  //1. Connect to Google API Node client
  const key = process.env.GAPI;
  const query = 'washington';
  const url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${key}&input=${query}`;
  axios
    .get(url)
    .then(response => {
      console.log(response.data.predictions);
      res.json(response.data.predictions);
    })
    .catch(error => {
      console.error(error);
    });

  // googleMapsClient
  //   .geocode({ address: '1600 Amphitheatre Parkway, Mountain View, CA' })
  //   .asPromise()
  //   .then(response => {
  //     res.json(response.json.results);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // googleMapsClient
  //   .placesAutoComplete({
  //     input: 'washington',
  //     language: 'en'
  //   })
  //   .asPromise()
  //   .then(response => {
  //     res.json(response.json.results);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  //2. Generate query parameters
  //3. Fetch the data from API
  //4. Send the data back
  //res.json('Google Endpoint');
};
