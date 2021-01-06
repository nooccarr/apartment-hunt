const Apartment = require('../../database/Apartments.js');

const updateApartmentApplicant = (apartment_id, username) => {
  return Apartment.findByIdAndUpdate(apartment_id,
    {$addToSet: { applicants: username } }).exec()
};

exports.updateApartmentApplicant = updateApartmentApplicant;
