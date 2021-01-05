import React, { useState } from 'react';
import HomePage from '../HomePage/HomePage';
import SearchResults from '../SearchResults/index';

const HomeLogin = () => {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <>
      {searchValue 
      ? <SearchResults searchValue={ searchValue } setSearchValue={ setSearchValue } /> 
      : <HomePage setSearchValue={ setSearchValue } />}
    </>
  )
};

export default HomeLogin;
