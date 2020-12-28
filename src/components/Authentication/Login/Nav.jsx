import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Nav = ({ login, openModal }) => {
  const onModalOpen = () => {
    login();
    openModal(true);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar style={{ backgroundColor: '#fbd2d7', color: '#555' }}>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Apartment Hunt
          </Typography>
          <Button color='inherit' onClick={() => onModalOpen()}>
            Login / Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
