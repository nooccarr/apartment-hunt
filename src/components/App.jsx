<<<<<<< HEAD
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Overview from './overview/Overview.jsx'
import About from './overview/aboutus.jsx';
import '../../dist/styles/styles.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render () {
    return (
    <Router>
      <Switch>
        <Route  path="/aboutus">
          <About/>
        </Route>
        <Route path="/">
          <Overview/>
        </Route>  
      </Switch>
    </Router>
      /* {<div>
        I love <span className='pink'>pink!</span>
        I love my dog teddy!
        <Overview/>
      </div>} */
      
    )

  }
}



export default App;
=======

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
>>>>>>> overview
