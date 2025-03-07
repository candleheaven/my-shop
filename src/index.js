// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'font-awesome/css/font-awesome.min.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App route="/reviews"/>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider
        config={ {
            signInRedirectURL: "https://11985d64-9abd-4838-883d-ee2504245aea.e1-us-east-azure.choreoapps.dev/",
            // signInRedirectURL: "https://localhost:10000/",
            signOutRedirectURL: "https://11985d64-9abd-4838-883d-ee2504245aea.e1-us-east-azure.choreoapps.dev/",
            clientID: "b4256EaDFyUWvJUkMSziS4WFjQka",
            baseUrl: "https://api.asgardeo.io/t/candleheaven",
            scope: [ "openid","profile" ]
        } }
    >
        { /* Rest of your application.  */ }

  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/all-products" element={<App route="/all-products" />} />
        <Route path="/wax" element={<App route="/wax" />} />
        <Route path="/colours" element={<App route="/colours" />} />
        <Route path="/fragrances" element={<App route="/fragrances" />} />
        <Route path="/wicks" element={<App route="/wikcs" />} />
        <Route path="/molds" element={<App route="/molds" />} />
        <Route path="/deals" element={<App route="/deals" />} />
        <Route path="/reviews" element={<App route="/reviews" />} />
        <Route path="/track" element={<App route="/track" />} />
        <Route path="*" element={<App route="/all-products" />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();