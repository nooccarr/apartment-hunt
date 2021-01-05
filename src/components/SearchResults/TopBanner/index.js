import React from 'react';
import SearchBar from '../SearchBar';
import Navigation from '../../overview/navigation.jsx';

const TopBanner = ({ searchValue, setSearchValue }) => {
  return (
    <div>
      <Navigation searchValue={ searchValue } setSearchValue={ setSearchValue }/>
    
      <div className='topBanner'>

        {/* <div className='topBannerLeft'>
          <div className='companyName'>Apartment Hunt</div>
          <SearchBar searchValue={ searchValue } setSearchValue={ setSearchValue } />
        </div> */}
      </div>
    </div>
  );
};

export default TopBanner;