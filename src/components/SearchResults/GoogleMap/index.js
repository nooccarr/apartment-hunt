import React from 'react';
import google_api_key from '../config/google_api_key';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = () => {
  let map;

  const loader = new Loader({
    apiKey: google_api_key,
    version: 'weekly'
  });

  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.730610, lng: -73.935242 },
      zoom: 10,
    });
  })

  return (
    <div className='mapContainer'>
      <div id='map'></div>
    </div>
  );
};

export default GoogleMap;