import React, { useState } from 'react';
import { Card, Form, Input } from '../styles/AuthForm';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { FcGoogle } from 'react-icons/fc';
import { GrUserAdmin } from 'react-icons/gr';
import axios from 'axios';
import '../styles/signin.css';

const Signin = ({ handleSignUp, getUserInfo, openModal }) => {
  const [adminClicked, setAdminClicked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  const login = (email, password) => {
    axios
      .post('/login', {
        email,
        password,
      })
      .then((res) => {
        if (!res.body) {
          setInvalid(true);
        }
        getUserInfo(1, 'dylan', false, 'user');
        openModal(false);
      });
  };

  const loginAdmin = (email, password) => {
    axios
      .post('/login-admin', {
        email,
        password,
      })
      .then((res) => {
        // getAdminInfo()
        if (res.body) {
          setInvalid(true);
          openModal(false);
        }
        getAdminInfo(1, 'dylan', false, 'user');
      });
  };

  if (invalid) {
    return <Redirect to='/' />;
  }

  return (
    <Card className='login-group'>
      <div className='title'>Sign In</div>
      <Form>
        <span className='input-label'>Email</span>
        <Input
          type='email'
          placeholder='Email'
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <span className='input-label'>Password</span>
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Router>
          <Link to='/profile'>
            <Button
              className='login-btn'
              variant='contained'
              onClick={() => login(userEmail, userPassword)}>
              Sign In
            </Button>
          </Link>
        </Router>
      </Form>
      <div className='or-group'>OR</div>
      <div className={adminClicked ? 'flip-container-signin' : ''}>
        <div className='flipper-signin'>
          <div className='front-signin'>
            <Button
              className='login-btn'
              variant='contained'
              startIcon={<FcGoogle className='google-icon' />}>
              Login with Google
            </Button>
          </div>
          <div className='back-signin'>
            <Button
              className='admin-link-btn'
              variant='contained'
              onClick={() => loginAdmin(userEmail, userPassword)}
              startIcon={<GrUserAdmin className='admin-icon' />}>
              Admin Sign in
            </Button>
          </div>
        </div>
      </div>
      <div className='sign-up-link'>
        <div className='link'>Don't have an account?</div>
      </div>
      <div className='sign-up-account'>
        <div onClick={() => handleSignUp()} className='create-account'>
          Create account
        </div>
      </div>
      <div className='admin-icon-group'>
        <GrUserAdmin
          onClick={() => setAdminClicked(!adminClicked)}
          className='admin-icon-two'
        />
      </div>
    </Card>
  );
};

export default Signin;
