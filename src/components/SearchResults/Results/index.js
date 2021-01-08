import React, { useContext, useEffect } from 'react';
import { ApartmentContext } from '../../HomePage/ApartmentContext.jsx'
import Listings from './Listings/index';
import './_results_styles.scss';
import axios from 'axios';

const Results = ({ requestedBaths, requestedBeds, requestedMinPrice, requestedMaxPrice, requestedDogs, requestedCats }) => {
  const { listings, getListings } = useContext(ApartmentContext);
  var params = window.location.search.split('&');
  useEffect(() => {
    axios.get('/search', { 
      params: {
        distance: Number(params[0].split('=')[1]),
        lat: Number(params[1].split('=')[1]), 
        long: Number(params[2].split('=')[1])
        // lat: coordinates.lat,
        // long: coordinates.lng
      }
      })
      .then((results) => { 
        getListings(results.data);
       })
      .catch((error) => { console.log('Error getting Apartments Nearby: ', error)});
  }, []);
    if (listings) {
      return (
        <div className='results'>
          { listings.map(listing => {
            if ((requestedMaxPrice === '' && listing.price >= requestedMinPrice) && ((listing.beds >= requestedBeds) && (listing.baths >= requestedBaths))) {
              if (requestedDogs && requestedCats) {
                if (listing.pets.dogs && listing.pets.cats) {
                  // console.log('Dogs(true): ', listing.pets.dogs, 'Cats(true): ', listing.pets.cats);
                  return <Listings listing= { listing } />;
                }
              } else if (requestedDogs) {
                if (listing.pets.dogs) {
                  // console.log('Dogs(true): ', listing.pets.dogs, 'Cats(false): ', listing.pets.cats);
                  return <Listings listing= { listing } />;
                }
              } else if (requestedCats) {
                if (listing.pets.cats) {
                  // console.log('Dogs(false): ', listing.pets.dogs, 'Cats(true): ', listing.pets.cats);
                  return <Listings listing= { listing } />;
                }
              } else {
                // console.log('Dogs(false): ', listing.pets.dogs, 'Cats(false): ', listing.pets.cats);
                return <Listings listing= { listing } />;
              }
            } else if ((listing.price >= requestedMinPrice && listing.price <= requestedMaxPrice) && ((listing.beds >= requestedBeds) && (listing.baths >= requestedBaths))) {
              if (requestedDogs && requestedCats) {
                if (listing.pets.dogs && listing.pets.cats) {
                  return <Listings listing= { listing } />;
                }
              } else if (requestedDogs) {
                if (listing.pets.dogs) {
                  return <Listings listing= { listing } />;
                }
              } else if (requestedCats) {
                if (listing.pets.cats) {
                  return <Listings listing= { listing } />;
                }
              } else {
                return <Listings listing= { listing } />;
              }
            }
            })}
        </div>
      );
    } else {
      return null;
    }
};

export default Results;