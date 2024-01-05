const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5b0d58e237e36f1b5ef4f15a89fc5921&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Cannot connect to weather service.")
        } else if (body.error){
            callback("Unable to find location. Please try another location.")
        } else {
            callback(undefined, `It is currently ${body.current.temperature} degrees. ${body.current.weather_descriptions[0]}, with a ${body.current.precip}% chance of rain`
            )
        }
    })
}

module.exports = forecast