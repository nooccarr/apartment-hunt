import React from 'react';
import Listings from './Listings';

const Results = () => {
  const sampleData = [{
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }, {
    photo: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/827383880d5b1badeb9efa5421a49579-full.webp',
    price: '$500,000',
    beds: '3bd',
    baths: '3ba',
    size: '1,500 sqft',
    street: '999 Garfield Rd',
    city: 'Portsmouth',
    state: 'NH'
  }];

  return (
    <div className='results'>
      {sampleData.map(listing => <Listings listing={ listing } />)}
    </div>
  );
};

export default Results;