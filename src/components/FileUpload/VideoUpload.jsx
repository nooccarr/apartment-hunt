import React, { useState, useRef } from 'react';
import axios from 'axios';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import css from './styles/styles.css'
const VideoUpload = () => {

  const fileInput = useRef(null);
  const [video, setVideo] = useState();
  const [isLoading, setLoading] = useState('none');

  const selectVideo = (e) => {
    setVideo(e.target.files[0]);
  }

  const onInputButtonClick = (e) => {
    // click 'ref' input button
    fileInput.current.click();
  }

  const deleteVideo = () => {
    setVideo();
  }

  const uploadVideoClick = () => {
    setLoading('uploading');
    const formData = new FormData();
    formData.append('myVideo', video);
    axios.post('/video', formData)
    .then((result) => {
      console.log('All done uploading!');
      setLoading('complete');
    })
    .catch((err) => {
      console.log("Error in video upload! Error: ", err);
    })

  };

  return (
    <div className='primary-font'>
      <input type='file' style={{display:'none'}} onChange={(e) => {selectVideo(e)}} ref={fileInput}></input>
      <div onClick={(e) => {onInputButtonClick(e)}} className='select-video-button'>
        Select Video
      </div>
      {video && isLoading === 'none' && <div className='video-file-container'>
        <div>
          <FontAwesomeIcon style={{'color':'#FF6EC7'}} onClick={() => {deleteVideo()}} icon={faTrashAlt} />
        </div>
        <div>
          {video.name}
        </div>
        <div onClick={() => {uploadVideoClick()}} className='upload-video-button'>
          Upload
        </div>
      </div>}
      {isLoading === 'uploading' && <div> Please wait... Your files are uploading</div>}
      {isLoading === 'complete' && <div style={{color: 'green'}}> Your file has finished uploading! </div>}
    </div>
  )
}

export default VideoUpload;