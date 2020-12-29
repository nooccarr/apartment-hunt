import React, { useState } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import regeneratorRuntime from "regenerator-runtime";
import searchicon from './styles/images/search-icon.png'

const HomePage = () => {
  const [address, setAddress] = React.useState('');

  const handleSelect = async value => {};

  return (
    <div className='homepage-container'>
      <div className='container'>
        <h1 className='Sign-In'>Log In</h1>
      </div>
      <div>
        <h1 className='Logo'>Apartment Hunt</h1>
        <p className='Slogan'>Smarter apartment search. Quality apartments you'll want to rent.</p>
      </div>

      <PlacesAutoComplete 
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, loading }) => (
          <div>
            <div className='search-container'>
              <input className='search-bar'
                {...getInputProps({placeholder: 'Enter an address, neighborhood, city, or ZIP code' })} 
              />
              <img className='search-icon' src={searchicon} alt='search-icon'/>
            </div>
            <div>
              <div>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                return (<div><span>{suggestion.description}</span></div>)
              })}
              </div>
            </div>
          </div>
          )}
      </PlacesAutoComplete>
    </div>
  )
};

export default HomePage;