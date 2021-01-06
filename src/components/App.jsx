import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { HomeLogin, AdminPortal } from './pages/index';
import Overview from './overview/Overview.jsx';
import UploadListing from './Agent/UploadListing';
import Navigation from './overview/navigation';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [listings, getListings] = useState([]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const getUserInfo = (name, email) => {
    setUser({
      name: name,
      email: email,
    });
  };

  const getAdminInfo = (name, email) => {
    setAdmin({
      name: name,
      email: email,
    });
  };

  return (
    <div>
      <Navigation user={user} getUserInfo={getUserInfo} />
      <ApartmentContext.Provider value={{ listings, getListings }}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomeLogin user={user} />
            </Route>
            <Route exact path='/admin-dashboard'>
              <AdminPortal admin={admin} getAdminInfo={getAdminInfo} />
            </Route>
            <Route exact path='/apartment' component={Overview} />
            <Route exact path='/uploadlisting' component={UploadListing} />
          </Switch>
        </Router>
      </ApartmentContext.Provider>
    </div>
  );
};

export default App;
