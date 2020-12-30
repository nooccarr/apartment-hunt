import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, Admin, UserProfile } from './pages/index';
import Overview from './overview/Overview.jsx';

const App = () => {
  return (
    <AuthContext.Provider value={true}>
      <Router>
        <div>
          <Route exact path='/' component={HomeLogin} />
          <PrivateRoute path='/user' component={UserProfile} />
          <PrivateRoute path='/admin' component={Admin} />
        </div>
      </Router>
      <Overview/>
    </AuthContext.Provider>
  );
};

export default App;
