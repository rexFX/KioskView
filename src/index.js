import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookieProvider } from './context/cookie.context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookieProvider>
        <App />
      </CookieProvider>
    </BrowserRouter>
  </React.StrictMode>
);