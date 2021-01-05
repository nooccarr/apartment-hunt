import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile, AdminPortal } from './pages/index';
import Overview from './overview/Overview.jsx';
<<<<<<< HEAD
import ChatApp from './ChatBox/frontend/ChatApp.jsx'
import AgentPortal from './Portal/AgentPortal.jsx'
=======
import UploadListing from './Agent/UploadListing';

>>>>>>> b3bcbdad11894ffedbfb26b057ad15fbcafdf5cb

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
      <ApartmentContext.Provider value={{ listings, getListings }}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomeLogin user={user} getUserInfo={getUserInfo} />
            </Route>
            <Route exact path='/admin-dashboard'>
              <AdminPortal admin={admin} getAdminInfo={getAdminInfo} />
            </Route>
            <Route exact path='/apartment' component={Overview} />
            <Route exact path='/uploadlisting' component={UploadListing} />
          </Switch>
        </Router>
<<<<<<< HEAD
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
=======
      </ApartmentContext.Provider>
>>>>>>> b3bcbdad11894ffedbfb26b057ad15fbcafdf5cb
    </div>
  );
};

export default App;
