const mongoose = require("mongoose")
const Schema = mongoose.Schema

const city = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String,
})

const City = mongoose.model('City', city)
module.exports = City




/*
{
    "name" : "jerusalem",
    "temperature" : 20,
    "condition" : "clear",
    "conditionPic":"icon"
}
*/