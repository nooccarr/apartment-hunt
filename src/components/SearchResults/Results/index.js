import React, { useContext, useEffect } from 'react';
import { ApartmentContext } from '../../HomePage/ApartmentContext.jsx'
import Listings from './Listings/index';
import './_results_styles.scss';
import axios from 'axios';

const Results = ({ requestedBaths, requestedBeds, requestedMinPrice, requestedMaxPrice }) => {
  const { listings, getListings } = useContext(ApartmentContext);
  var params = window.location.search.split('&');
  useEffect(() => {
    axios.get('/search', { 
      params: {
        distance: Number(params[0].split('=')[1]),
        lat: Number(params[1].split('=')[1]), 
        long: Number(params[2].split('=')[1]),
        // lat: coordinates.lat,
        // long: coordinates.lng
      }
      })
      .then((results) => { 
        getListings(results.data);
       })
      .then(() => { 
        setSearchValue(address || 'Current Location');  
      })
      .catch((error) => { console.log('Error getting Apartments Nearby: ', error)});
  }, []);
    if (listings) {
      return (
        <div className='results'>
          { listings.map(listing => {
  
            if ((requestedMaxPrice === '' && listing.price >= requestedMinPrice) && ((listing.beds >= requestedBeds) && (listing.baths >= requestedBaths))) {
              return <Listings listing= { listing } />;
            } else if ((listing.price >= requestedMinPrice && listing.price <= requestedMaxPrice) && ((listing.beds >= requestedBeds) && (listing.baths >= requestedBaths))) {
              return <Listings listing= { listing } />;
            }
            })}
        </div>
      );
    } else {
      return null;
    }
};

export default Results;