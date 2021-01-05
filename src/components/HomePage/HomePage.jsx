import React, { useState } from 'react';
import { Login, LoginModal } from '../Authentication/index';
import HomePageSearch from './Search.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './styles/homelogin.css';

const HomePage = ({ setSearchValue }) => {
  const [clickedLogin, setClickedLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (boolean) => {
    setClickedLogin(true);
    setModalOpen(boolean);
  };

  return (
    <Router>
      <div className='homepage-container'>
        <div className='top-container'>
          <div className='container'>
            <h1 className='Sign-In' onClick={() => openModal(true)}>
              <Link to='/login'> Log In</Link>
            </h1>
            {clickedLogin ? (
              <LoginModal
                Login={<Login openModal={openModal} />}
                modalOpen={modalOpen}
                openModal={openModal}
              />
            ) : (
              ''
            )}
          </div>
          <div className='homepage-bot-container'>
            <div>
              <h1 className='Logo'>Apartment Hunt</h1>
              <p className='Slogan'>
                Smarter apartment search. Quality apartments you'll want to
                rent.
              </p>
            </div>
            <HomePageSearch setSearchValue={setSearchValue} />
          </div>
        </div>
        <Route
          path='/login'
          render={(props) => {
            <LoginModal
              Login={<Login />}
              modalOpen={modalOpen}
              openModal={openModal}
            />;
          }}
        />
      </div>
    </Router>
  );
};

export default HomePage;
