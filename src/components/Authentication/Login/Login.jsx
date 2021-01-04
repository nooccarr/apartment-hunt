import React, { useState } from 'react';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import '../styles/login.css';

const Login = () => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className='login-wrapper'>
      <div className={signUp ? 'flip-container-login' : ''}>
        <div className='flipper-login'>
          <div className='front-login'>
            <Signin handleSignUp={() => setSignUp(true)} />
          </div>
          <div className='back-login'>
            <Signup handleSignIn={() => setSignUp(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
