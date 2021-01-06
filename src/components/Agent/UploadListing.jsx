import React, { useState } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TopBanner from '../SearchResults/TopBanner';
import VideoUpload from '../FileUpload/VideoUpload.jsx'
import axios from 'axios';
import DoneIcon from '@material-ui/icons/Done';

const UploadListing = ({ searchValue, setSearchValue }) => {
  const [agent, setAgent] = useState('');
  const [url, setUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [listing, setListing] = useState({
    address: '',
    listingName: '',
    state: 'NY',
    zipCode: '',
    city: '',
    country: 'USA',
    description: '',
    sqft: null,
    neighborhoods: [],
    position: {},
    price: null,
    pics: [],
    videos: [],
    pets: {dogs: false, cats: false},
    beds: null,
    baths: null,
    agent: ''
});


const updateVideo = (videoName) => {
    setListing(prevState => ({...prevState, ['videos']: [...prevState['videos'], videoName]}));
}



const addUrl = (e) => {
    e.preventDefault();
    setListing(prevState => ({...prevState, [e.target.name]: [...prevState[e.target.name], url]}));
    setUrl('');
    if (e.target.name === 'pics') {
      let reset = document.getElementById("picIn");
      reset.value = '';
    } else if (e.target.name === 'videos') {
        let reset = document.getElementById("vidIn");
        reset.value = '';
    } else {
        let reset = document.getElementById("hoods");
        reset.value = '';
    }
  };

const getPos = async (e) => {
    e.preventDefault();
    // converts location value to coordinates for API call
    let address = `${listing.address}, ${listing.city}, NY, USA`;
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log(latLng);
    setListing(prevState => ({...prevState,  position: {type: "Point", coordinates: [latLng.lng, latLng.lat]}}));
  };

  const handleChange = (e) => {
      setListing(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  const agentChange = (e) => {
      setAgent(e.target.value);
  }

  const handleUrl = (e) => {
    e.preventDefault();
      setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(listing);
      axios.post('http://localhost:3000/listing', listing)
      .then(() => {
          setIsSuccess(true);
          console.log("success meow!");
      })
      .catch((err) => {
          console.log("Fail meow", err);
      })
      setListing({
        address: '',
        listingName: '',
        state: 'NY',
        zipCode: '',
        city: '',
        country: 'USA',
        description: '',
        sqft: null,
        neighborhoods: [],
        position: {},
        price: null,
        pics: [],
        videos: [],
        pets: {dogs: false, cats: false},
        beds: null,
        baths: null,
        agent: ''
    });
  };


  const handlePets = (e) => {
    e.preventDefault();
    if(e.target.value === 'yes') {

        setListing(prevState => ({...prevState, pets: {...prevState.pets, [e.target.name]: true}}));
    }
    if(e.target.value === 'no') {

        setListing(prevState => ({...prevState, pets: {...prevState.pets, [e.target.name]: false}}));
    }
  };


  /*<div className='rightSide'>
          <h2 className="appSearch">APPLICANT SEARCH</h2>
          <div>
              <form>
                <label>Agent: </label>
                <input type="text" name="agent" onChange={agentChange}></input>
              </form>
              </div>
          </div>*/
  return (
    <div className='main'>
      <TopBanner searchValue={ searchValue } setSearchValue={ setSearchValue } />
      <div className='bottomContainer'>
          <div >
              <h2 className="aptForm">UPLOAD APARTMENT LISTING</h2>
              {isSuccess && <p style={{'color':'green'}}>Your upload is successful!</p>}
          <form className="listingForm">
          <div>
                  <label>City: </label>
                  <input type="text" name="city" onChange={handleChange}></input>
              </div>
          <div>
                  <label>Listing Name: </label>
                  <input type="text" name="listingName" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Address(DO NOT ABBREVIATE STREET TYPE): </label>
                  <input type="text" name="address" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Zip Code: </label>
                  <input type="text" name="zipCode" onChange={handleChange}></input>
              </div>
              <div>
                  <button className='submitButton' onClick={getPos}>GET GEOLOCATION FOR MAPPING</button>
              </div>
              <div>
                  <label>Description: </label>
                  <textarea name="description" onChange={handleChange}></textarea>
              </div>

              <div>
                  <label>Agent: </label>
                  <input type="text" name="agent" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Beds: </label>
                  <input type="number" name="beds" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Baths: </label>
                  <input type="number" name="baths" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Price: </label>
                  <input type="number" name="price" onChange={handleChange}></input>
              </div>
              <div>
                  <label>Square Feet: </label>
                  <input type="number" name="sqft" onChange={handleChange}></input>
              </div>
              <div>
              <div>PETS?</div>
                  <label>Cats? </label>
                  <input className='yesButton' type="button"  name="cats" value='yes' onClick={handlePets}></input><input className='noButton' type="button"  name="cats" value='no' onClick={handlePets}></input><br></br>
                  <label>Dogs? </label>
                  <input className='yesButton' type="button"  name="dogs" value='yes'  onClick={handlePets}></input><input className='noButton' type="button"  name="dogs" value='no'  onClick={handlePets}></input><br></br>

              </div>
              <div>

                  <label>Neighborhoods (ADD BORROUGH TO HERE AS WELL, SUBMIT ONE AT A TIME): </label><br></br>
                  <input type="text" id="hoods" name="neighborhoods" onChange={handleUrl}></input>
                  <input className='submitButton' type="submit" value="Add" name="neighborhoods" onClick={addUrl}></input>

              </div>
              <div>

                  <label>Pictures: </label>
                  <input type="url" id="picIn" name="pics" onChange={handleUrl}></input>
                  <input className='submitButton' type="submit" value="Submit" name="pics" onClick={addUrl}></input>

              </div>
              <div>
                  <VideoUpload setVideoName={updateVideo} />

              </div>
              <input id='finalSubmit' type="submit" value="Submit Listing" onClick={handleSubmit}></input>
          </form>
          </div>

        </div>
      </div>
  );
};

export default UploadListing;