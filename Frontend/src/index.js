import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

console.log("Origin:", window.location.origin)

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain="dev-27agpw4g.us.auth0.com"
                    clientId="miSZA24uEXe5YcEvWUWKTzSu8Lm8Ow97"
                    redirectUri={window.location.origin + "/index.html"}
                    scope="read:games"
                    audience="https://table-top-map.azurewebsites.net/">
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
