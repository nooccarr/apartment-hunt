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
      <TopBanner searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <div className='bottomContainer'>
        <div className='leftSide'>
          <Filters searchValue={ searchValue } setSearchValue={ setSearchValue } />
          <Results />
        </div>
        <div className='rightSide'>
          <GoogleMap />
        </div>
      </div>
      </div>
  );
};

export default SearchResults;