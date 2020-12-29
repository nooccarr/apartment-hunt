import React, {useState} from 'react';
import FileUpload from './FileUpload.jsx';

const FileUploadOverlay = () => {
  // conditional that turn it on and off??

  const [hidden, setHidden] = useState(true)

  const updateOverlay = () => {

    setHidden(hidden === true ? false : true);
  }


  return (
    <div>
      <div onClick={() => {updateOverlay()}}>
        Click me! Beneath the milky twilight
      </div>
      <div className={hidden === true ? "overlay hidden" : "overlay"}>
        <FileUpload />
      </div>
    </div>
  )
}
export default FileUploadOverlay;