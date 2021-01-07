import React, { useState } from 'react';
import Filters from './Filters';
import GoogleMap from './GoogleMap';
// import NeonSign from './GoogleMap/NeonSign';
import Results from './Results';
import './styles.scss';
// import TopBanner from './TopBanner';
import Navigation from '../overview/navigation.jsx';

const SearchResults = ({ searchValue, setSearchValue }) => {
  
  const [requestedBeds, setRequestedBeds] = useState('');
  const [requestedBaths, setRequestedBaths] = useState('');
  const [requestedMinPrice, setRequestedMinPrice] = useState('');
  const [requestedMaxPrice, setRequestedMaxPrice] = useState('');

  return (
    <div className='main'>
      {/* <TopBanner searchValue={ searchValue } setSearchValue={ setSearchValue } /> */}
      {/* <div className='topBanner'>
        <Navigation searchValue={searchValue} setSearchValue={setSearchValue} />
      </div> */}
      <div className='bottomContainer'>
        <div className='leftSide'>
          <Filters 
            requestedBeds={ requestedBeds }
            setRequestedBeds={ setRequestedBeds } 
            requestedBaths={ requestedBaths }
            setRequestedBaths={ setRequestedBaths }
            requestedMinPrice={ requestedMinPrice }
            setRequestedMinPrice={ setRequestedMinPrice }
            requestedMaxPrice={ requestedMaxPrice }
            setRequestedMaxPrice={ setRequestedMaxPrice }
          />
          <Results 
            requestedBaths={ requestedBaths } 
            requestedBeds={ requestedBeds } 
            requestedMinPrice={ requestedMinPrice }
            requestedMaxPrice={ requestedMaxPrice }
          />
        </div>
        <div className='rightSide'>
          <GoogleMap />
        </div>
      </div>
      </div>
  );
};

export default SearchResults;