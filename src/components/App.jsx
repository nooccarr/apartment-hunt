import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute.jsx';
import { AuthContext } from './Authentication/Auth/AuthContext.jsx';
import { HomeLogin, Admin, UserProfile } from './pages/index.jsx';

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
    </AuthContext.Provider>
  );
};

export default App;
