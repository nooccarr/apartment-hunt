import React, { useState } from 'react';
import { Login, LoginModal } from '../../Authentication/index.jsx'
import HomePageSearch from './Search.jsx'

const HomePage = () => {
  // const [clickedLogin, setClickedLogin] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);

  // const login = () => {
  //   setClickedLogin(true);
  // };

  // const openModal = (boolean) => {
  //   setModalOpen(boolean);
  // };

  return (
    <div className='homepage-container'>
      <div className='top-container'>
        <div className='container'>
          <h1 
            className='Sign-In' 
            // onClick={login}
            // onClick={openModal}
          >
            Log In
          </h1>
          {/* {clickedLogin 
            ? (<LoginModal Login={<Login />} modalOpen={modalOpen} openModal={openModal} />)
            : ('')} */}
        </div>
        <div>
          <h1 className='Logo'>Apartment Hunt</h1>
          <p className='Slogan'>Smarter apartment search. Quality apartments you'll want to rent.</p>
        </div>
        <HomePageSearch />
      </div>
      <div className='button-container'>
      </div>
    </div>
  )
};

export default HomePage;