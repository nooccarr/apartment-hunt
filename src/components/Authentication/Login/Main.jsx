import React, { useState } from 'react';
import { Login, LoginModal, Nav } from '../index';

const AuthLogin = () => {
  const [clickedLogin, setClickedLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const login = () => {
    setClickedLogin(true);
  };

  const openModal = (boolean) => {
    setModalOpen(boolean);
  };

  return (
    <div>
      <Nav login={login} openModal={openModal} />
      {clickedLogin ? (
        <LoginModal
          Login={<Login />}
          modalOpen={modalOpen}
          openModal={openModal}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default AuthLogin;
