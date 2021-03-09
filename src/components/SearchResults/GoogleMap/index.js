import React, { useContext } from 'react';
import { ApartmentContext } from '../../HomePage/ApartmentContext.jsx'
// import google_api_key from '../config/google_api_key.js';
import { Loader } from '@googlemaps/js-api-loader';
import lightMap from './MapStyles/lightmap.js';
import darkMap from './MapStyles/darkmap.js';

const GoogleMap = () => {
  // const [light, setLighting] = useState(true)
  let map, marker;
  const { listings, coordinates } = useContext(ApartmentContext)

  const loader = new Loader({
    // apiKey: google_api_key,
    apiKey: process.env.GOOGLE_API_KEY,
    version: 'weekly'
  });

  const params = window.location.search.split('&');

  loader.load()
    .then(() => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: Number(params[1].split('=')[1]), lng: Number(params[2].split('=')[1]) },
        zoom: 14,
        options: { styles: lightMap }
      });
    })
    .then(() => {
      marker = new google.maps.Marker({
        position: { lat: Number(params[1].split('=')[1]), lng: Number(params[2].split('=')[1])},
        map,
        title: 'Current Location',
      })
    })
    .then(() => {
      marker = listings.map((apartment, i) => {
        if (apartment.address === '' || listings.address === null) {
          return;
        } else {
          new google.maps.Marker({
          position: { lat: apartment.position.coordinates[1], lng: apartment.position.coordinates[0] },
          map,
          title: "Apartment Listing",
          icon: {
            url: "https://img.icons8.com/emoji/48/000000/house-emoji.png",
            scaledSize: new window.google.maps.Size(45, 45)
          }
        });
      }
    })
  })
    .catch(err => alert(err));

  return (
    <div id='map'></div>
  );
};

export default GoogleMap;
