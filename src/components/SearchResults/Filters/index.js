import React, { useState, useEffect } from 'react';
import './_filterStyle.scss';

const Filters = ({ requestedBeds, setRequestedBeds, requestedBaths, setRequestedBaths, requestedMinPrice, setRequestedMinPrice, requestedMaxPrice, setRequestedMaxPrice }) => {

  const categories = ['Price', 'Beds', 'Baths', 'More'];

  const select = (num, type) => {
    document.getElementById(`${num}${type}`).classList.add('selected');

    let ids = [`0${type}`, `1${type}`, `2${type}`, `3${type}`];
    
    ids = ids.filter(element => element !== `${num}${type}`);
    ids.forEach(e => {
      document.getElementById(e).classList.remove('selected');
    });

    type === 'beds'
      ? setRequestedBeds(num === '0' ? '' : num)
      : setRequestedBaths(num === '0' ? '' : num);
  };

  const submitRequestedPrice = () => {
    const min = document.getElementById('minPrice').value;
    const max = document.getElementById('maxPrice').value;

    if (min !== requestedMinPrice) {
      setRequestedMinPrice(min);
    }
    if (max !== requestedMaxPrice) {
      setRequestedMaxPrice(max);
    }
  };
  
  const numbercheck = (e) => {
    if ((47 < e.charCode && e.charCode < 58) || e.charCode === 8 || e.charCode === 46) {
      return true;
    } else {
      e.preventDefault();
      // alert('Numbers Only Please!');
    }
  }

  const dropdowns = {
    Price:  <div className='dropdown'>
              $<input 
                id='minPrice' 
                className='priceText' 
                type='text' 
                placeholder='Min' 
                maxLength='6'
                onKeyPress={ numbercheck }
              />
              <div style={{marginRight: '10px'}}>-</div>
              $<input 
                id='maxPrice' 
                className='priceText' 
                type='text' 
                placeholder='Max' 
                maxLength='6'
                onKeyPress={ numbercheck }
              />
              <div className='submitPrice' onClick={() => submitRequestedPrice()}>Done</div>
            </div>,
    Beds: <div className='dropdown'>
            <div id='0beds' className='bedSelect' onClick={() => select('0','beds')}>Any</div>
            <div id='1beds' className='bedSelect' onClick={() => select('1','beds')}>1+</div>
            <div id='2beds' className='bedSelect' onClick={() => select('2','beds')}>2+</div>
            <div id='3beds' className='bedSelect' onClick={() => select('3','beds')}>3+</div>
          </div>,
    Baths: <div className='dropdown'>
            <div id='0baths' className='bathSelect' onClick={() => select('0','baths')}>Any</div>
            <div id='1baths' className='bathSelect' onClick={() => select('1','baths')}>1+</div>
            <div id='2baths' className='bathSelect' onClick={() => select('2','baths')}>2+</div>
            <div id='3baths' className='bathSelect' onClick={() => select('3','baths')}>3+</div>
          </div>,
  };

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [prevSelectedFilter, setPrevSelectedFilter] = useState(null);

  document.onclick = (e) => {
    if (e.target.id.includes('toggle')) {
      setPrevSelectedFilter(selectedFilter);
      setSelectedFilter(e.target.id.replace('toggle', ''));
    } else {
      setPrevSelectedFilter(selectedFilter);
      setSelectedFilter(e.target.className);
    }
  };

  useEffect(() => {
      if (prevSelectedFilter !== selectedFilter && selectedFilter !== 'dropdown' && selectedFilter !== 'priceText') {
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
              }}
            >
              { filter === 'Beds'
                  ? requestedBeds === ''
                      ?  'All Beds' : `${requestedBeds} Beds`
                  : filter === 'Baths'
                      ? requestedBaths === ''
                          ?  'All Baths' : `${requestedBaths} Baths`
                      : filter === 'Price'
                          ? requestedMinPrice === ''
                              ? requestedMaxPrice === ''
                                  ? 'Any Price'
                                  : `$0-$${requestedMaxPrice}`
                              : requestedMaxPrice === ''
                                  ? `$${requestedMinPrice}+`
                                  : `$${requestedMinPrice}-$${requestedMaxPrice}`
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
      {/* <div className='singleFilterContainer'>
        <div className='filter'>Save</div>
      </div> */}
    </div>
  );
};

export default Filters;