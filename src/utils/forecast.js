const request = require('request')

const forecast = (lat, long, callback) => {



    const url = 'http://api.weatherstack.com/current?access_key=f6714b21e45d5db149c862b5da99a016&query=' + lat + ',' + long + '&units=m'
    request({url, json: true}, (error, {body}) => {

        if (error){
            callback('Unable to connect to the weather service', undefined)

        } else if (body.error){
            callback('Unable to find location!', undefined)

        }else {

            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const weatherDescriptions = body.current.weather_descriptions[0]
            const windSpeed = body.current.wind_speed
            const humidity = body.current.humidity



            callback(
                undefined,
                'It is ' + temperature + ' degress out there, it feels like ' +  feelslike + ' and you can describe it ' +weatherDescriptions +
                '. The humidity is ' + humidity + '% and the windspeed is ' + windSpeed + ' km/h'
                /*
                    temperature: temperature,
                    feelslike: feelslike,
                    weatherDescriptions: weatherDescriptions
                    */

                )
        }
    })


}

module.exports = forecast



