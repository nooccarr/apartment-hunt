import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import FileUpload from './components/FileUpload/FileUpload.jsx';
import FileUploadOverlay from './components/FileUpload/FileUploadOverlay.jsx'
import VideoUpload from './components/FileUpload/VideoUpload.jsx'
import AppliedApartments from './components/Agent/AppliedApartments.jsx';

ReactDOM.render(<FileUploadOverlay />, document.getElementById('app'));

//<AppliedApartments agentName={'Noah Sondheim'}/>