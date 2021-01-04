import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile } from './pages/index';
import Overview from './overview/Overview.jsx';
import About from './overview/aboutus.jsx';


const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Route exact path='/' component={HomeLogin} />
          <Route exact path='/apartment' component={Overview} />
          <Route exact path='/aboutus' component={About} />
        </div>
      </Router>
 
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
