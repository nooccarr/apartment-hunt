import React, { useState, useRef } from 'react';
import axios from 'axios';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import css from './styles/styles.css'
const PhotoUpload = ({apartment_id}) => {

  const fileInput = useRef(null);
  const [photo, setPhoto] = useState();
  const [isLoading, setLoading] = useState('none');

  const selectPhotos = (e) => {
    setPhoto(e.target.files[0]);
  }

  const onInputButtonClick = (e) => {
    // click 'ref' input button
    fileInput.current.click();
  }

  const deletePhoto = () => {
    setPhoto();
  }

  const uploadPhotoClick = () => {
    setLoading('uploading');
    const formData = new FormData();
    formData.append('myPhoto', photo);
    const promises = [axios.post('/video', formData)];
    if (apartment_id) {
      // append promise to upload apartment_id to database
      promises.push(axios.post(`/addVideo?id=${apartment_id}&photos=${photo.name}`))
    }
    Promise.all(promises)
    .then((result) => {
      console.log('All done uploading!');
      setLoading('complete');
    })
    .catch((err) => {
      console.log("Error in photo upload! Error: ", err);
      setLoading('none');
    })

  };

  return (
    <div className='primary-font'>
      <input type='file' style={{display:'none'}} onChange={(e) => {selectPhotos(e)}} ref={fileInput}></input>
      <div onClick={(e) => {onInputButtonClick(e)}} className='select-video-button'>
        Upload Photo
      </div>
      {photo && isLoading === 'none' && <div className='video-file-container'>
        <div>
          <FontAwesomeIcon style={{'color':'#FF6EC7'}} onClick={() => {deletePhoto()}} icon={faTrashAlt} />
        </div>
        <div>
          {photo.name}
        </div>
        <div onClick={() => {uploadPhotoClick()}} className='upload-video-button'>
          Upload
        </div>
      </div>}
      {isLoading === 'uploading' && <div> Please wait... Your photos are uploading</div>}
      {isLoading === 'complete' && <div style={{color: 'green'}}> Your photo has finished uploading! </div>}
    </div>
  )
}

export default PhotoUpload;