const fs = require('fs');

let agents = ['John Smith', 'Penelope Jane', 'Shotaro Tanaka', 'Bill Thompson', 'Celeste Kimbrooke'];
let raw = fs.readFileSync('/home/calvin/hackreactor/ApartmentHunt/database/173142_1.txt');
let wholeStr = raw.toString();
let validJSON = "[" + wholeStr.replace(/\n/g, ",") + "]";
let allApts = JSON.parse(validJSON);
let aptLength = allApts.length;
fs.writeFileSync('aptClean.json', '[');
for (var i = 0; i < aptLength; i++) {
    let apt = {};
    apt.address = allApts[i].address;
    apt.state = 'NY';
    apt.zipCode = allApts[i].postalCode;
    apt.city = allApts[i].city;
    apt.country = allApts[i].country;
    apt.description = allApts[i].descriptions[0].value;
    if (allApts[i].floorSizeValue !== undefined) {
        apt.sqft = allApts[i].floorSizeValue;
    } else {
        apt.sqft = 1000;
    }
    apt.position = {type: "Point", coordinates: [parseFloat(allApts[i].longitude), parseFloat(allApts[i].latitude)]}
    if (allApts[i].listingName !== undefined) {
        apt.listingName = allApts[i].listingName;
      } else {
        apt.listingName = apt.address;
      }
    
    apt.neighborhoods = allApts[i].neighborhoods;
    if (allApts[i].prices !== undefined) {
        let price = allApts[i].prices[0].amountMin;
        while(price > 10000) {
           price = price / 10;
        }
        apt.price = price;
      } else {
        apt.price = 1234;
      }
    apt.pics = allApts[i].imageURLs;
    petsOk = Math.random();
    if (petsOk < .2) {
        apt.pets = {'dogs': false, 'cats': false};
    } else if (petsOk >= .2 && petsOk < .7) {
        apt.pets = {'dogs': false, 'cats': true};
    } else {
        apt.pets = {'dogs': true, 'cats': true};
    }
    apt.beds = allApts[i].numBedrooms ? allApts[i].numBedrooms:(Math.floor(Math.random() * 4)) + 1;
    apt.baths = allApts[i].numBathrooms ? allApts[i].numBedrooms:(Math.floor(Math.random() * 1)) + 1;
    if (allApts[i].brokers !== undefined) {
      apt.agent = allApts[i].brokers[0].agent;
    } else {
      let randAgent = Math.floor(Math.random() * 5);
      apt.agent = agents[randAgent];
    }

    let aptStr = JSON.stringify(apt);
    if (i !== aptLength - 1) {
        aptStr = aptStr + ',';
    }
    fs.appendFileSync('aptClean.json', aptStr);
}
fs.appendFileSync('aptClean.json', ']');
console.log('success meow');
