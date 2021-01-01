import React from 'react';
import Filters from './Filters';
import GoogleMap from './GoogleMap';
// import NeonSign from './GoogleMap/NeonSign';
import Results from './Results';
import SearchBar from './SearchBar';
import './styles.scss';
import TopBanner from './TopBanner';

const SearchResults = ({ searchValue, setSearchValue }) => {
  return (
    <div className='main'>
      <div className='leftSide'>
      <TopBanner />
      <SearchBar searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <Filters searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <Results />
      </div>
      <div className='rightSide'>
        <GoogleMap />
      </div>
    </div>
  );
};

export default SearchResults;