const request = require('request')

const geocode = (address, callback) => {
    const addressEncoded = encodeURI(address) + '.json'
    const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const access_token_mapbox = '?access_token=pk.eyJ1IjoibWFydGluZ3JhdHQiLCJhIjoiY2s5dmV4YmM1MDZmbjNucW84NmdkbHJzNCJ9.lkFnBhg5JykcVcy-0ok19A'
    const limit = "&limit=1"
    const url = urlMapBox + addressEncoded + access_token_mapbox + limit

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)

        }else if (body.features.length === 0){
            callback('Unable to find Location. Try another search', undefined)

        } else {
            callback(undefined, {



                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
    })

}

module.exports = geocode