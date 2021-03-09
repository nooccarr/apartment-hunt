import React, { useState, useContext } from 'react';
import { ApartmentContext } from './ApartmentContext.jsx';
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import searchicon from './styles/images/search-icon.png';
import pinkmarker from './styles/images/pink-marker.png';

const HomePageSearch = ({ searchValue, setSearchValue }) => {
  const [address, setAddress] = useState(searchValue);
  const {listings, getListings, coordinates, setCoordinates} = useContext(ApartmentContext)

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const findApartments = () => {
    // API call with Coordinates
    axios.get('/search', {
      params: {
        distance: 0.25,
        lat: coordinates.lat,
        long: coordinates.lng,
      }
    })
      .then((results) => { getListings(results.data); })
      .then(() => {
        let path = `/listings?distance=${0.25}&lat=${coordinates.lat}&long=${coordinates.lng}`;
        window.history.pushState({path: path}, '', path);
        window.location.reload(false);
      })
      // .then(() => { setSearchValue(address || 'Current Location'); })
      .catch((error) => { console.log('Error getting Apartments Nearby: ', error)});
  }


  const startGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, handleError);
    } else {
      alert('Geolocation Not Available.');
    }
  };

  const getCoordinates = async (position) => {
    await setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
    findApartments();
  }

  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User Denied Geolocation Permission.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Users Position Unavailable.');
        break;
      case error.TIMEOUT:
        alert('User Location Request Timeout.');
        break;
      case error.UNKNOWN_ERROR:
        alert('Unknown Error Has Ocurred With Geolocation.');
        break;
    }
  };

  return (
    <>
      <div>
        <PlacesAutoComplete
          value={address || ''}
          onChange={setAddress}
          onSelect={handleSelect}>
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <form
                className='search-container'
                onSubmit={findApartments}
              >
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
                  onClick={findApartments}
                />
              </form>
              <div
                className='search-list'>
                {loading && <div className='search-suggestions' key='999'>Loading...</div>}

                {suggestions.map((suggestion, index) => {
                  return (
                    // <>
                      <div
                        {...getSuggestionItemProps(suggestion)}
                        className='search-suggestions'
                        key={index}
                      >
                        {suggestion.description}
                      </div>
                    // </>
                  );
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
