import React, { useState, useRef } from 'react';
import axios from 'axios';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import css from './styles/styles.css'
const VideoUpload = ({apartment_id, setVideoName}) => {

  const fileInput = useRef(null);
  const [video, setVideo] = useState();
  const [isLoading, setLoading] = useState('none');
  const [isMp4, setIsMp4] = useState(true);

  const selectVideo = (e) => {
    //if (e.target.files[0]['type'] !== ''])
    console.log(e.target.files[0]); //videos.mp4
    if (e.target.files[0]['type'] !== 'video/mp4') {
      setIsMp4(false);
    } else {
      setIsMp4(true);
      setVideo(e.target.files[0]);
    }

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
    const promises = [axios.post('/video', formData)];
    if (apartment_id) {
      // append promise to upload apartment_id to database
      promises.push(axios.post(`/addVideo?id=${apartment_id}&videos=${video.name}`))
    }
    Promise.all(promises)
    .then((result) => {
      console.log('All done uploading!');
      setLoading('complete');
      if (setVideoName) {
        setVideoName(video.name)
      }
    })
    .catch((err) => {
      console.log("Error in video upload! Error: ", err);
      setLoading('none');
    })

  };

  return (
    <div className='primary-font'>
      <input type='file' style={{display:'none'}} onChange={(e) => {selectVideo(e)}} ref={fileInput}></input>
      <div onClick={(e) => {onInputButtonClick(e)}} className='select-video-button'>
        Upload Video
      </div>
      {isMp4 === false && <div style={{color: 'red'}} className='status-message'>Invalid File Type. Please upload an .MP4 </div>}
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

      {isLoading === 'uploading' && <div> Please wait... Your video is uploading</div>}
      {isLoading === 'complete' && <div style={{color: 'green', 'fontStyle':'italic'}}> Your video has finished uploading! </div>}
    </div>
  )
}

export default VideoUpload;