import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile, AdminPortal } from './pages/index';
import Overview from './overview/Overview.jsx';
import UploadListing from './Agent/UploadListing';


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
    </div>
  );
};

export default App;
