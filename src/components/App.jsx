import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApartmentContext } from './HomePage/ApartmentContext.jsx';
import { HomeLogin, AdminPortal } from './pages/index.jsx';
import Overview from './overview/Overview.jsx';

import About from './overview/aboutus.jsx';
import ChatApp from './ChatBox/frontend/ChatApp.jsx';
import AgentPortal from './Portal/AgentPortal.jsx';
import SearchResults from './SearchResults/index.js';

import UploadListing from './Agent/UploadListing.jsx';
import Navigation from './overview/navigation.jsx';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [listings, getListings] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [texts, setTexts] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (Cookies.get('jwt')) {
      let token = jwtDecode(Cookies.get('jwt'));
      if (
        token.payload.role === 'user' ||
        token.payload.provider === 'google'
      ) {
        getUserInfo(token.payload.username, token.payload.email);
      } else if (token.payload.role === 'admin') {
        getAdminInfo(token.payload.username, token.payload.email);
      }
    }
    console.log('lol', window.location)
    if (window.location.search.includes('chatId')) {
        let test = window.location.search.split('&')
        for (var keyId of test) {
          if (keyId.includes('chatId')) {
            console.log('chunk', keyId.split('=')[1])
            let key = keyId.split('=')[1]
            setChatId(key)
            // setTexts('alt')
          }
        }
    }
  }, []);

  const signOut = () => {
    window.location.href = '/';
    setUser({});
    setAdmin({});
  };

  const getUserInfo = (name, email) => {
    setUser({
      name: name,
      email: email,
      role: 'client',
    });
  };

  const getAdminInfo = (name, email) => {
    setAdmin({
      name: name,
      email: email,
      role: 'agent',
    });
  };

  // let userLoggin = {
  //   name: 'FreddieMercury',
  //   email: 'FreddieMercury@gmail.com',
  //   role: 'client'
  // }

// let userLoggin = {
//     name: 'Shotaro Tanaka',
//     email: 'Shotaro Tanaka@gmail.com',
//     role: 'agent'
//   }

  const switchChat = (key) => {
    if (texts !== 'alt') {
      setChatId(null)
    }

    setTexts(key)

  } 

  return (
    <div>
      <Navigation
        getAdminInfo={getAdminInfo}
        getUserInfo={getUserInfo}
        signOut={signOut}
        user={user}
        admin={admin}
        switchChat={switchChat} 
        texts={texts} 
        chatKey={chatId}
      />
      <ApartmentContext.Provider
        value={{ listings, getListings, coordinates, setCoordinates }}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomeLogin user={user} />
            </Route>
            <Route exact path='/listings'>
              <SearchResults
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </Route>
            <Route exact path='/admin-dashboard'>
              <AdminPortal admin={admin} getAdminInfo={getAdminInfo} />
            </Route>
            <Route exact path='/apartment'>
              <Overview switchChat={switchChat} texts={texts} user={user}/>
            </Route>
            <Route exact path='/uploadlisting' component={UploadListing} />
            <Route exact path='/aboutus' component={About} />
            <Route exact path='/aportal'>
              <AgentPortal admin={admin} />
            </Route>
          </Switch>
        </Router>
      </ApartmentContext.Provider>
    </div>
  );
};

export default App;
