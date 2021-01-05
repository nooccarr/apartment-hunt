import React, {useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import axios from 'axios'
import { Document, Page, StyleSheet} from 'react-pdf/dist/umd/entry.webpack';

const DocumentOverlay = ({fileName}) => {
  // conditional that turn it on and off??


  const [open, setOpen] = useState(false)
  const [file, setFile] = useState('');
  const [numPages, setNumPages] = useState(null);
  /*
  useEffect(() => {
    axios.get(`/download?filename=${fileName}`)
    .then((data) => {
      console.log(data);
      setFile({'data':data.data.Body.data});
    })
    .catch((err) => {
      console.log(fileName);
      console.log("Error with download! Error: ", err);
    })
  }, [])
  */
  const downloadFile = () => {
    axios.get(`/download?filename=${fileName}`)
    .then((data) => {
      console.log(data);
      setFile({'data':data.data.Body.data});
      updateOverlay();
    })
    .catch((err) => {
      console.log(fileName);
      console.log("Error with download! Error: ", err);
    })
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const updateOverlay = () => {

    setOpen(open === true ? false : true);
  }

  function getModalStyle() {
    const top = 25;
    const left = 25;

    return {
      width: '50%',
      margin: 'auto',
      padding: '10px',
      border: '0px solid black'
    };
  }


  return (
    <div>
      <div onClick={() => {downloadFile()}} >
        {fileName}
      </div>
      <Modal open={open} onClose={updateOverlay}>
        <div className='all-page-container' style={getModalStyle()}>
          <Document file={file} onLoadError={console.error} onLoadSuccess={({numPages}) => setNumPages(numPages)}>
            {Array.apply(null, Array(numPages)).map((x, i) => i+1)
            .map(page => <Page pageNumber={page} />)}
          </Document>
        </div>
      </Modal>
    </div>
  )
}
export default DocumentOverlay;