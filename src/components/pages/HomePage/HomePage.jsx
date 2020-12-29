import React, { useState } from 'react';
import HomePageSearch from './Search.jsx'

const HomePage = () => {
  return (
    <div className='homepage-container'>
      <div className='container'>
        <h1 className='Sign-In'>Log In</h1>
      </div>
      <div>
        <h1 className='Logo'>Apartment Hunt</h1>
        <p className='Slogan'>Smarter apartment search. Quality apartments you'll want to rent.</p>
      </div>
      <HomePageSearch />
    </div>
  )
};

export default HomePage;