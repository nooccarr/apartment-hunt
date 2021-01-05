import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { ApartmentContext } from './HomePage/ApartmentContext';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile } from './pages/index';
import Overview from './overview/Overview.jsx';
import UploadListing from './Agent/UploadListing';
import About from './overview/aboutus.jsx';


const App = () => {
  const [listings, getListings] = useState([]);

  return (
    <div>
      <ApartmentContext.Provider value={{listings, getListings}}>
        <Router>
          <div>
            <Route exact path='/' component={HomeLogin} />
            <Route exact path='/apartment' component={Overview} />
            <Route exact path='/aboutus' component={About} />
            <Route exact path='/uploadlisting' component={UploadListing} />
          </div>
        </Router>
      </ApartmentContext.Provider>
      <AuthContext.Provider value={true}>
        <Router>
          <div>
            <PrivateRoute exact path='/user' component={UserProfile} />
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
