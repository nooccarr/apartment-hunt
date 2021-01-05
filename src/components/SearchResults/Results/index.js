import React, { useContext } from 'react';
import { ApartmentContext } from '../../HomePage/ApartmentContext.jsx'
import Listings from './Listings/index';
import './_results_styles.scss';

const Results = () => {
  const { listings } = useContext(ApartmentContext)
  // const sampleData = [{
  //   photos: [
  //     'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
  //     'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/16f1f46922b8b7c0da9a38100b77b293-full.webp'
  // ],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: ['https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp'],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: [
  //     'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
  //     'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/16f1f46922b8b7c0da9a38100b77b293-full.webp'
  // ],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: ['https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp'],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: ['https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp'],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: ['https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp'],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: ['https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp'],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: ['https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp'],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: ['https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp'],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }, {
  //   photos: ['https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp'],
  //   price: '$500,000',
  //   beds: '3bd',
  //   baths: '3ba',
  //   size: '1,500 sqft',
  //   street: '999 Garfield Rd',
  //   city: 'Portsmouth',
  //   state: 'NH'
  // }];

  return (
    <div className='results'>
      {listings.map(listing => <Listings listing={ listing } />)}
    </div>
  );
};

export default Results;