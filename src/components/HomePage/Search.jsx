import React, { useState } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import regeneratorRuntime from "regenerator-runtime";
import searchicon from './styles/images/search-icon.png'
import pinkmarker from './styles/images/pink-marker.png'

const HomePageSearch = ({ searchValue, setSearchValue }) => {
  const [address, setAddress] = useState(searchValue);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setSearchValue(value);
    setAddress(value);
    setCoordinates(latLng);
  };

  const consolelog = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, handleError);
    } else {
      alert('Geolocation Not Available.')
    }
  }

  const getCoordinates = (position) => {
    setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude})
  }

  const handleError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert('User Denied Geolocation Permission.')
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Users Position Unavailable.')
        break;
      case error.TIMEOUT:
        alert('User Location Request Timeout.')
        break;
      case error.UNKNOWN_ERROR:
        alert('Unknown Error Has Ocurred With Geolocation.')
        break;
    }
  }

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
                <img 
                  className='pink-marker' 
                  src={pinkmarker} 
                  alt='pink-marker'
                  onClick={consolelog}
                />
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
  );
};

export default HomePageSearch;
