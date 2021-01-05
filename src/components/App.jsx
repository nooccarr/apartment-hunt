import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile, AdminPortal } from './pages/index';
import Overview from './overview/Overview.jsx';

const App = () => {
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [adminID, setAdminID] = useState(null);
  const [adminName, setAdminName] = useState(null);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const getUserInfo = (user_ID, username, boolean, current_user) => {
    setUserID(user_ID);
    setUserName(username);
    setToken(boolean);
    setCurrentUser(current_user);
  };

  const getAdminInfo = (admin_ID, adminname, boolean, current_user) => {
    setAdminID(admin_ID);
    setAdminName(adminname);
    setToken(boolean);
    setCurrentUser(current_user);
  };

  console.log(token, userName);

  return (
    <div>
      <AuthContext.Provider value={token}>
        <Router>
          <div>
            <Route exact path='/'>
              <HomeLogin getUserInfo={getUserInfo} />
            </Route>
            <Switch>
              <PrivateRoute path='/profile'>
                <HomeLogin
                  getUserInfo={getUserInfo}
                  userID={userID}
                  userName={userName}
                />
              </PrivateRoute>
              <PrivateRoute path='/admin-dashboard'>
                <AdminPortal
                  adminID={adminID}
                  adminName={adminName}
                  getAdminInfo={getAdminInfo}
                />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
