import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react'
 
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

import { RadiatorsContextProvider } from './context/RadiatorsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RadiatorsContextProvider>
    <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
    </React.StrictMode>
  </RadiatorsContextProvider> 
);