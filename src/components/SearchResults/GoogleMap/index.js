import React, {useContext} from 'react';
import { ApartmentContext } from '../../HomePage/ApartmentContext.jsx'
import google_api_key from '../config/google_api_key.js';
import { Loader } from '@googlemaps/js-api-loader';
import lightMap from './MapStyles/lightmap.js';
import darkMap from './MapStyles/darkmap.js';

const GoogleMap = () => {
  // const [light, setLighting] = useState(true)
  let map, marker;
  const { listings } = useContext(ApartmentContext)

  const loader = new Loader({
    apiKey: google_api_key,
    version: 'weekly'
  });

  loader.load()
    .then(() => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.69396233779667, lng: -73.94443814752641 },
        zoom: 14,
        options: { styles: lightMap }
      });
    })
    .then(() => {
      marker = listings.map((apartment) => {
        new google.maps.Marker({
          position: { lat: apartment.position.coordinates[1], lng: apartment.position.coordinates[0] },
          map,
          title: "Apartment Listing",
          // icon: {
          //   url: "",
          //   scaledSize: new window.google.maps.Size(45, 25)
          // }
        });
      })
    })
    .catch(err => alert(err));

  return (
    <div id='map'></div>
  );
};

export default GoogleMap;
