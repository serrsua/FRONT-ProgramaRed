import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";

axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.baseURL = "https://programared-back-production.up.railway.app";

const container = document.getElementById('root');
// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-ld1rfpxkhqa8gz6z.us.auth0.com"
        clientId="WaIt30DwXfzg00vAvdwrytBgnJ9sWG4r"
        redirectUri={window.location.origin}
        audience="programared"
        scope="openid profile email"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
