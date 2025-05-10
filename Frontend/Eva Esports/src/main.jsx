import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './utils/auth'; // <-- fix here

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
