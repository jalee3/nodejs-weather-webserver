const request = require("postman-request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamxlZTEwMSIsImEiOiJjbG1reXltczMwNjl1MmhvOGNrZWx0N3hpIn0.faRqkktPQ3xc42G2a1W8-Q&limit=1"

    request({ url, json: true }, (error, { body: {features} }) => {
        if (error) {
            callback('Unable to connect to location services.')
        } else if (features.length === 0){
            callback("No matching result found. Please try another location.")
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode