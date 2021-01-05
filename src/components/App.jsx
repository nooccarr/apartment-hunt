import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute.jsx';
import { ApartmentContext } from './HomePage/ApartmentContext.jsx';
import { AuthContext } from './Authentication/Auth/AuthContext.jsx';
import { HomeLogin, UserProfile } from './pages/index.jsx';
import Overview from './overview/Overview.jsx';
import UploadListing from './Agent/UploadListing.jsx';

const App = () => {
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
      <AuthContext.Provider value={true}>
        <Router>
          <div>
            <PrivateRoute path='/user' component={UserProfile} />
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
