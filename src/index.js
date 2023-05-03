import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJKVfpyymVO1HU4LYceTSlEobeAeKenz4",
  authDomain: "my-react-blog-451cc.firebaseapp.com",
  projectId: "my-react-blog-451cc",
  storageBucket: "my-react-blog-451cc.appspot.com",
  messagingSenderId: "389312126414",
  appId: "1:389312126414:web:7dd8830aa6dccce1025f9f"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
