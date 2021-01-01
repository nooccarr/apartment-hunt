import React from 'react';
import './_filterStyle.scss';

const Filters = () => {

  const categories = ['Price', 'Beds', 'Baths', 'More'];
  return (
    <div className='allFiltersContainer'>
      {categories.map(filter => {
        return (
          <div className='singleFilterContainer'>
            <div 
              id={ 'toggle' + filter }
              className='filter' 
              onClick={() => {
                document.getElementById(filter).classList.toggle('show');
                document.getElementById(`toggle${filter}`).classList.toggle(filter);
              }}
            >
              { filter }
              <img 
                src="https://img.icons8.com/ios/24/000000/chevron-down.png"
                style={{height: '10px', width: '10px'}}
              />
            </div>
            <div id={filter} className='dropdown-content'>
              <div className='dropdown'>
                <input className='priceText' type='text' placeholder='Min'></input>
                -
                <input className='priceText' type='text' placeholder='Max'></input>
              </div>
            </div>
          </div>
        );
      })}
      <div className='singleFilterContainer'>
        <div className='filter'>Save</div>
      </div>
    </div>
  );
};

export default Filters;