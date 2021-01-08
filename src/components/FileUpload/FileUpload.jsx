import React, {useState, useRef} from 'react';
import FilePreview from './FilePreview.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Document, Page} from 'react-pdf/dist/umd/entry.webpack';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'
import css from './styles/styles.css'

const FileUpload = ({username, apartment_id, setPhotosNames}) => {
  const fileInput = useRef(null)
  const [files, setFile] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isValidFileType, setValidFileType] = useState(true);
  const AWSLink = 'https://hr-blue-ocean-photos-file-bucket.s3.us-east-2.amazonaws.com/'

  const updateFile = (e) => {
    // write code to prevent unneccessarily large megabyte files
    // Do so by checking size of files.
    // Check if file is of type 'application/pdf'
    if (username && apartment_id) {
      if (e.target.files[0]['type'] !== "application/pdf") {
        setValidFileType(false);
      } else {
        setFile(e.target.files[0] === undefined ? files : files.concat(e.target.files[0]))
        setUploadStatus('');
        setValidFileType(true);
      }
    } else {
      if (!(e.target.files[0]['type'] === "image/jpeg" || e.target.files[0]['type'] === "image/png")) {
        setValidFileType(false);
      } else {
        setFile(e.target.files[0] === undefined ? files : files.concat(e.target.files[0]))
        setUploadStatus('');
        setValidFileType(true);
      }
    }


  }
  const onButtonClick = (e) => {
    fileInput.current.click();
  }
  const onClickUpload = (e) => {
    // Change upload file to return a promise
    // Run 'Promise.all' to resolve when all are done resolving.
    var formData = new FormData();
    var fileNames = [];
    files.forEach(file => {
      formData.append("files", file);
      fileNames.push(AWSLink + file.name);
    });
    if (username && apartment_id) {
      axios.post(`/upload?username=${username}&apartment_id=${apartment_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
          }
      })
      .then(() => {
        setUploadStatus('success');
      })
      .catch(() => {
        setUploadStatus('failure');
      })
    } else {
      axios.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
          }
      })
      .then(() => {
        setPhotosNames(fileNames);
        setUploadStatus('success');
      })
      .catch(() => {
        setUploadStatus('failure');
      })
    }
  }

  const deleteFile = (name) => {
    var newFiles = files;
    setFile(newFiles.filter((file) => file.name !== name));
  }

  const onClickCancel = (e) => {
    setFile([]);
    // removes files from state
  }
  return (
  <div className='file-upload-widget-container primary-font'>
    <div className='select-documents-container primary-font'>
      <input type='file' onChange={(e) => updateFile(e)} style={{display:'none'}} ref={fileInput}></input>
      <div onClick={(e) => {onButtonClick(e)}} className="select-documents-button" >Select Documents
      </div>
      {uploadStatus === 'success' && <div
       style={{'color':'green'}} className='status-message'>Upload Success!
       </div>}
      {uploadStatus === 'failure' && <div
      style={{'color':'red'}} className='status-message'> Upload failed. Please try again.</div>
      }
      {isValidFileType === false && <div
      style={{'color':'red'}} className='status-message'> Invalid File Type. Please upload a {username && apartment_id ? <span>PDF</span> : <span>.JPG or .PNG</span>}.</div>
      }
    </div>
    <div className='preview-file-container'>
      {files.length > 0 && <hr />}
      {files.map((file) => (
        <FilePreview file={file} deleteFile={deleteFile} />))
      }
    </div>
    {files.length > 0 && <div className='upload-cancel-container'>
      <div onClick={(e) => {onClickCancel(e)}}>
        Cancel
      </div>
      <div onClick = {(e) => {onClickUpload(e)}}>
        Upload Files
      </div>
    </div>}
  </div>
  )
}

export default FileUpload;