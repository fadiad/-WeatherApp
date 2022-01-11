
const urllib = require('urllib')
const City = require("../../models/City")
const mongoose = require('mongoose')

class API {
    constructor() {
        this.apiID = 'f7e959c57ba0cbd28aa05efb72d2629d'
        this.domain = 'https://api.openweathermap.org/data/2.5/weather'
        this.city = {}
    }

    cleanAPI(api) {
        return {
            "name": api.name,
            "temperature": api.main.temp,
            "condition": api.weather[0].main,
            "conditionPic": `https://openweathermap.org/img/wn/${api.weather[0].icon}@2x.png`,
        }
    }

    isExisted(cityName) {
        let isExisted = true
        City.find({ name: cityName }, function (err, city) {
            if (city.length === 0) {
                isExisted = false
            }
        })
        return isExisted
    }
}

module.exports = API




// const apiID = 'f7e959c57ba0cbd28aa05efb72d2629d'
// const domain = 'https://api.openweathermap.org/data/2.5/weather'

/*
http://localhost:3000/city/jerusalem
http://localhost:3000/city/london
*/







   // api.city = JSON.parse(data).weather
        // api.city[0].icon = api.getIconUrl(api.city[0].icon)


         // getIconUrl(key) {
    //     return `https://openweathermap.org/img/wn/${key}@2x.png`
    // }