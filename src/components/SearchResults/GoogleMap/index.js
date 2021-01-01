import React from 'react';
import google_api_key from '../config/google_api_key';
import { Loader } from '@googlemaps/js-api-loader';
// import createHTMLMapMarker from './html-map-marker';
// import './NeonSign/_neonsign.scss'

const GoogleMap = () => {
  let map;
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
        zoom: 11,
        
        // FOR DARK MODE

        // styles: [
        //   { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        //   { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        //   { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        //   {
        //     featureType: "administrative.locality",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "poi",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "poi.park",
        //     elementType: "geometry",
        //     stylers: [{ color: "#263c3f" }],
        //   },
        //   {
        //     featureType: "poi.park",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#6b9a76" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry",
        //     stylers: [{ color: "#38414e" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "geometry.stroke",
        //     stylers: [{ color: "#212a37" }],
        //   },
        //   {
        //     featureType: "road",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#9ca5b3" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "geometry",
        //     stylers: [{ color: "#746855" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "geometry.stroke",
        //     stylers: [{ color: "#1f2835" }],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#f3d19c" }],
        //   },
        //   {
        //     featureType: "transit",
        //     elementType: "geometry",
        //     stylers: [{ color: "#2f3948" }],
        //   },
        //   {
        //     featureType: "transit.station",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#d59563" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "geometry",
        //     stylers: [{ color: "#17263c" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels.text.fill",
        //     stylers: [{ color: "#515c6d" }],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "labels.text.stroke",
        //     stylers: [{ color: "#17263c" }],
        //   },
        // ],
      });

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
    })
    .catch(err => alert(err));

  return (
    <div id='map'></div>
  );
};

export default GoogleMap;