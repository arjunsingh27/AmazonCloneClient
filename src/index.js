import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initialState } from './reducer';
 
import { StateProvider } from './StateProvider';
import reducer from './reducer';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </BrowserRouter>
);

// reportWebVitals();
