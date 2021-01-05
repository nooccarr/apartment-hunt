import React, { useState } from 'react';
import Filters from './Filters';
import GoogleMap from './GoogleMap';
// import NeonSign from './GoogleMap/NeonSign';
import Results from './Results';
import './styles.scss';
import TopBanner from './TopBanner';
import resultsArray from '../../../aptClean.json';

const SearchResults = ({ searchValue, setSearchValue }) => {
  
  const [requestedBeds, setRequestedBeds] = useState(0);
  const [requestedBaths, setRequestedBaths] = useState(0);

  return (
    <div className='main'>
      <TopBanner searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <div className='bottomContainer'>
        <div className='leftSide'>
          <Filters 
            requestedBeds={ requestedBeds }
            setRequestedBeds={ setRequestedBeds } 
            requestedBaths={ requestedBaths }
            setRequestedBaths={ setRequestedBaths }
          />
          <Results resultsArray={ resultsArray } requestedBaths={ requestedBaths } requestedBeds={ requestedBeds } />
        </div>
        <div className='rightSide'>
          <GoogleMap />
        </div>
      </div>
      </div>
  );
};

export default SearchResults;