import React, {useState} from 'react';
import FileUpload from './FileUpload.jsx';
import Modal from '@material-ui/core/Modal';

const FileUploadOverlay = () => {
  // conditional that turn it on and off??

  const [open, setOpen] = useState(false)

  const updateOverlay = () => {

    setOpen(open === true ? false : true);
  }

  function getModalStyle() {
    const top = 25;
    const left = 25;

    return {
      top: `${top}%`,
      left: `${left}%`,
      position: 'relative',
      border:'none',
      'max-width': '600px',
      'border-radius':'10px'
    };
  }


  return (
    <div>
      <div onClick={() => {updateOverlay()}} >
        Click me! Beneath the milky twilight
      </div>
      <Modal open={open} onClose={updateOverlay}>
        <div style={getModalStyle()}>
          <FileUpload updateOveray={updateOverlay}/>
        </div>

      </Modal>


    </div>
  )
}
export default FileUploadOverlay;