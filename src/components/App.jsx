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
  //   name: 'Lonnie567',
  //   email: 'Lonnie567@gmail.com',
  //   role: 'client'
  // }

  return (
    <div>
      <Navigation
        getAdminInfo={getAdminInfo}
        getUserInfo={getUserInfo}
        signOut={signOut}
        user={user}
        admin={admin}
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
              <Overview />
            </Route>
            <Route exact path='/uploadlisting' component={UploadListing} />
            <Route exact path='/aboutus' component={About} />
            <Route exact path='/aportal'>
              <AgentPortal admin={admin} user={user} />
            </Route>
          </Switch>
        </Router>
      </ApartmentContext.Provider>
    </div>
  );
};

export default App;
