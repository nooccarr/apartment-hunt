import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplicantListContainer from './ApplicantListContainer.jsx';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import css from '../FileUpload/styles/styles.css';

const AppliedApartments = ({ agentEmail }) => {
  var [apartmentsApplied, setApartmentsApplied] = useState([]);

  useEffect(() => {
    let token = jwtDecode(Cookies.get('jwt'));

    if (token.payload.role !== 'admin') {
      return (window.location.href = '/');
    } else {
      axios
        .get(`/applicants?agentEmail=${token.payload.email}`)
        .then(({ data }) => {
          console.log(data);
          setApartmentsApplied(data);
        })
        .catch((err) => {
          console.log('Error in fetching apartments by agent! Error: ', err);
        });
    }
  }, []);

  return (
    <div>
      <div className='apartment-entry-container'>
        <div style={{ color: '#6f6389' }}>
          User
        </div>
        <div style={{ color: '#6f6389' }}>
          Address
        </div>
        <div style={{ color: '#6f6389' }}>
          City
        </div>
        <div style={{ color: '#6f6389' }}>
          State
        </div>
        <div style={{ color: '#6f6389' }}>
          Documents
        </div>
      </div>
      {apartmentsApplied.map((apartment, i) => (
        <ApplicantListContainer key={i} apartment={apartment} />
      ))}
    </div>
  );
};

export default AppliedApartments;
