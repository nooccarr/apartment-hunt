import React from 'react';
import Filters from './filters';
import GoogleMap from './GoogleMap';
import Results from './Results';
import './styles.scss';
import TopBanner from './TopBanner';

const SearchResults = ({ searchValue, setSearchValue }) => {
  return (
    <div className='main'>
      <TopBanner searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <Filters />
      <div className='resultsAndMap'>
        <Results />
        <GoogleMap />
      </div>
    </div>
  );
};

export default SearchResults;