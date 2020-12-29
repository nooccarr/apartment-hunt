import React, { useState } from 'react';
import HomePageSearchFilters from './Filters.jsx'
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import regeneratorRuntime from "regenerator-runtime";
import searchicon from '../styles/images/search-icon.png'

const HomePageSearch = () => {
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [filters, setFilters] = React.useState(false);

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const changeFilterStatus = () => {
    setFilters(!filters);
  }

  return (
    <>
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
              <span className='search-filters' onClick={changeFilterStatus}>Filters</span>
              <img className='search-icon' onClick={handleSelect} src={searchicon} alt='search-icon'/>
            </div>
            <div className='search-list'>
              {loading && <div className='search-suggestions'>Loading...</div>}
              {suggestions.map(suggestion => {
                return (
                  <div className='search-suggestions'>
                      {suggestion.description}
                  </div>)
              })}
            </div>
          </div>
          )}
      </PlacesAutoComplete>
      <HomePageSearchFilters />
      {/* {filters ? <HomePageSearchFilters /> : null} */}
    </>
  )
}

export default HomePageSearch;