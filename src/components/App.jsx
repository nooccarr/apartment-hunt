import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { HomeLogin, AdminPortal } from './pages/index';
import Overview from './overview/Overview.jsx';
import ChatApp from './ChatBox/frontend/ChatApp.jsx'
import AgentPortal from './Portal/AgentPortal.jsx'
import UploadListing from './Agent/UploadListing';
import Navigation from './overview/navigation';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [listings, getListings] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const getUserInfo = (name, email) => {
    setUser({
      name: name,
      email: email,
      role: 'client'
    });
  };

  const getAdminInfo = (name, email) => {
    setAdmin({
      name: name,
      email: email,
      role: 'agent'
    });
  };

  return (
    <div>
      <Navigation user={user} getUserInfo={getUserInfo} />
      <ApartmentContext.Provider value={{listings, getListings, coordinates, setCoordinates}}>
          <Router>
            <Switch>
              <Route exact path='/'>
                <HomeLogin user={user} getUserInfo={getUserInfo} />
              </Route>
              <Route exact path='/admin-dashboard'>
                <AdminPortal admin={admin} getAdminInfo={getAdminInfo} />
              </Route>
                <Route exact path='/apartment'>
                  <Overview user={user} admin={admin}/>
                </Route>
              <Route exact path='/uploadlisting' component={UploadListing} />
              <Route exact path='/aportal'>
                <AgentPortal admin={admin}/>
              </Route>
            </Switch>
          </Router>
      </ApartmentContext.Provider>
    </div>
  );
};

export default App;
