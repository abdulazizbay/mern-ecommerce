import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from  "react-redux";
import store from "./states/store"
import {Toaster} from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store} >
        <App />
          <Toaster
              position="bottom-right"
              reverseOrder={false}
          />
      </Provider >
  </React.StrictMode>
);

reportWebVitals();
