import React, { useState } from 'react';
import HomePage from '../HomePage/HomePage';
import SearchResults from '../SearchResults/index';
// import './styles/homelogin.css';

const HomeLogin = ({ getUserInfo, userID, userName }) => {
  const [searchValue, setSearchValue] = useState(null);
  console.log(userName);

  return searchValue ? (
    <SearchResults searchValue={searchValue} setSearchValue={setSearchValue} />
  ) : (
    <HomePage
      setSearchValue={setSearchValue}
      getUserInfo={getUserInfo}
      userID={userID}
      userName={userName}
    />
  );
};

export default HomeLogin;
