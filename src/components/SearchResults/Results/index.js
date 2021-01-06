import React, { useContext } from 'react';
import { ApartmentContext } from '../../HomePage/ApartmentContext.jsx'
import Listings from './Listings/index';
import './_results_styles.scss';

const Results = ({ requestedBaths, requestedBeds }) => {
  const { listings } = useContext(ApartmentContext);

  if (listings) {
    return (
      <div className='results'>
        {listings.map(listing => (listing.beds >= requestedBeds) && (listing.baths >= requestedBaths) ? <Listings listing={ listing } /> : null)}
      </div>
    );
  } else {
    return null;
  }
};

export default Results;