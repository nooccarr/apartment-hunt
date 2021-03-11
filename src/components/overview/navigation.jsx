import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Login, LoginModal } from '../Authentication/index.jsx';
import logo from '../../images/logo.png';
import '../HomePage/styles/main.scss';
import './navigation-style.scss';
import SearchBar from './SearchBar/index.js';
import Search from '../HomePage/Search.jsx';
import ChatApp from '../ChatBox/frontend/ChatApp.jsx';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { Home } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import UploadListing from '../Agent/UploadListing.jsx';


const Navigation = ({ searchValue, setSearchValue, getUserInfo, getAdminInfo, user, admin, signOut, switchChat, texts, chatKey, routed}) => {
  const [clickedLogin, setClickedLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [convos, setConvos] = useState(false);
  // const [userLogIn, setUserLogIn] = useState(null);


  // useEffect(() => {
  //   if (user.hasOwnProperty('name')) {
  //     setUserLogIn(user)
  //   } else if (admin.hasOwnProperty('name')){
  //     setUserLogIn(admin)
  //   }
  // }, [user, admin])



  const shutConvo = () => {
    setConvos(false);
  };

  const openModal = (boolean) => {
    setClickedLogin(true);
    setModalOpen(boolean);
  };

  const showDrop = () => {
    document.getElementById('agentPages').classList.toggle("show");
  }
  const signout = () => {
    axios
      .delete('/signout')
      .then((response) => {
        signOut();
        console.log('logout response', response);
        //jwt cookie should be undefined now
        console.log('jwt cookies', Cookies.get('jwt'));
      })
      .catch((err) => {
        console.log('error while logging out', err);
      });
  };

  const checkCurrentRole = () => {
    if (Cookies.get('jwt')) {
      let token = jwtDecode(Cookies.get('jwt'));
      if (
        token.payload.role === 'client' ||
        token.payload.provider === 'google' || token.payload.role === 'user'
      ) {
        return (
          <li style={{zIndex: '11', cursor: 'pointer'}} className='chatButton'>
            <div style={{ overflow: 'visible' }}>
                <img onClick={() => setConvos(!convos)}
                  width='25'
                  height='25'
                  style={{
                    top: '7px',
                    position: 'relative',
                    margin: '0 10px',
                    filter: 'invert(.97)'
                  }}
                  src='./messages.svg'
                />
              <div style={{ position: 'absolute', zIndex: '11', cursor: 'default', boxShadow: 'none', top: '100px'}}>
                  {console.log('user', user)}
                <ChatApp
                  convos={convos}
                  shutConvo={shutConvo}
                  user={user}
                  switchChat={switchChat}
                  texts={texts}
                  chatKey={chatKey}
                  routed={routed}
                />
              </div>
            </div>
          </li>
        );
      } else if (token.payload.role === 'admin') {
        return (
          <li>
            <div className="agentDrop">
              <button className="agentButton" onClick={showDrop}>
                            Agent Portal
              </button>
              <div id="agentPages" className="agentContent">
                <p
                  style={{ borderBottom: '2px dotted rgb(239, 174, 170)'}}
                  onClick={() => {
                    window.history.pushState(
                      { path: `/uploadlisting` },
                        "",
                        `/uploadlisting`
                      );
                    window.location.reload(false);
                  }}
                >
                Upload Listing
                </p>
                <p
                  onClick={() => {
                    window.history.pushState(
                      { path: `/aportal` },
                      "",
                      `/aportal`
                    );
                    window.location.reload(false);
                  }}
                >
                Agent Portal
                </p>
             </div>
            </div>
          </li>
        );
      } else {
        // return null;
        return <div></div>;
      }
    }
  };

  const AgentChatRender = () => {
    // if (admin.hasOwnProperty('name')) {
      console.log('texts', texts)
      return (
        <ChatApp
        convos={convos}
        shutConvo={shutConvo}
        user={admin}
        switchChat={switchChat}
        texts={texts}
        chatKey={chatKey}
        routed={routed}
        />
    )
  // }
  }

  return (
    <div className="navigationbar">
      <Router>  {/* we should use the parent router */}
      <div>
      {window.location.pathname === '/' ? <div className='navheader_home'></div> : <div className='navheader'></div>}
         {/* <div className='navheader'> */}
          <div className='header' id='home'>
            {window.location.pathname === '/' ? (
              <div className='header_top_home'></div>
            ) : (
              <div className="header_top"></div>
            )}
            <div className='wrap'>
              <div className='col-1-3'>

              </div>

              <div className="navigation-search-bar">
                <div className="col-2-3">
                  <div className="menu">
                    <ul>
                      <li>
                        {window.location.pathname === '/' || window.location.pathname === '/login' ? null : (
                          <div className='logo'>
                            <a href='/'>
                              <img src={logo} />
                            </a>
                          </div>
                        )}
                      </li>
                      <li>
                        <a href="/" className="scroll">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href='/aboutus' className='scroll'>
                            About Us
                          </a>
                        {/* <Link to='/aboutus'>About Us</Link> */}
                      </li>
                      {checkCurrentRole()}
                      <li className='login'>
                          {user.name || admin.name ? (
                            null
                          ) : (
                        <Button>
                            <span onClick={() => openModal(true)}>
                              <Link to='/login'> Login</Link>
                            </span>
                        </Button>
                          )}
                        <Button>
                          {user.name ? user.name : admin.name ? admin.name : ''}
                          <span onClick={() => signout(true)}>
                            <Link to="/"> Logout</Link>
                          </span>
                        </Button>
                      </li>
                    </ul>
                  </div>
                  {clickedLogin ? (
                    <LoginModal
                      Login={
                        <Login
                          openModal={openModal}
                          getUserInfo={getUserInfo}
                          getAdminInfo={getAdminInfo}
                        />
                      }
                      modalOpen={modalOpen}
                      openModal={openModal}
                    />
                  ) : (
                    ""
                  )}
                  <div className="search-form">
                    {window.location.pathname === '/' || window.location.pathname === '/login'  ? null : (
                      <Search />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* </div>
        </div> */}
        <Route
          path="/login"
          render={(props) => {
            <LoginModal
              Login={
                <Login
                  openModal={openModal}
                  getUserInfo={getUserInfo}
                  getAdminInfo={getAdminInfo}
                />
              }
              modalOpen={modalOpen}
              openModal={openModal}
            />;
          }}
        />
      </div>
      {window.location.pathname === '/' ? <div className='navheader_home'></div> : <div className='navheader_bottom'></div>}
    </Router>
    {admin.hasOwnProperty('name') ? AgentChatRender() : null}
    </div>
  );
};

export default Navigation;