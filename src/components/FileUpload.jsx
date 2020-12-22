import React, {useState} from 'react';
import FilePreview from './FilePreview.jsx'

const FileUpload = () => {

  const [files, setFile] = useState([]);

  const updateFile = (e) => {
    setFile(e.target.files[0] === undefined ? files : files.concat(e.target.files[0]))
  }

  return (
   <div>
       <input type='file' onChange={(e) => updateFile(e)}></input>
       <div>
         Upload!
       </div>
       {files.map((file) => (
         <FilePreview file={file} />
       ))}
   </div>
 )
}

export default FileUpload;