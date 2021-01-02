const mongoose = require('mongoose');
const db = require('./index.js');


let apartmentSchema = new mongoose.Schema({
    address: String,
    listingName: String,
    state: String,
    zipCode: String,
    city: String,
    country: String,
    description: String,
    sqft: Number,
    neighborhoods: Array,
    position: Object,
    price: Number,
    pics: Array,
    pets: Object,
    beds: Number,
    baths: Number,
    agent: String
});

let Apartments = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartments;