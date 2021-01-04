import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, Form, Input } from '../styles/AuthForm.jsx';
import Button from '@material-ui/core/Button';
import { FcGoogle } from 'react-icons/fc';
import { GrUserAdmin } from 'react-icons/gr';
import { login } from './Axios';
import '../styles/signin.css';

const Signin = ({ handleSignUp }) => {
  const [adminClicked, setAdminClicked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = () => {
    login(userEmail, userPassword);
  };

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
        <Button
          className='login-btn'
          variant='contained'
          onClick={() => handleSubmit()}>
          Sign In
        </Button>
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
            <Link to='/admin' style={{ textDecoration: 'none' }}>
              <Button
                className='admin-link-btn'
                variant='contained'
                startIcon={<GrUserAdmin className='admin-icon' />}>
                Admin Sign in
              </Button>
            </Link>
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
