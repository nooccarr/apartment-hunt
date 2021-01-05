import React from 'react';

const Listings = ({listing: { photo, price, beds, baths, size, street, city, state }}) => {

  return (
    <div className='listing'>
      <div 
        className='listingPhoto'
        style={{ backgroundImage: `url(${photo})` }}
      ></div>

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

// onClick={() => {
//   window.history.pushState({path: '/apartment'}, '', '/apartment');
//   window.location.reload(false);
// }}