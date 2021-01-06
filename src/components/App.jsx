import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile, AdminPortal } from './pages/index';
import Overview from './overview/Overview.jsx';
import UploadListing from './Agent/UploadListing';
import About from './overview/aboutus.jsx';
import ChatApp from './ChatBox/frontend/ChatApp.jsx'
import AgentPortal from './Portal/AgentPortal.jsx'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'dylan' });
  const [admin, setAdmin] = useState({});
  const [listings, getListings] = useState([]);

  return (
    <div>
      <ApartmentContext.Provider value={{ listings, getListings }}>
        <Router>
          <Switch>
            <Route exact path='/' component={HomeLogin} />
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
