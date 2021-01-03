import React, { useState } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";
import searchicon from './styles/images/search-icon.png'
import pinkmarker from './styles/images/pink-marker.png'
import SearchResults from '../SearchResults';

const HomePageSearch = ({ searchValue, setSearchValue }) => {
  const [address, setAddress] = useState(searchValue);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [apartments, addApartments] = useState([]);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    // setSearchValue(value);
    setAddress(value);
    setCoordinates(latLng);
    // getNearby(coordinates);
  };

  const findApartments = async () => {
    setSearchValue(address)
  }

  const startGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, handleError);
    } else {
      alert('Geolocation Not Available.')
    }
  }

  const getCoordinates = (position) => {
    console.log(position);
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

  // const getNearby = (coordinates) => {
  //   axios.get('/locations', { params: {coordinates} })
  //     .then(({ data }) => { addApartments(data)})
  //     .catch((error) => { console.log('Error getting Apartments Nearby: ', error)});
  // }

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
              <form 
                className='search-container' 
                onSubmit={findApartments}>
                <img 
                  className='pink-marker' 
                  src={pinkmarker} 
                  alt='pink-marker'
                  onClick={startGeolocation}
                />
                <input 
                  className='search-bar'
                  onChange={setAddress}
                  {...getInputProps({placeholder: 'Enter an address, neighborhood, city, or ZIP code' })} 
                  />
                <img 
                  className='search-icon' 
                  src={searchicon}
                  alt='search-icon'
                  onClick={findApartments}/>
              </form>
              <div 
                className='search-list'>
                {loading && <div className='search-suggestions'>Loading...</div>}

                {suggestions.map((suggestion, index) => {
                  return (
                    <>
                      <div 
                        {...getSuggestionItemProps(suggestion)} 
                        className='search-suggestions' 
                        key={index}
                      >
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
