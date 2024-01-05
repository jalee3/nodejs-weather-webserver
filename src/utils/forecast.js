const request = require("postman-request")

const forecast = (latitude, longitude, location, callback) => {
    let units = 'm';
    let tempUnits = '°C';
    let speedUnits = "km/h"
    if (location.includes("United States")){
        units = 'f'
        tempUnits = '°F';
        speedUnits = "mph"
    }

    const url = `http://api.weatherstack.com/current?access_key=5b0d58e237e36f1b5ef4f15a89fc5921&query=${latitude},${longitude}&units=${units}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Cannot connect to weather service.")
        } else if (body.error){
            callback("Unable to find location. Please try another location.")
        } else {
            const { current } = body;
            callback(undefined, `It is currently ${current.weather_descriptions[0].toLowerCase()},
                with a ${current.precip}% chance of rain. The temperature is ${current.temperature}${tempUnits}
                and feels like ${current.feelslike}${tempUnits}. The humidity is ${current.humidity}%,
                wind speed is ${current.wind_speed}${speedUnits} coming from the ${current.wind_dir}.`
            )
        }
    })
}

module.exports = forecast