import React, {useState} from 'react';
import FileUpload from './FileUpload.jsx';
import Modal from '@material-ui/core/Modal';
import css from './styles/styles.css'

const FileUploadOverlay = ({username, apartment_id, setPhotosNames}) => {
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
        {username && apartment_id && <span className='select-video-button primary-font'>Submit Application</span>}
        {setPhotosNames &&<span className='select-video-button primary-font'>Upload Photos</span>}
      </div>
      <Modal open={open} onClose={updateOverlay}>
        <div style={getModalStyle()}>
          {username && apartment_id && <FileUpload username={username} apartment_id={apartment_id} updateOveray={updateOverlay}/>}
          {setPhotosNames && <FileUpload setPhotosNames={setPhotosNames} updateOverlay={updateOverlay} />}
        </div>

      </Modal>


    </div>
  )
}
export default FileUploadOverlay;