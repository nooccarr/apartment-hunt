import React from 'react';
import ApplicantListEntry from './ApplicantListEntry.jsx';
import css from '../FileUpload/styles/styles.css'

const ApplicantListContainer = ({apartment}) => {

  return (
    <div>
      {apartment['applicants'].map((username) => (
        <ApplicantListEntry apartment={apartment} username={username} />
      ))}
    </div>

  )
}

export default ApplicantListContainer;