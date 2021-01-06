import React from 'react';
import ApplicantListEntry from './ApplicantListEntry.jsx';
import css from '../FileUpload/styles/styles.css'

const ApplicantListContainer = ({apartment}) => {

  return (
    <div>
      <div className='apartment-entry-container'>
        <div>
          Username
        </div>
        <div>
          Address
        </div>
        <div>
          City
        </div>
        <div>
          State
        </div>
        <div>
          Documents
        </div>
      </div>
      {apartment['applicants'].map((username) => (
        <ApplicantListEntry apartment={apartment} username={username} />
      ))}
    </div>

  )
}

export default ApplicantListContainer;