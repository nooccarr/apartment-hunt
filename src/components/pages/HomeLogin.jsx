import React, { useState } from 'react';
import LandingPage from '../Authentication/Login/Main';
import SearchResults from '../SearchResults/index';
import './styles/homelogin.css';

const HomeLogin = () => {

  const [searchValue, setSearchValue] = useState('a');
  console.log(searchValue);
  return searchValue 
    ? <SearchResults searchValue={ searchValue } setSearchValue={ setSearchValue } /> 
    : <LandingPage setSearchValue={ setSearchValue } />;
};

export default HomeLogin;
