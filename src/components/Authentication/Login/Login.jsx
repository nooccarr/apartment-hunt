import React, { useState } from 'react';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import '../styles/login.css';

const Login = ({ openModal, getUserInfo, getAdminInfo, user, admin }) => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className='login-wrapper'>
      <div className={signUp ? 'flip-container-login' : ''}>
        <div className='flipper-login'>
          <div className='front-login'>
            <Signin
              handleSignUp={() => setSignUp(true)}
              openModal={openModal}
              getUserInfo={getUserInfo}
              getAdminInfo={getAdminInfo}
            />
          </div>
          <div className='back-login'>
            <Signup
              handleSignIn={() => setSignUp(false)}
              openModal={openModal}
              getUserInfo={getUserInfo}
              getAdminInfo={getAdminInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
