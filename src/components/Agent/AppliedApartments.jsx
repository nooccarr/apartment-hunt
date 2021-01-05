import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ApplicantListContainer from './ApplicantListContainer.jsx'

const AppliedApartments = ({agentName}) => {

  var [apartmentsApplied, setApartmentsApplied] = useState([]);

  useEffect(() => {
    axios.get(`/applicants?agent=${agentName}`)
    .then(({data}) => {
      console.log(data);
      setApartmentsApplied(data);
    })
    .catch((err) => {
      console.log("Error in fetching apartments by agent! Error: ", err);
    })
  }, [])

  return (
    <div>
      {apartmentsApplied.map((apartment) => (
        <ApplicantListContainer apartment={apartment} />
      ))}
    </div>
  )
}

export default AppliedApartments
