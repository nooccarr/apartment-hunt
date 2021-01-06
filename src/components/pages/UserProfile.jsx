import React from 'react';
import HomeLogin from './HomeLogin.jsx';

const UserProfile = ({ user }) => {
  return (
    <div>
      <HomeLogin user={user} />
    </div>
  );
};

export default UserProfile;
