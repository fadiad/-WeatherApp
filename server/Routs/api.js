const City = require("../../models/City")
const mongoose = require('mongoose')
const express = require('express')
const API = require('../Tools/apiClass')
const urllib = require('urllib')
const router = express.Router()
const path = require('path')
const app = express()
const api = new API()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


router.get('/cities/:cityName', function (req, res) {
    urllib.request(`${api.domain}?q=${req.params.cityName}&appid=${api.apiID}&units=metric`, function (err, data, response) {
        if (parseInt(JSON.parse(data).cod) >= 200 && parseInt(JSON.parse(data).cod) < 300) {
            console.log("good");
            let city = api.cleanAPI(JSON.parse(data))
            res.send(city)
        } else {
            res.status(JSON.parse(data).cod).send('error')
        }
    })
})

//returns all the cities
router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
        // res.status(200).send(cities)
    })
})

router.post('/cities', async function (req, res) {
    // let isExisted = await api.isExisted(req.body.name)
    // if (!isExisted) {
        let city = new City({
            name: req.body.name,
            temperature: req.body.temperature,
            condition: req.body.condition,
            conditionPic: req.body.conditionPic
        })
        city.save()
        res.send("city saved")
    // }

    // res.send("city already existed")
})

router.delete('/cities/:cityName', function (req, res) {
    City.findOneAndRemove({ name: req.params.cityName }, function (err) {
        City.find({}, function (err, cities) {
            // res.send("city deleted")
            res.send("city deleted")

        })
    });
})

module.exports = router


