import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile } from './pages/index';
import Overview from './overview/Overview.jsx';
import UploadListing from './Agent/UploadListing';

const App = () => {
  const [listings, getListings] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  return (
    <div>
      <ApartmentContext.Provider value={{listings, getListings, coordinates, setCoordinates}}>
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
