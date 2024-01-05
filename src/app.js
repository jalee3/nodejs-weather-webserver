const path = require('path')
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jason Lee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jason Lee'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the Help Page.',
        name: 'Jason Lee'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }

    const address = req.query.address
    let weather = {
        address,
        forecast: '',
        location: ''
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }

    console.log(req.query.search)
    const weather = {
        products: []
    }
    res.send(weather)
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Help',
        errorMessage: 'Help article not found.',
        name: 'Jason Lee'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Jason Lee'
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})