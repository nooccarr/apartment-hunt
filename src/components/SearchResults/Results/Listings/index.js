import React from 'react';
import Photos from './Photos/index';

const Listings = ({listing: { pics, price, beds, baths, sqft, address, city, state, _id}}) => {

  if (address) {
    return (
      <div className='listing' onClick={(e) => e.target.className !== 'arrows' ? window.history.pushState({path: `/apartment?id=${_id}`}, '', `/apartment?id=${_id}`) &  window.location.reload(false): null}>
        <Photos pics={ pics } />
        <div className='listingInfo'>
          <div className='price'>${ price } /mo</div>
          <div className='details'>
            <div className='bedrooms'>{ beds }bd</div>
            <div className='bathrooms'>{ baths }ba</div>
            <div className='size'>{ sqft }sqft</div>
          </div>
          <div className='address'>
            <a>{ address }</a>
            <br />
            <a>{ city }, { state }</a>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Listings;

