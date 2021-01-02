import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

import SearchBar from '../SearchResults/TopBanner/SearchBar/index.js';
import Login from '../Authentication/Login/Login.jsx';

const Navigation  = ({ searchValue, setSearchValue }) => {

 
        return (
          <div>
      <div className="navheader">
        <div className="header" id="home">
       
        
          <div className="header_top">
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
                    
                    <li className="chatButton" >
                      <div id="chatButton"><a href="#" id="chatButton"><span>Chat Button</span></a></div>
                    </li>		    
                    <li className="login" >
                      <div id="loginContainer"><a href="#" id="loginButton"><span>Login</span></a></div>
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
