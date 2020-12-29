import React, {useState} from 'react';
import FilePreview from './FilePreview.jsx';
import axios from 'axios';
import uploadFile from '../../util/upload-file.js';
import getFile from '../../util/get-file.js';
import { Document, Page} from 'react-pdf/dist/umd/entry.webpack';

const FileUpload = () => {

  const [files, setFile] = useState([]);
  const [sampleFile, setSamplefile] = useState('testDocument.pdf');

  const updateFile = (e) => {
    console.log(e.target.files[0])
    // write code to prevent unneccessarily large megabyte files
    // Do so by checking size of files.
    // Check if file is of type 'application/pdf'
    setFile(e.target.files[0] === undefined ? files : files.concat(e.target.files[0]))
  }
  const onClickUpload = (e) => {
    uploadFile(files[0]);
  }
  const onClickDownload = (e) => {
   getFile('test_four_pdf.pdf', setSamplefile);
  }
  return (
   <div>
       <input type='file' onChange={(e) => updateFile(e)}></input>
       <div onClick = {(e) => {onClickUpload(e)}}>
         Upload!
       </div>
       <div onClick = {(e) => {onClickDownload(e)}}>
         Download!
       </div>
       <Document file={sampleFile} onLoadError={console.error} onLoadSucces={console.log("Successfully loaded pdf!")}>
        <Page pageNumber={1} />
       </Document>
       {files.map((file) => (
         <FilePreview file={file} />
       ))}
   </div>
 )
}

export default FileUpload;