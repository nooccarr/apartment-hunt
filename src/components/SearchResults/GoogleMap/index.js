import React, {useContext} from 'react';
import { ApartmentContext } from '../../HomePage/ApartmentContext'
import google_api_key from '../config/google_api_key';
import { Loader } from '@googlemaps/js-api-loader';
import lightMap from './MapStyles/lightmap.js';
import darkMap from './MapStyles/darkmap.js';
// import createHTMLMapMarker from './html-map-marker';
// import './NeonSign/_neonsign.scss'

const GoogleMap = () => {
  // const [light, setLighting] = useState(true)
  let map, marker;
  const { listings } = useContext(ApartmentContext)
  // const cities = [
  //   {
  //     city: 'new york',
  //     lat: 40.7128,
  //     long: -74.0060,
  //     gradient: 'linear-gradient(125.93262699301636deg, rgba(244, 72, 105,1) 5.209302325581396%,rgba(159, 1, 234,1) 97.30232558139534%)',
  //     className: 'ny',
  //   },
  //   {
  //     city: 'Bronx',
  //     lat: 40.8448,
  //     long: -73.8648,
  //     gradient: 'linear-gradient(125.93262699301636deg, rgba(224, 247, 135,1) 5.209302325581396%,rgba(78, 227, 250,1) 97.30232558139534%)',
  //     className: 'bronx',
  //   },
  //   {
  //     city: 'Brooklyn',
  //     lat: 40.6782,
  //     long: -73.9442,
  //     gradient: 'linear-gradient(125.93262699301636deg, rgba(146, 195, 93,1) 5.209302325581396%,rgba(234, 220, 34,1) 97.30232558139534%)',
  //     className: 'brooklyn',
  //   }
  // ]

  const loader = new Loader({
    apiKey: google_api_key,
    version: 'weekly'
  });

  loader.load()
    .then(() => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.730610, lng: -73.935242 },
        zoom: 10,
        options: { styles: lightMap }
      }); 
    })
    .then(() => {
      marker = listings.map((apartment) => {
        new google.maps.Marker({
          position: { lat: apartment.position.coordinates[1], lng: apartment.position.coordinates[0] },
          map,
          title: "Hello World!",
        });
      })
    })

      // NEON SIGNS

      // cities.forEach(({ city, lat, long, gradient, className }) => {
      //   let marker = createHTMLMapMarker({
      //     latlng: new google.maps.LatLng(lat, long),
      //     map:map,
      //     html: 
      //     `<div class='wrapper'>
      //       <div class='neon-wrapper'>
      //         <span class='${className}'>${city}</span>
      //         <span class='gradient' style='background:${gradient};'></span>
      //         <span class='dodge'></span>
      //       </div>
      //     </div>`
      //   });
      // })
    // })
    .catch(err => alert(err));

  return (
    <div id='map'></div>
  );
};

export default GoogleMap;