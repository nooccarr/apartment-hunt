import React from 'react';
<<<<<<< HEAD
import SearchBar from './SearchBar';
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
=======
import SearchBar from '../SearchBar';

const TopBanner = ({ searchValue, setSearchValue }) => {
  return (
    <div className='topBanner'>
      <SearchBar searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <div className='companyName' data-text='Apartment Hunt' >Apartment Hunt</div>
      <div style={{marginRight: '30px'}}>Sign-In / Register</div>
>>>>>>> staging
    </div>
  );
};

export default TopBanner;