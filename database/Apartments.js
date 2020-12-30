const mongoose = require('mongoose');
const db = require('./index.js');


let apartmentSchema = new mongoose.Schema({
    address: String,
    state: String,
    zipCode: String,
    city: String,
    country: String,
    description: String,
    sqft: Number,
    latitude: Number,
    longitude: Number,
    neighborhoods: String,
    price: Number,
    pics: String,
    pets: String,
    beds: Number,
    baths: Number,
    agent: String
});

let Apartments = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartments;