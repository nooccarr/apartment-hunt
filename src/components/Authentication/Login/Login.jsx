import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import '../styles/login.css';

const Login = ({ openModal, getUserInfo }) => {
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
            />
          </div>
          <div className='back-login'>
            <Signup
              handleSignIn={() => setSignUp(false)}
              openModal={openModal}
              getUserInfo={getUserInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
