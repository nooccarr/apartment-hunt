import React, {useState, useRef} from 'react';
import FilePreview from './FilePreview.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Document, Page} from 'react-pdf/dist/umd/entry.webpack';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons'

const FileUpload = () => {
  const fileInput = useRef(null)
  const [files, setFile] = useState([]);
  const [sampleFile, setSamplefile] = useState('testDocument.pdf');
  const [uploadStatus, setUploadStatus] = useState('');

  const updateFile = (e) => {
    // write code to prevent unneccessarily large megabyte files
    // Do so by checking size of files.
    // Check if file is of type 'application/pdf'
    setFile(e.target.files[0] === undefined ? files : files.concat(e.target.files[0]))
    setUploadStatus('');
  }
  const onButtonClick = (e) => {
    fileInput.current.click();
  }
  const onClickUpload = (e) => {
    // Change upload file to return a promise
    // Run 'Promise.all' to resolve when all are done resolving.
    var formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
    axios.post('/upload', formData, {
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
  }

  const onClickDownload = (e) => {
    /*
   getFile('test_four_pdf.pdf', setSamplefile);
    */
    axios.get('/download')
    .then((data) => {
      console.log(data);
      setSamplefile({'data':data.data.Body.data});
    })
    .catch((err) => {
      console.log("Error with 'onClick' download! Error: ", err);
    })
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
      style={{'color':'red'}} className='status-message'> Upload failed. Please try again </div>
      }
    </div>
    <div className='preview-file-container'>
      {files.length > 0 && <hr />}
      {files.map((file) => (
        <FilePreview file={file} deleteFile={deleteFile} />))
      }
    </div>
    {files.length > 0 && <div className='upload-cancel-container'>
      <div onClick={(e) => {onClickDownload(e)}}>
        Download
      </div>
      <div onClick={(e) => {onClickCancel(e)}}>
        Cancel
      </div>
      <div onClick = {(e) => {onClickUpload(e)}}>
        Upload Files
      </div>
    </div>}
    <Document file={sampleFile} onLoadError={console.error} onLoadSucces={console.log("Successfully loaded pdf!")}>
      <Page pageNumber={1} />
    </Document>
  </div>
  )
}

export default FileUpload;