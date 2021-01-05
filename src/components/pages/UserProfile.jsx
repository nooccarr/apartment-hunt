import React from 'react';
import HomeLogin from './HomeLogin';

const UserProfile = ({ getUserInfo, userID, userName }) => {
  console.log(userName);

  return (
    <div>
      <HomeLogin
        getUserInfo={getUserInfo}
        userID={userID}
        userName={userName}
      />
    </div>
  );
};

export default UserProfile;
