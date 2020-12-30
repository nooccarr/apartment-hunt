import React from 'react';
import SearchBar from '../TopBanner/SearchBar/index';
const Filters = () => {

  const categories = ['Price', 'Beds', 'Baths', 'More'];

  return (
    <div className='filters'>
      <div className='filtersLeft'>
        {/* <SearchBar /> */}
        {categories.map(filter => {
          return (

            <div className='filter'>
              { filter }
              <img 
                src="https://img.icons8.com/ios/24/000000/chevron-down.png"
                style={{height: '10px', width: '10px'}}
              />
            </div>

          );
        })}

        <div className='filter'>Save</div>
      </div>
    </div>
  );
};

export default Filters;