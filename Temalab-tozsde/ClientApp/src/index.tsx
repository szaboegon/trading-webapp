import React from 'react';
import ReactDOM from 'react-dom/client';
import './custom.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement        //TODO
);
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

reportWebVitals();
