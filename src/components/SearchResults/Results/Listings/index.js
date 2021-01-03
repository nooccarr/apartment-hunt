import React from 'react';
import Photos from './Photos/index';

const Listings = ({listing: { photos, price, beds, baths, size, street, city, state }}) => {
  return (
    <div className='listing'>
      <Photos photos={ photos } />
      <div className='listingInfo'>
        <div className='price'>{ price }</div>
        <div className='details'>
          <div className='bedrooms'>{ beds }</div>
          <div className='bathrooms'>{ baths }</div>
          <div className='size'>{ size }</div>
        </div>
        <div className='address'>
          <a>{ street }</a>
          <br />
          <a>{ city }, { state }</a>
        </div>
      </div>
    </div>
  );
};

export default Listings;