import React, { useState } from 'react';
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TopBanner from '../SearchResults/TopBanner';
import VideoUpload from '../FileUpload/VideoUpload.jsx';
import FileUploadOverlay from '../FileUpload/FileUploadOverlay.jsx';
import axios from 'axios';
import './uploadlisting.scss'
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const UploadListing = ({ searchValue, setSearchValue }) => {
  let token = jwtDecode(Cookies.get('jwt'));
  const [agent, setAgent] = useState('');
  const [url, setUrl] = useState('');
  const [isPhotoUploadSuccess, setIsPhotoUploadSuccess] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [isCatChecked, setCatChecked] = useState('no');
  const [isDogChecked, setDogChecked] = useState('no')
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
    pets: { dogs: false, cats: false },
    beds: null,
    baths: null,
    agent: '',
    agentEmail: token.payload.email
  });

  const updateVideo = (videoName) => {
    setListing((prevState) => ({
      ...prevState,
      ['videos']: [...prevState['videos'], videoName],
    }));
  };

  const updatePhotos = (photos) => {
    setListing((prevState) => ({
      ...prevState,
      ['pics']: [...prevState['pics'], ...photos],
    }));
    setIsPhotoUploadSuccess(true);
  };

  const addUrl = (e) => {
    e.preventDefault();
    setListing((prevState) => ({
      ...prevState,
      [e.target.name]: [...prevState[e.target.name], url],
    }));
    setUrl('');
    if (e.target.name === 'pics') {
      let reset = document.getElementById('picIn');
      reset.value = '';
    } else if (e.target.name === 'videos') {
      let reset = document.getElementById('vidIn');
      reset.value = '';
    } else {
      let reset = document.getElementById('hoods');
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
    setListing((prevState) => ({
      ...prevState,
      position: { type: 'Point', coordinates: [latLng.lng, latLng.lat] },
    }));
  };

  const handleChange = (e) => {
    setListing((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const agentChange = (e) => {
    setAgent(e.target.value);
  };

  const handleUrl = (e) => {
    e.preventDefault();
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPos();
    axios
      .post('http://localhost:3000/listing', listing)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsFailure(true);
      });
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
      pets: { dogs: false, cats: false },
      beds: null,
      baths: null,
      agent: '',
    });
  };

  const handlePets = (e) => {
    e.preventDefault();
    if (e.target.value === 'yes') {
      if (e.target.name === 'cats') {
        setCatChecked('yes');
      }
      if (e.target.name === 'dogs') {
        setDogChecked('yes');
      }
      setListing((prevState) => ({
        ...prevState,
        pets: { ...prevState.pets, [e.target.name]: true },
      }));
    }
    if (e.target.value === 'no') {
      if (e.target.name === 'cats') {
        setCatChecked('no');
      }
      if (e.target.name === 'dogs') {
        setDogChecked('no');
      }
      setListing((prevState) => ({
        ...prevState,
        pets: { ...prevState.pets, [e.target.name]: false },
      }));
    }
  };

  const deleteNeighborhood = (neighborhood) => {
    var newNeighborhoods = listing['neighborhoods'];
    newNeighborhoods = newNeighborhoods.filter((hood) => hood !== neighborhood)
    setListing((prevState) => ({
        ...prevState,
        ['neighborhoods']: newNeighborhoods,
      }));
  }

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
    <div
      className='main'
      style={{ overflow: 'scroll' }}
    >
      <div
        style={{ width: '600px', margin: '0 auto' }}
      >
        <h2 className='aptForm'>Upload New Apartment Listing</h2>
        {isSuccess && <p style={{'color':'green'}}>Your upload is successful!</p>}
        <form className='listingForm'>
          <div>
            <div>City: </div>
            <input className='upload-listing-textbox' type='text' name='city' onChange={handleChange}></input>
          </div>
          <div>
            <div>Listing Name: </div>
            <input className='upload-listing-textbox'
              type='text'
              name='listingName'
              onChange={handleChange}></input>
          </div>
          <div >
            <div>Address (Do not abbreviate): </div>
            <input className='upload-listing-textbox' type='text' name='address' onChange={handleChange}></input>
          </div>
          <div>
            <div>Zip Code: </div>
            <input className='upload-listing-textbox' type='text' name='zipCode' onChange={handleChange}></input>
          </div>
          <div>

            <button className='submitButton' onClick={getPos}>
              Add Geolocation (Required)
            </button>
            <div style={{'padding':'10px 0px'}}>
              <div>Latitude</div>
              <input type='text' className='upload-listing-textbox' value={!listing['position']['coordinates'] ? '' : listing['position']['coordinates'][0]}></input>
            </div>
            <div style={{'padding':'10px 0px'}}>
              <div>Longitude</div>
              <input type='text' className='upload-listing-textbox' value={!listing['position']['coordinates'] ? '' : listing['position']['coordinates'][1]}></input>
            </div>
          </div>
          <div>
            <div>Description: </div>
            <textarea name='description' onChange={handleChange}></textarea>
          </div>

          <div>

            <div>Agent: </div>
            <input className='upload-listing-textbox' type='text' name='agent' onChange={handleChange}></input>
          </div>
          <div>
            <div>Beds: </div>
            <input className='upload-listing-numberbox' type='number' name='beds' onChange={handleChange}></input>
          </div>
          <div>
            <div>Baths: </div>
            <input className='upload-listing-numberbox' type='number' name='baths' onChange={handleChange}></input>
          </div>
          <div>
            <div>Price/month: </div>
            <input className='upload-listing-numberbox' type='number' name='price' onChange={handleChange}></input>
          </div>
          <div>
            <div>Square Feet: </div>
            <input className='upload-listing-numberbox' type='number' name='sqft' onChange={handleChange}></input>
          </div>
          <div className='pets-container'>
            <div style={{'font-weight':'bold'}}>Pet Friendly?</div>
            <div>Cats</div>
            <input
            id='catChoice1'
              type='radio'
              name='cats'
              value='yes'
              checked={isCatChecked === 'yes'}
              onChange={handlePets}></input>
              <label for='catChoice1'>Yes</label>
            <input
              id='catChoice2'
              type='radio'
              name='cats'
              value='no'
              checked={isCatChecked === 'no'}
              onChange={handlePets}></input>
              <label for='catChoice2'>No</label>
            <br></br>
            <div>Dogs</div>
            <input
              id='dogChoice1'
              type='radio'
              name='dogs'
              value='yes'
              checked={isDogChecked === 'yes'}
              onChange={handlePets}></input>
              <label for='dogChoice1'>Yes</label>
            <input
              id='dogChoice2'
              type='radio'
              name='dogs'
              value='no'
              checked={isDogChecked === 'no'}
              onChange={handlePets}></input>
              <label for='dogChoice2'>No</label>
            <br></br>
          </div>
          <div>
            <div>
              Neighborhoods/Burrough (Click to delete):{' '}
            </div>
            <br></br>
            <input
            className='upload-listing-textbox'
              type='text'
              id='hoods'
              name='neighborhoods'
              onChange={handleUrl}></input>
            <input
              style={{width: '50px', 'marginLeft': '10px'}}
              className='submitButton'
              type='submit'
              value='Add'
              name='neighborhoods'
              onClick={addUrl}>
            </input>
            {listing.neighborhoods.map((neighborhood, i) => (
              <span
                key={i}
                onClick={() => {deleteNeighborhood(neighborhood)}}
              >
                {neighborhood},
              </span>))}
          </div>
          <div>
            <FileUploadOverlay setPhotosNames={updatePhotos} />

          </div>
          {isPhotoUploadSuccess && <div style={{'color':'green', 'fontStyle':'italic'}}>Your photos have been uploaded!</div>}
          <div>
            <VideoUpload setVideoName={updateVideo} />
          </div>
          <input
            id='finalSubmit'
            type='submit'
            value='Submit Listing'
            onClick={handleSubmit}></input>
            {isSuccess && <span style={{'color':'green', 'fontStyle':'italic'}}>Thank you! Your listing has been posted!</span>}
            {isFailure && <span style={{'color':'red', 'fontStyle':'italic'}}>Error! Did your remember to add the Geolocation?</span>}
        </form>
      </div>
    </div>
  );
};

export default UploadListing;
