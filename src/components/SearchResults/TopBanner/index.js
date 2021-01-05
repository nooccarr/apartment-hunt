import React from 'react';
import SearchBar from '../SearchBar';

const TopBanner = ({ searchValue, setSearchValue }) => {
  return (
    <div className='topBanner'>
      <SearchBar searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <div className='companyName' data-text='Apartment Hunt' >Apartment Hunt</div>
      <div style={{marginRight: '30px'}}>Sign-In / Register</div>
    </div>
  );
};

export default TopBanner;