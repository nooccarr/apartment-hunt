import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import GoogleMap from './GoogleMap';
import Results from './Results';
import './styles.scss';

const SearchResults = () => {
  
  const [requestedBeds, setRequestedBeds] = useState('');
  const [requestedBaths, setRequestedBaths] = useState('');
  const [requestedMinPrice, setRequestedMinPrice] = useState('');
  const [requestedMaxPrice, setRequestedMaxPrice] = useState('');
  const [requestedDogs, setRequestedDogs] = useState(false);
  const [requestedCats, setRequestedCats] = useState(false);

  return (
    <div 
      className='main'
      // style={{height: `${document.body.offsetHeight - 300}px`}}
    >
      <div className='bottomContainer'>
        <div className='leftSide'>
          <Filters 
            requestedBeds={ requestedBeds }
            setRequestedBeds={ setRequestedBeds } 
            requestedBaths={ requestedBaths }
            setRequestedBaths={ setRequestedBaths }
            requestedMinPrice={ requestedMinPrice }
            setRequestedMinPrice={ setRequestedMinPrice }
            requestedMaxPrice={ requestedMaxPrice }
            setRequestedMaxPrice={ setRequestedMaxPrice }
            requestedDogs={ requestedDogs }
            setRequestedDogs= { setRequestedDogs }
            requestedCats={ requestedCats }
            setRequestedCats= { setRequestedCats }
          />
          <Results 
            requestedBaths={ requestedBaths } 
            requestedBeds={ requestedBeds } 
            requestedMinPrice={ requestedMinPrice }
            requestedMaxPrice={ requestedMaxPrice }
            requestedDogs={ requestedDogs }
            requestedCats={ requestedCats }
          />
        </div>
        <div className='rightSide'>
          <GoogleMap />
        </div>
      </div>
      </div>
  );
};

export default SearchResults;