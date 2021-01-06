import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Login, LoginModal } from '../Authentication/index.jsx';
import logo from '../../images/logo.png';
import '../HomePage/styles/main.scss';
import './navigation-style.scss';
import SearchBar from '../SearchResults/SearchBar/index.js';
import axios from 'axios';

const Navigation = ({ searchValue, setSearchValue, getUserInfo, user }) => {
  const [clickedLogin, setClickedLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (boolean) => {
    setClickedLogin(true);
    setModalOpen(boolean);
  };

  const signOut = () => {
    alert('signing out');
    axios
      .delete('/signout')
      .then((response) => {
        console.log('logout response', response);
        //jwt cookie should be undefined now
        console.log('jwt cookies', Cookies.get('jwt'));
      })
      .catch((err) => {
        console.log('error while logging out', err);
      });
  };

  return (
    <Router>
      <div>
        <div className='navheader'>
          <div className='header' id='home'>
            <div className='header_top'>
              <div className='wrap'>
                <div className='col-1-3'>
                  <div className='logo'>
                    <a href='/'>
                      <img src={logo} />
                    </a>
                  </div>
                </div>

                <div className='navigation-search-bar'>
                  <div className='col-2-3'>
                    <div className='menu'>
                      <ul>
                        <li>
                          <a href='/' className='scroll'>
                            Find Apartments
                          </a>
                        </li>
                        <li>
                          <a href='/aboutus' className='scroll'>
                            About Us
                          </a>
                        </li>

                        <li className='chatButton'>
                          <div id='chatButton'>
                            <a href='#' id='chatButton'>
                              <span>Chat Button</span>
                            </a>
                          </div>
                        </li>
                        <li className='login'>
                          <button type='submit' id='loginButton'>
                            <span onClick={() => openModal(true)}>
                              <Link to='/login'> Login</Link>
                            </span>
                            <span onClick={() => signOut(true)}>
                              <Link to='/'> Logout</Link>
                            </span>
                          </button>
                          <div>{user.name ? user.name : ''}</div>
                        </li>
                      </ul>
                    </div>
                    {clickedLogin ? (
                      <LoginModal
                        Login={
                          <Login
                            openModal={openModal}
                            getUserInfo={getUserInfo}
                          />
                        }
                        modalOpen={modalOpen}
                        openModal={openModal}
                      />
                    ) : (
                      ''
                    )}
                    <div className='search-form'>
                      <form
                        method='get'
                        action='/homelist'
                        id='search'
                        className='f-right'>
                        <SearchBar
                          searchValue={searchValue}
                          setSearchValue={setSearchValue}
                        />

                        <button type='submit' className='searchButton'>
                          {' '}
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default Navigation;
