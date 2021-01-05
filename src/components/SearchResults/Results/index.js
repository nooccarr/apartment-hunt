import React from 'react';
import Listings from './Listings/index';
import './_results_styles.scss';

const Results = ({ resultsArray, requestedBaths, requestedBeds }) => {

  if (resultsArray) {
    return (
      <div className='results'>
        {resultsArray.map(listing => (listing.beds >= requestedBeds) && (listing.baths >= requestedBaths) ? <Listings listing={ listing } /> : null)}
      </div>
    );
  } else {
    return null;
  }
};

export default Results;