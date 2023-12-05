// src/auth/Auth0Provider.js
import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'petpals-connect.us.auth0.com';
  const clientId = 'jSr7nJ0uSiqOnaALA6FQ6oDMYEJN3KyC';

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;