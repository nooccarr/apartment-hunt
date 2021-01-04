import React from 'react';
<<<<<<< HEAD
import SearchBar from '../SearchBar';

const TopBanner = ({ searchValue, setSearchValue }) => {
  return (
    <div className='topBanner'>
      <SearchBar searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <div className='companyName'>Apartment Hunt</div>
      <div style={{marginRight: '30px'}}>Sign-In / Register</div>
=======
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
>>>>>>> 1015bc3b8363b6a4e7b8312d83e7c2a93c013942
    </div>
  );
};

export default TopBanner;