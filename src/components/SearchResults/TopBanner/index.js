import React from 'react';
import SearchBar from './SearchBar';

const TopBanner = ({ searchValue, setSearchValue }) => {
  return (
    <div className='topBanner'>
      <div className='topBannerLeft'>
        <div className='companyName'>Apartment Hunt</div>
        <SearchBar searchValue={ searchValue } setSearchValue={ setSearchValue } />
      </div>
    </div>
  );
};

export default TopBanner;