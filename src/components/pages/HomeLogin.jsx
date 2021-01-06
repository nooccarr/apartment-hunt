import React, { useState } from 'react';
import HomePage from '../HomePage/HomePage.jsx';
import SearchResults from '../SearchResults/index.js';

const HomeLogin = ({ user, getUserInfo }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
        <HomePage
          setSearchValue={setSearchValue}
          user={user}
          getUserInfo={getUserInfo}
        />
  );
};

export default HomeLogin;
