const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/apartmentHunt', {useMongoClient: true});

let apartmentSchema = mongoose.Schema({
    address: String,
    beds: Number,
    baths: Number,
    cats: Boolean,
    dogs: Boolean,
    price: Number,
    sqft: Number,
    agent: String
});

let Apartment = mongoose.model('Apartment', apartmentSchema);