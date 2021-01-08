import React from 'react';
import ApplicantListEntry from './ApplicantListEntry.jsx';
import css from '../FileUpload/styles/styles.css'

const ApplicantListContainer = ({apartment}) => {

  return (
    <div>
      {apartment['applicants'].length > 0 && <div className='apartment-entry-container'>
        <div>
          User
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
      </div>}
      {apartment['applicants'].map((username) => (
        <ApplicantListEntry apartment={apartment} username={username} />
      ))}
    </div>

  )
}

export default ApplicantListContainer;