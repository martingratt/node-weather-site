const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
var express = require('express');
const port = process.env.port || 3000;
const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars location an engine
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup standard directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Martin Gratt'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Martin Gratt'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        helpText: 'This is some helpful Text',
        name: 'Martin Gratt'
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })


    } else {
        res.send({
            products: []
        })
    }
});

app.get('/weather', (req, res) => {
    const location = req.query.address
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    } else {
        geocode(location, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error){
                        return res.send({error})
                    }
                    res.send({
                        location: location,
                        forecast: forecastData,
                        address: req.query.address
                    })
                })

        })
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404!',
        errorMessage: 'Help article not found.',
        name: 'Martin Gratt'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404!',
        errorMessage: 'Page not found.',
        name: 'Martin Gratt'
    })
});

app.listen(3000, () => {
    console.log('Webserver is running on ' + port)
});