import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? <Component {...rest} {...props} /> : <Redirect to='/' />
      }
    />
  );
};

export default ProtectedRoute;
