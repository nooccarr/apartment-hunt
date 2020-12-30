import React, { useState } from 'react';

const HomePageSearchFilters = () => {

  const consolelog = () => {
    console.log('hello world')
  }
  return (
    <>
      <form className='filter-container' onSubmit={consolelog}>
        <label>
          Bedrooms:
          <select value={'Choose Amount'} onChange={consolelog}>
            <option value="">Studio</option>
            <option value="1">1 or more</option>
            <option value="2">2 or more</option>
            <option value="3">3 or more</option>
            <option value="4">4 or more</option>
          </select>
        </label>
        <label>
          Bathrooms:
          <select value={'Choose Amount'} onChange={consolelog}>
            <option value="1">1 or more</option>
            <option value="2">2 or more</option>
            <option value="3">3 or more</option>
            <option value="4">4 or more</option>
          </select>
        </label>

        <div>
          <label>
            Price Range:
            <input/>
            {' - '}
            <input/>
          </label>
        </div>
        <input type='submit' value='Save' />
      </form>
    </>

  )
}

export default HomePageSearchFilters;