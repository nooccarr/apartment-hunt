import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile, AdminPortal } from './pages/index';
import Overview from './overview/Overview.jsx';
import UploadListing from './Agent/UploadListing';

const App = () => {
  const [tokens, setTokens] = useState(null);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [listings, getListings] = useState([]);

  return (
    <div>
      <ApartmentContext.Provider value={{listings, getListings}}>
        <Router>
          <div>
            <Route exact path='/' component={HomeLogin} />
            <Route exact path='/apartment' component={Overview} />
            <Route exact path='/uploadlisting' component={UploadListing} />
          </div>
        </Router>
      </ApartmentContext.Provider>
     <AuthContext.Provider value={tokens}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomeLogin />
          </Route>
          <PrivateRoute component={UserProfile} user={user} path='/profile' />
          <PrivateRoute component={AdminPortal} admin={admin} path='/admin' />
        </Switch>
      </Router>
    </AuthContext.Provider>
    </div>
  );
};

export default App;
