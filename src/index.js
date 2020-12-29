import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import css from '../dist/styles/styles.css'
import FileUpload from './components/FileUpload.jsx';
import FileUploadOverlay from './components/FileUploadOverlay.jsx'

ReactDOM.render(<FileUpload />, document.getElementById('app'));
