import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { HomeLogin, AdminPortal } from './pages/index';
import Overview from './overview/Overview.jsx';
import UploadListing from './Agent/UploadListing';
import About from './overview/aboutus.jsx';
import ChatApp from './ChatBox/frontend/ChatApp.jsx';
import AgentPortal from './Portal/AgentPortal.jsx';
import Navigation from './overview/navigation';
import {AuthContext} from '../components/Authentication/Auth/AuthContext.jsx';
import {PrivateRoute} from '../components/Authentication/Auth/PrivateRoute.jsx';

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
      <ApartmentContext.Provider value={{listings, getListings, coordinates, setCoordinates}}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomeLogin user={user} />
            </Route>
            <Route exact path='/admin-dashboard'>
              <AdminPortal admin={admin} getAdminInfo={getAdminInfo} />
            </Route>
            <Route exact path='/apartment' component={Overview} />
            <Route exact path='/aboutus' component={About} />
            <Route exact path='/uploadlisting' component={UploadListing} />
          </Switch>
        </Router>
      </ApartmentContext.Provider>
      <AuthContext.Provider value={isLoggedIn}>
        <Router>
          <Switch>
            <PrivateRoute component={UserProfile} user={user} path='/profile' />
            <PrivateRoute
              component={AdminPortal}
              admin={admin}
              path='/admin-dashboard'
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
      {/* ///////////FIXME:ChatBox/////////// */}
      <Router>
        <div>
          <Route exact path='/chatbox' component={ChatApp} />
        </div>
      </Router>
      <Router>
        <div>
          <Route exact path='/aportal' component={AgentPortal} />
        </div>
      </Router>
    </div>
  );
};

export default App;
