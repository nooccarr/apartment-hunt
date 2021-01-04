import React, { useState } from 'react';
import HomePage from '../HomePage/HomePage.jsx';
import SearchResults from '../SearchResults/index.jsx';
// import './styles/homelogin.css';

const HomeLogin = () => {

  const [searchValue, setSearchValue] = useState('New York, NY, USA');

  return searchValue
    ? <SearchResults searchValue={ searchValue } setSearchValue={ setSearchValue } />
    : <HomePage setSearchValue={ setSearchValue } />;
};

export default HomeLogin;
