import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import '../styles/login.css';

const Login = ({ openModal }) => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className='login-wrapper'>
      <div className={signUp ? 'flip-container-login' : ''}>
        <div className='flipper-login'>
          <div className='front-login'>
            <Signin
              handleSignUp={() => setSignUp(true)}
              openModal={openModal}
            />
          </div>
          <div className='back-login'>
            <Signup
              handleSignIn={() => setSignUp(false)}
              openModal={openModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
