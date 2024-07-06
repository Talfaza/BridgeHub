import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from './axiosConfig'; // Ensure this import is included to apply the axios configuration

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
