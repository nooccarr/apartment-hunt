import React, { useContext } from 'react';
import { ApartmentContext } from '../../HomePage/ApartmentContext';
import Listings from './Listings/index';
import './_results_styles.scss';

const Results = ({ requestedBaths, requestedBeds, requestedMinPrice, requestedMaxPrice }) => {
  const { listings } = useContext(ApartmentContext);

  if (listings) {
    return (
      <div className='results'>
        { listings.map(listing => {

          if ((requestedMaxPrice === '' && listing.price >= requestedMinPrice) && ((listing.beds >= requestedBeds) && (listing.baths >= requestedBaths))) {
            return <Listings listing= { listing } />;
          } else if ((listing.price >= requestedMinPrice && listing.price <= requestedMaxPrice) && ((listing.beds >= requestedBeds) && (listing.baths >= requestedBaths))) {
            return <Listings listing= { listing } />;
          }
          })}
      </div>
    );
  } else {
    return null;
  }
};

export default Results;