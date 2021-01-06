import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Login, LoginModal } from '../Authentication/index.jsx';
import logo from '../../images/logo.png';
import '../HomePage/styles/main.scss';
import './navigation-style.scss';
import SearchBar from './SearchBar/index.js';
import ChatApp from '../ChatBox/frontend/ChatApp.jsx'
import axios from 'axios';
import { Home } from '@material-ui/icons';


const Navigation = ({ searchValue, setSearchValue, getUserInfo, user, admin, userLoggin}) => {
  const [clickedLogin, setClickedLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [convos, setConvos] = useState(false);


  const shutConvo = () => {
    setConvos(false)
  }

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
      {window.location.pathname === '/' ? <div className='navheader_home'></div> : <div className='navheader'></div>}
          <div className='header' id='home'>
          {window.location.pathname === '/' ? <div className='header_top_home'></div> : <div className='header_top'></div>}
              <div className='wrap'>
                <div className='col-1-3'>
                  {window.location.pathname === '/' ? null: <div className='logo'>
                    <a href='/'>
                      <img src={logo} />
                    </a>
                  </div> }
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
                          {/* <a href='/aboutus' className='scroll'>
                            About Us
                          </a> */}
                          <Link to ='/aboutus' >About Us</Link>
                        </li>

                        <li className="chatButton" >
                          {userLoggin === undefined ? null : userLoggin.role === 'client' ?
                              <div style={{overflow: 'visible'}}> 
                                <span onClick={() => setConvos(!convos)}><img width="25" height="30" src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTAgMzQ5LjAyMmMwIDEyLjE4NyAxMy44MDggMTkuMjc3IDIzLjcxMSAxMi4yMTFsODIuNDcxLTU4LjgzMmM2LjkxNy00LjkzNCAxNS4wNjUtNy41NDIgMjMuNTYzLTcuNTQyaDE4MS4zODJjMzEuOTI4IDAgNTcuOTAyLTI1Ljk3NSA1Ny45MDItNTcuOTAydi0xOTAuMzMxYzAtOC4yODQtNi43MTYtMTUtMTUtMTVoLTI5Ni4xMjdjLTMxLjkyNyAwLTU3LjkwMiAyNS45NzQtNTcuOTAyIDU3LjkwMnptMzAtMjU5LjQ5NGMwLTE1LjM4NiAxMi41MTctMjcuOTAyIDI3LjkwMi0yNy45MDJoMjgxLjEyNnYxNzUuMzMxYzAgMTUuMzg2LTEyLjUxNyAyNy45MDItMjcuOTAyIDI3LjkwMmgtMTgxLjM4MmMtMTQuNzggMC0yOC45NTIgNC41MzctNDAuOTg0IDEzLjEybC01OC43NiA0MS45MTd6Ii8+PHBhdGggZD0ibTUxMiAyMDUuODc2YzAtMzEuOTMyLTI1Ljk3NC01Ny45MS01Ny45LTU3LjkxaC00MC4wN2MtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNWg0MC4wN2MxNS4zODUgMCAyNy45IDEyLjUyMSAyNy45IDI3LjkxdjIzMC4zNjRsLTU4Ljc1OS00MS45MTVjLTEyLjAzMS04LjU4My0yNi4yMDItMTMuMTE5LTQwLjk4MS0xMy4xMTloLTE4MS4zOWMtMTUuMzg1IDAtMjcuOS0xMi41MjEtMjcuOS0yNy45MXYtMTMuNDM5YzAtOC4yODQtNi43MTYtMTUtMTUtMTVzLTE1IDYuNzE2LTE1IDE1djEzLjQzOWMwIDMxLjkzMiAyNS45NzQgNTcuOTEgNTcuOSA1Ny45MWgxODEuMzljOC40OTcgMCAxNi42NDQgMi42MDcgMjMuNTYgNy41NDFsODIuNDcgNTguODNjOS44NTMgNy4wMzEgMjMuNzExLjAxNSAyMy43MTEtMTIuMjExdi0yNTkuNDl6Ii8+PHBhdGggZD0ibTEwNy44NjIgMTQzLjMzOWgxNzMuMzA0YzguMjg0IDAgMTUtNi43MTYgMTUtMTVzLTYuNzE2LTE1LTE1LTE1aC0xNzMuMzA0Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1eiIvPjxwYXRoIGQ9Im0xMDcuODYyIDIxMy4zMzloMTczLjMwNGM4LjI4NCAwIDE1LTYuNzE2IDE1LTE1cy02LjcxNi0xNS0xNS0xNWgtMTczLjMwNGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNXoiLz48L2c+PC9zdmc+"/></span>
                                  <div style={{position: 'absolute'}}>
                                    <ChatApp convos={convos} shutConvo={shutConvo} userLoggin={userLoggin}/>
                                  </div>
                              </div> :
                            <div id="chatButton"><a href="/aportal" id="chatButton"><span>AgentPortal</span></a></div>}
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
         {/* </div>  */}
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
      {/* </div> */}
      {window.location.pathname === '/' ? <div className='navheader_home'></div> : <div className='navheader_bottom'></div>}
    </Router>
  );
};

export default Navigation;
