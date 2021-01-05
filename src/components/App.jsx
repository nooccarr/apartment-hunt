import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile, AdminPortal } from './pages/index';

const App = () => {
  const [tokens, setTokens] = useState(null);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});

  return (
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
  );
};

export default App;
