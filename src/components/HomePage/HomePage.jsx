import React, { useState } from 'react';
import { Login, LoginModal } from '../Authentication/index.jsx';
import HomePageSearch from './Search.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import './styles/homelogin.css';
import './styles/main.scss';

import axios from 'axios';
import Cookies from 'js-cookie';

const HomePage = ({ setSearchValue, user, getUserInfo }) => {
  const [clickedLogin, setClickedLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // console.log(user);

  const openModal = (boolean) => {
    setClickedLogin(true);
    setModalOpen(boolean);
  };

  const signOut = () => {
    // alert('signing out');
    // axios
    //   .delete('/logout')
    //   .then((response) => {
    //     console.log('logout response', response);
    //     //jwt cookie should be undefined now
    //     console.log('jwt cookies', Cookies.get('jwt'));
    //   })
    //   .catch((err) => {
    //     console.log('error while logging out', err);
    //   });
  };

  return (
    <Router>
      <div className='homepage-container'>
        <div className='top-container'>
          <div className='container'>
            <h1 className='Sign-In' onClick={() => openModal(true)}>
              <Link to='/login'> Log In</Link>
            </h1>
            {/* <h1 className='Sign-Out' onClick={() => signOut()}>
              Sign Out
            </h1> */}
            {clickedLogin ? (
              <LoginModal
                Login={
                  <Login openModal={openModal} getUserInfo={getUserInfo} />
                }
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
              Login={<Login openModal={openModal} getUserInfo={getUserInfo} />}
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
