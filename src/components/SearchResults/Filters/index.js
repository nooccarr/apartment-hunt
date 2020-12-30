import React from 'react';

const Filters = () => {
  return (
    <div className='filters'>
      <div className='filtersLeft'>
        <div className='price'>
          Price
          <img 
            src="https://img.icons8.com/ios/24/000000/chevron-down.png"
            style={{height: '10px', width: '10px'}}
          />
        </div>
        <div className='beds'>
          Beds
          <img 
            src="https://img.icons8.com/ios/24/000000/chevron-down.png"
            style={{height: '10px', width: '10px'}}
          />
        </div>
        <div className='bath'>
          Baths
          <img 
            src="https://img.icons8.com/ios/24/000000/chevron-down.png"
            style={{height: '10px', width: '10px'}}
          />
        </div>
        <div className='more'>
          More
          <img 
            src="https://img.icons8.com/ios/24/000000/chevron-down.png"
            style={{height: '10px', width: '10px'}}
          />
        </div>
        <div className='saveSearch'>Save</div>
      </div>
    </div>
  );
};

export default Filters;