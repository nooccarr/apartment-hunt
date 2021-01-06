import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './navigation-style.scss';
import SearchBar from '../SearchResults/SearchBar/index.js';
import Login from '../Authentication/Login/Login.jsx';
import ChatApp from '../ChatBox/frontend/ChatApp.jsx'

const Navigation  = ({ searchValue, setSearchValue, userLoggin }) => {

  const [convos, setConvos] = useState(false);

  const shutConvo = () => {
    setConvos(false)
  }

    return (
      <div>
        <div className="navheader">
          <div className="header" id="home">
        
          
            <div className="header_top" style={{overflow: 'visible'}}>
              <div style={{position: 'absolute'}}>
                <ChatApp convos={convos} shutConvo={shutConvo} userLoggin={userLoggin}/>
              </div>
              <div className="wrap">
              <div className="col-1-3">
                  <div className="logo">
                      <a href="/" ><img src={logo} /></a>
                  </div>	
              </div>
                <div className="navigation-search-bar">
                  <div className="col-2-3">  
                  <div className="menu">
                    <ul>
                      <li><a href="/" className="scroll">Find Apartments</a></li>
                      <li><a href="/aboutus" className="scroll">About Us</a></li>	
                      {/* {userLoggin.role !== 'client' || userLoggin.role !== 'agent' ?
                      null : */}
                      <li className="chatButton" >
                      {userLoggin.role === 'client' ?
                        <div onClick={() => setConvos(!convos)}><span>OpenChat</span></div> :
                        <div id="chatButton"><a href="/aportal" id="chatButton"><span>AgentPortal</span></a></div>}
                      </li>	    
                      <li className="login" >
                        <button type="submit" id="loginButton"> <span>Login</span></button>
                      </li>
                      
                    </ul>

                    
                  </div>
                  <div className="search-form">
                    <form method="get" action="/homelist" id="search" className="f-right">
                    <SearchBar searchValue={ searchValue } setSearchValue={ setSearchValue } />
                      
                      <button type="submit" className="searchButton"> Search</button>
                    </form>
                  </div>
                </div>
              </div>        
            </div>
          </div>
        </div>
      </div>
    </div>
        );
      };
      
      export default Navigation;
      