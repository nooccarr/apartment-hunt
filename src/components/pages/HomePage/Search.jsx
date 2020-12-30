import React, { useState } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import regeneratorRuntime from "regenerator-runtime";
import searchicon from '../styles/images/search-icon.png'
import pinkmarker from '../styles/images/pink-marker.png'

const HomePageSearch = () => {
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <>
      <div>
        <PlacesAutoComplete 
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <div className='search-container'>
                <img className='pink-marker' src={pinkmarker} alt='pink-marker'/>
                <input className='search-bar'
                  {...getInputProps({placeholder: 'Enter an address, neighborhood, city, or ZIP code' })} 
                  />
                <img className='search-icon' src={searchicon} alt='search-icon'/>
              </div>
              <div className='search-list'>
                {loading && <div className='search-suggestions'>Loading...</div>}

                {suggestions.map(suggestion => {
                  return (
                    <>
                      <div {...getSuggestionItemProps(suggestion)} className='search-suggestions' >
                        {suggestion.description}
                      </div>
                    </>)
                })}
              </div>
            </div>
            )}
        </PlacesAutoComplete>
      </div>
    </>
  )
}

export default HomePageSearch;