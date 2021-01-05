import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import css from '../dist/styles/styles.css'
import FileUpload from './components/FileUpload/FileUpload.jsx';
import FileUploadOverlay from './components/FileUpload/FileUploadOverlay.jsx'
import VideoUpload from './components/FileUpload/VideoUpload.jsx'
import AppliedApartments from './components/Agent/AppliedApartments.jsx';

ReactDOM.render(<AppliedApartments agentName={'Noah Sondheim'}/>, document.getElementById('app'));

//