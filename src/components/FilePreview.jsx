import React from 'react';
import { faFileAlt, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const FilePreview = ({file, deleteFile}) => {

  return (
  <div >
  <div className='file-container' >
    <div style={{'color':'#FF6EC7', 'fontSize':'large'}} >
      <FontAwesomeIcon icon={faFileAlt} />
    </div>

    <div>
      <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" style={{'fontSize':'large'}}>{file.name}</a>
    </div>
    <div style={{'marginLeft': 'auto', 'fontSize':'medium', 'alignSelf':'center'}}>
      ({Number(file.size) / 1000} kb)
    </div>
    <div onClick={(e) => {deleteFile(file.name)}} style={{'color':'#FF6EC7', 'fontSize':'medium', 'alignSelf':'center'}}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </div>
  </div>
  <hr style={{'width':'600px', 'borderColor': '#FF6EC7'}}/>
  </div>
  )
}

export default FilePreview;