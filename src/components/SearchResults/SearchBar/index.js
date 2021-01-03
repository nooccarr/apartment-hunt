import React from 'react';

const SearchBar = ({ searchValue, setSearchValue }) => {

  const onSearchEnter = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      setSearchValue(e.target.value);
      e.target.blur();
    }
  };

  return (
    <div className='searchBarContainer'>
      <input 
        type='text' 
        id='searchBar'
        defaultValue={ searchValue }
        onKeyPress={onSearchEnter}
        // style={{backgroundImage: 'url(./images/search.png)' }} 
      />
    </div>
  );
};

export default SearchBar;