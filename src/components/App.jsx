import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApartmentContext } from './HomePage/ApartmentContext.jsx';
import { HomeLogin, AdminPortal } from './pages/index.jsx';
import Overview from './overview/Overview.jsx';
import ChatApp from './ChatBox/frontend/ChatApp.jsx'
import AgentPortal from './Portal/AgentPortal.jsx'
import UploadListing from './Agent/UploadListing.jsx';
import Navigation from './overview/navigation.jsx';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [listings, getListings] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [texts, setTexts] = useState(null);
  // const [textsCon, setTextsCon] = useState(false);

  useEffect(() => {
    if (Cookies.get('jwt')) {
      let token = jwtDecode(Cookies.get('jwt'));
      getUserInfo(token.payload.username, token.payload.email);
    }
  }, []);

  const getUserInfo = (name, email) => {
    setUser({
      name: name,
      email: email,
      role: 'client'
    });
  };

  const getAdminInfo = (name, email) => {
    setAdmin({
      name: name,
      email: email,
      role: 'agent'
    });
  };

  // let userLoggin = {
  //   name: 'FreddieMercury',
  //   email: 'FreddieMercury@gmail.com',
  //   role: 'client'
  // }

let userLoggin = {
    name: 'Shotaro Tanaka',
    email: 'Shotaro Tanaka@gmail.com',
    role: 'agent'
  }

  const switchChat = (key) => {
    // setTexts(bool);
    setTexts(key)
  }



  return (
    <div>
      <Navigation getUserInfo={getUserInfo} user={user} admin={admin} userLoggin={userLoggin} switchChat={switchChat} texts={texts}/>
      <ApartmentContext.Provider value={{listings, getListings, coordinates, setCoordinates}}>
          <Router>
            <Switch>
              <Route exact path='/'>
                <HomeLogin user={user} />
              </Route>
              <Route exact path='/admin-dashboard'>
                <AdminPortal admin={admin} getAdminInfo={getAdminInfo} />
              </Route>
                <Route exact path='/apartment'>
                  <Overview switchChat={switchChat} texts={texts}/>
                </Route>
              <Route exact path='/uploadlisting' component={UploadListing} />
              <Route exact path='/aportal'>
                <AgentPortal admin={admin} userLoggin={userLoggin}/>
              </Route>
            </Switch>
          </Router>
      </ApartmentContext.Provider>
    </div>
  );
};

export default App;
