import React, { useState } from 'react';
import HomePageSearch from './Search.jsx';
// import './styles/homelogin.css';
import './styles/main.scss';

const HomePage = ({ setSearchValue}) => {

  return (
    <div className='homepage-container'>
      <div className='top-container'>
        <div className='homepage-bot-container'>
          <div>
            <div>
            <h1 className='Logo'>Apartment Hunt</h1>
            </div>
            <div>
            <p className='Slogan'>
              Smarter apartment search. Quality apartments you'll want to rent.
            </p>
            </div>
          </div>
          <HomePageSearch setSearchValue={setSearchValue} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
