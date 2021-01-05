import React, { useState, useEffect } from 'react';
import './_filterStyle.scss';

const Filters = ({ requestedBeds, setRequestedBeds, requestedBaths, setRequestedBaths }) => {

  const categories = ['Price', 'Beds', 'Baths', 'More'];

  const dropdowns = {
    Price:  <div className='dropdown'>
              <input className='priceText' type='text' placeholder='Min'></input>
              <div style={{marginRight: '10px'}}>-</div>
              <input className='priceText' type='text' placeholder='Max'></input>
            </div>,
    Beds: <div className='dropdown'>
            <div id='0beds' className='bedSelect' onClick={() => {setRequestedBeds(0); document.getElementById('0beds').classList.toggle('selected');}}>Any</div>
            <div id='1beds' className='bedSelect' onClick={() => {setRequestedBeds(1); document.getElementById('1beds').classList.toggle('selected');}}>1+</div>
            <div id='2beds' className='bedSelect' onClick={() => {setRequestedBeds(2); document.getElementById('2beds').classList.toggle('selected');}}>2+</div>
            <div id='3beds' className='bedSelect' onClick={() => {setRequestedBeds(3); document.getElementById('3beds').classList.toggle('selected');}}>3+</div>
          </div>,
    Baths: <div className='dropdown'>
            <div id='0baths' className='bathSelect' onClick={() => setRequestedBaths(0)}>Any</div>
            <div id='1baths' className='bathSelect' onClick={() => setRequestedBaths(1)}>1+</div>
            <div id='2baths' className='bathSelect' onClick={() => setRequestedBaths(2)}>2+</div>
            <div id='3baths' className='bathSelect' onClick={() => setRequestedBaths(3)}>3+</div>
          </div>,
  };

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [prevSelectedFilter, setPrevSelectedFilter] = useState(null);
  // console.log(document.getElementsByClassName('main')[0]);

  document.onclick = (e) => {
    if (e.target.id.includes('toggle')) {
      setPrevSelectedFilter(selectedFilter);
      setSelectedFilter(e.target.id.replace('toggle', ''));
    } else {
      setPrevSelectedFilter(selectedFilter);
      setSelectedFilter(null);
    }
  };

  useEffect(() => {
      if (prevSelectedFilter !== selectedFilter) {
        let dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.id !== selectedFilter) {
            openDropdown.classList.remove('show');
          }
        }
        const categoriesCopy = categories.filter(element => element !== selectedFilter);
        categoriesCopy.forEach(category => {
          document.getElementById(`toggle${category}`).classList.remove(category);
        });
      }
  });

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
                // setSelectedFilter(filter);
              }}
            >
              { filter === 'Beds'
                  ? requestedBeds === 0
                      ?  filter : `${requestedBeds} Beds`
                  : filter === 'Baths'
                      ? requestedBaths === 0
                          ?  filter : `${requestedBaths} Baths`
                      : filter
              }
              <img 
                src="https://img.icons8.com/ios/24/000000/chevron-down.png"
                style={{height: '10px', width: '10px'}}
              />
            </div>
            <div id={filter} className='dropdown-content'>
              { dropdowns[filter] }
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