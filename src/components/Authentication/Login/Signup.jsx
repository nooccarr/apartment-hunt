import React, { useState } from 'react';
import { Card, Form, Input } from '../styles/AuthForm.jsx';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import '../styles/signup.css';

const Signup = ({ handleSignIn, openModal }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const signUp = (email, password, username) => {
    axios
      .post('/signup', {
        email,
        password,
        username,
      })
      .then((res) => {
        openModal(false);
        console.log(res);
      });
  };

  return (
    <Card className='sign-up-group'>
      <div className='title-signup'>Sign Up</div>
      <Form>
        <span className='input-label-signup'>Username</span>
        <Input
          type='name'
          placeholder='Username'
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <span className='input-label-signup'>Email</span>
        <Input
          type='email'
          required
          placeholder='Email'
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <span className='input-label-signup'>Password</span>
        <Input
          type='password'
          placeholder='Password'
          required
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Router>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button
              className='login-btn-signup'
              variant='contained'
              onClick={() => signUp(userEmail, userPassword, userName)}>
              Sign Up
            </Button>
          </Link>
        </Router>
      </Form>
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
