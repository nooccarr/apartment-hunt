const mongoose = require('mongoose');
const db = require('./index.js');
const Schema = mongoose.Schema;


let apartmentSchema = new mongoose.Schema({
    address: String,
    applicants: Array,
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
    videos: Array,
    pets: Object,
    beds: Number,
    baths: Number,
    agent: String
});

let Apartments = mongoose.model('Apartment', apartmentSchema);
//Apartments.index({ aptID: 1 }, { unique: true });
module.exports = Apartments;