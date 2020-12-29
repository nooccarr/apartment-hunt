import React from 'react';
// import LandingPage from '../Authentication/Login/Main';
import './styles/homelogin.css';
import searchicon from './styles/images/search-icon.png'

const HomeLogin = () => {

  return (
    <div>
      {/* <LandingPage /> */}
      <div className='container'>
        <h1 className='Sign-In'>Log In</h1>
      </div>
      <div>
        <h1 className='Logo'>Apartment Hunt</h1>
        <p className='Slogan'>Smarter apartment search. Quality apartments you'll want to rent.</p>
      </div>
      <div>
        <form className='search-container'>
          <input className='search-bar' type='text' name='searchtext' placeholder='Enter an address, neighborhood, city, or ZIP code'/>
          <img className='search-icon' src={searchicon} alt='search-icon'/>
        </form>
      </div>

      <i className="searchInputIcon fa fa-search"></i>
    </div>
  );
};

export default HomeLogin;
