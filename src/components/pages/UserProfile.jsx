import React from 'react';
import HomeLogin from './HomeLogin';

const UserProfile = ({ user }) => {
  return (
    <div>
      <HomeLogin user={user} />
    </div>
  );
};

export default UserProfile;
