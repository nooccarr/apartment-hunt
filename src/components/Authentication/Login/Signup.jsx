import React from 'react';
import { Card, Form, Input } from '../styles/AuthForm';
import Button from '@material-ui/core/Button';
import { FcGoogle } from 'react-icons/fc';
import '../styles/signup.css';

function Signup({ handleSignIn }) {
  return (
    <Card className='sign-up-group'>
      <div className='title-signup'>Sign Up</div>
      <Form>
        <span className='input-label-signup'>Email</span>
        <Input type='email' placeholder='Email' />
        <span className='input-label-signup'>Password</span>
        <Input type='password' placeholder='Password' />
        <Button className='login-btn-signup' variant='contained'>
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
}

export default Signup;
