import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initialState } from './reducer';
import { StateProvider } from './StateProvider';
import reducer from './reducer';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
