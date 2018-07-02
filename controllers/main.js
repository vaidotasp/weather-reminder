const axios = require('axios');


//get weather information based on lat/long
exports.getWeather = (req, res) => {
   //mocking lat long request here, it should come down req.body from client
  const lat = 38.901021;
  const long = -77.245018;
  
  //setting up the API request URL
  //data that is being ommitted
  const exclude = 'minutely,hourly,alerts,flags'
  
  //API KEY Secret
  const key = process.env.DARKSKY
  //generate the url
  const url = `https://api.darksky.net/forecast/${key}/${lat},${long}?exclude=${exclude}`
  
  axios.get(url)
    .then(response => {
      //Filter only first 5 days of the forecast
      let forecast = response.data.daily.data.slice(0, 5)
        .map(dayData => {
          let newDay = {
            time: dayData.time,
            summary: dayData.summary,
            icon: dayData.icon,
            high: dayData.temperatureHigh,
            low: dayData.temperatureLow
          }
          return newDay
        })
    
      const output = {
        summary: response.data.currently.summary,
        icon: response.data.currently.icon,
        temp: response.data.currently.temperature,
        humi: response.data.currently.humidity,
        forecast: forecast
      }
      res.json(output)
      })
    .catch(error => {
      console.log(error)
      })

}