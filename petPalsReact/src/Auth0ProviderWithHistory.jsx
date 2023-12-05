// Auth0ProviderWithHistory.js
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'petpals-connect.us.auth0.com';
  const clientId = 'n4oaMK4yHQqNH9xmfhkvqzQw6Cw7caxu';

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