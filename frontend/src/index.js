import React from 'react';
import ReactDOM from 'react-dom/client'; // import the correct client
import App from './App';

// Create a root element to mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use root.render() instead of ReactDOM.render()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
