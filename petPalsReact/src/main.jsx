import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client';
import Auth0ProviderWithHistory from './Auth0ProviderWithHistory';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
  </React.StrictMode>,
)
