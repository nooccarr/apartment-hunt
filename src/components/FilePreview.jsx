import React from 'react';

const FilePreview = ({file}) => {

  return (
  <div>
    <div>
      Filename: {file.name}
    </div>
    <div>
      File size: {file.size}
    </div>
    <div>
      <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">Preview your upload!</a>
    </div>
  </div>
  )
}

export default FilePreview;