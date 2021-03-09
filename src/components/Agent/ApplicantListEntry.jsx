import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DocumentOverlay from './DocumentOverlay.jsx';
import css from '../FileUpload/styles/styles.css'

const ApplicantListEntry = ({apartment, username}) => {

  var [userFullName, setUserFullName] = useState('');
  var [userDocumentList, setUserDocumentList] = useState([]);

  useEffect(() => {
    axios.get(`/user?username=${username}`)
    .then(({data}) => {
      console.log(data);
      setUserFullName(data['username']);
      setUserDocumentList(data['documents']);
    })
  }, [])

  return (
    <div className='apartment-entry-container'>
      <div>
        {userFullName}
      </div>
      <div>
        {apartment.address}
      </div>
      <div>
        {apartment.city}
      </div>
      <div>
        {apartment.state}
      </div>
      <div className='documents-container'>
        {userDocumentList.map((document, i) => (
        <DocumentOverlay key={i} fileName={document} />
        ))}
      </div>
    </div>
  )
}

export default ApplicantListEntry;