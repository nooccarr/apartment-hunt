const Apartment = require('../../database/Apartments.js');

const updateApartmentApplicant = (apartment_id, user_id) => {
  return Apartment.findOneAndUpdate({apartment_id: apartment_id},
    {$addToSet: { applicants: user_id } }).exec()
};

exports.updateApartmentApplicant = updateApartmentApplicant;
