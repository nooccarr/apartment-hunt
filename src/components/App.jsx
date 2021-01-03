import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/Auth/PrivateRoute';
import { AuthContext } from './Authentication/Auth/AuthContext';
import { HomeLogin, UserProfile } from './pages/index';
import Overview from './overview/Overview.jsx';
import ChatApp from './ChatBox/frontend/ChatApp.jsx'

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
      {/* ///////////FIXME:ChatBox/////////// */}
      <Router>
        <div>
          <Route exact path='/chatbox' component={ChatApp} />
        </div>
      </Router>
    </div>
  );
};

export default App;
