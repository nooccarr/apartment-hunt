import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Login, LoginModal } from '../Authentication/index.jsx';
import logo from '../../images/logo.png';
import '../HomePage/styles/main.scss';
import './navigation-style.scss';
import SearchBar from './SearchBar/index.js';
import ChatApp from '../ChatBox/frontend/ChatApp.jsx';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { Home } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import UploadListing from '../Agent/UploadListing.jsx';

const Navigation = ({
  searchValue,
  setSearchValue,
  getUserInfo,
  getAdminInfo,
  user,
  admin,
  signOut,
}) => {
  const [clickedLogin, setClickedLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [convos, setConvos] = useState(false);

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
        token.payload.provider === 'google'
      ) {
        return (
          <li className='chatButton'>
            <div style={{ overflow: 'visible' }}>
              <span onClick={() => setConvos(!convos)}>
                <img
                  width='25'
                  height='30'
                  src='data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTAgMzQ5LjAyMmMwIDEyLjE4NyAxMy44MDggMTkuMjc3IDIzLjcxMSAxMi4yMTFsODIuNDcxLTU4LjgzMmM2LjkxNy00LjkzNCAxNS4wNjUtNy41NDIgMjMuNTYzLTcuNTQyaDE4MS4zODJjMzEuOTI4IDAgNTcuOTAyLTI1Ljk3NSA1Ny45MDItNTcuOTAydi0xOTAuMzMxYzAtOC4yODQtNi43MTYtMTUtMTUtMTVoLTI5Ni4xMjdjLTMxLjkyNyAwLTU3LjkwMiAyNS45NzQtNTcuOTAyIDU3LjkwMnptMzAtMjU5LjQ5NGMwLTE1LjM4NiAxMi41MTctMjcuOTAyIDI3LjkwMi0yNy45MDJoMjgxLjEyNnYxNzUuMzMxYzAgMTUuMzg2LTEyLjUxNyAyNy45MDItMjcuOTAyIDI3LjkwMmgtMTgxLjM4MmMtMTQuNzggMC0yOC45NTIgNC41MzctNDAuOTg0IDEzLjEybC01OC43NiA0MS45MTd6Ii8+PHBhdGggZD0ibTUxMiAyMDUuODc2YzAtMzEuOTMyLTI1Ljk3NC01Ny45MS01Ny45LTU3LjkxaC00MC4wN2MtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNWg0MC4wN2MxNS4zODUgMCAyNy45IDEyLjUyMSAyNy45IDI3LjkxdjIzMC4zNjRsLTU4Ljc1OS00MS45MTVjLTEyLjAzMS04LjU4My0yNi4yMDItMTMuMTE5LTQwLjk4MS0xMy4xMTloLTE4MS4zOWMtMTUuMzg1IDAtMjcuOS0xMi41MjEtMjcuOS0yNy45MXYtMTMuNDM5YzAtOC4yODQtNi43MTYtMTUtMTUtMTVzLTE1IDYuNzE2LTE1IDE1djEzLjQzOWMwIDMxLjkzMiAyNS45NzQgNTcuOTEgNTcuOSA1Ny45MWgxODEuMzljOC40OTcgMCAxNi42NDQgMi42MDcgMjMuNTYgNy41NDFsODIuNDcgNTguODNjOS44NTMgNy4wMzEgMjMuNzExLjAxNSAyMy43MTEtMTIuMjExdi0yNTkuNDl6Ii8+PHBhdGggZD0ibTEwNy44NjIgMTQzLjMzOWgxNzMuMzA0YzguMjg0IDAgMTUtNi43MTYgMTUtMTVzLTYuNzE2LTE1LTE1LTE1aC0xNzMuMzA0Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1eiIvPjxwYXRoIGQ9Im0xMDcuODYyIDIxMy4zMzloMTczLjMwNGM4LjI4NCAwIDE1LTYuNzE2IDE1LTE1cy02LjcxNi0xNS0xNS0xNWgtMTczLjMwNGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNXoiLz48L2c+PC9zdmc+'
                />
              </span>
              <div style={{ position: 'absolute' }}>
                <ChatApp
                  convos={convos}
                  shutConvo={shutConvo}
                  user={user}
                  admin={admin}
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
        return <div>''</div>;
      }
    }
  };

  return (
    <div>
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
                      {window.location.pathname === '/' ? null : (
                        <div className='logo'>
                          <a href='/'>

                            <img src={logo} />
                          </a>
                        </div>
                      )}
                      </li>
                      <li>
                        <div className="agentDrop">
                          <button className="agentButton" onClick={showDrop}>
                            Agent Portal
                          </button>
                          <div id="agentPages" className="agentContent">
                            <p
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
                      <li>
                        <a href="/" className="scroll">
                          Find Apartments
                        </a>
                      </li>
                      <li>
                        <a href='/UploadListing' className='scroll'>
                          UploadListing
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
                        <Button>
                          {user.name || admin.name ? (
                            ''
                          ) : (
                            <span onClick={() => openModal(true)}>
                              <Link to='/login'> Login</Link>
                            </span>
                          )}
                        </Button>
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
                  {window.location.pathname === '/' ? null: <div className='search-form'> 
                        <form
                        method='get'
                        action='/homelist'
                        id='search'
                        className='f-right'>
                          <ul>
                            <li>
                        <SearchBar
                          searchValue={searchValue}
                          setSearchValue={setSearchValue}
                        />
                            </li>
                            <li>
                        <button type='submit' className='searchButton'>
                          {' '}
                          Search
                        </button>
                         </li>
                        </ul>
                      </form>
                      
                      </div>}

                    
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
      {/* </div> */}
      {window.location.pathname === '/' ? <div className='navheader_home'></div> : <div className='navheader_bottom'></div>}
    </Router> 
    </div> 
  );
};

export default Navigation;
