import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute.jsx';
import { AuthContext } from './Authentication/Auth/AuthContext.jsx';
import { HomeLogin, UserProfile } from './pages/index.jsx';
import Overview from './overview/Overview.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Route exact path='/' component={HomeLogin} />
          <Route exact path='/apartment' component={Overview} />
        </div>
      </Router>
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
