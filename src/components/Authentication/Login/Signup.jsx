import React, { useState } from 'react';
import { Card, Form, Input } from '../styles/AuthForm';
import Button from '@material-ui/core/Button';
import { FcGoogle } from 'react-icons/fc';
import { signUp } from './Axios';
import '../styles/signup.css';

const Signup = ({ handleSignIn }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = () => {
    signUp(userEmail, userPassword, userName);
  };

  return (
    <Card className='sign-up-group'>
      <div className='title-signup'>Sign Up</div>
      <Form>
        <span className='input-label-signup'>Username</span>
        <Input
          type='name'
          placeholder='Username'
          onChange={(e) => setUserName(e.target.value)}
        />
        <span className='input-label-signup'>Email</span>
        <Input
          type='email'
          placeholder='Email'
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <span className='input-label-signup'>Password</span>
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Button
          className='login-btn-signup'
          variant='contained'
          onClick={() => handleSubmit()}>
          Sign Up
        </Button>
      </Form>
      <div className='or-group-signup'>OR</div>
      <Button
        className='login-btn-signup'
        variant='contained'
        startIcon={<FcGoogle className='google-icon-signup' />}>
        Sign Up with Google
      </Button>
      <div className='sign-in-link'>
        <div className='link'>Already Registered?</div>
      </div>
      <div className='sign-up-link-signup'>
        <div onClick={() => handleSignIn()} className='link-signup'>
          Sign In
        </div>
      </div>
    </Card>
  );
};

export default Signup;
