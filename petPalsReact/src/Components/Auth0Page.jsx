import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth0Page = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Hello, {user.name}!</p>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </div>
  );
};

export default Auth0Page;