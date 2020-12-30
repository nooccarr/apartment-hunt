import React, { useState } from 'react';
import { Login, LoginModal } from '../Authentication/index';
import HomePageSearch from './Search.jsx';
import './styles/homelogin.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const HomePage = () => {
  const [clickedLogin, setClickedLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (boolean) => {
    setClickedLogin(true);
    setModalOpen(boolean);
  };

  return (
    <div className='homepage-container'>
      <div className='top-container'>
        <div className='container'>
          <h1 className='Sign-In' onClick={() => openModal(true)}>
            Log In
          </h1>
          {clickedLogin ? (
            <LoginModal
              Login={<Login />}
              modalOpen={modalOpen}
              openModal={openModal}
            />
          ) : (
            ''
          )}
        </div>
        <div>
          <h1 className='Logo'>Apartment Hunt</h1>
          <p className='Slogan'>
            Smarter apartment search. Quality apartments you'll want to rent.
          </p>
        </div>
        <HomePageSearch />
      </div>
      <div className='button-container'></div>

      <a>
      <Link to='/apartment'>Stuff</Link>
      </a>
    </div>
  );
};

export default HomePage;
