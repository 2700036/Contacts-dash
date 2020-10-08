import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import jsonPlaceHolderApi from './services/JsonPlaceHolderApi';
import { JsonPlaceHolderContext } from './components/JsonPlaceHolderContext';

ReactDOM.render(
  <React.StrictMode>
     <JsonPlaceHolderContext.Provider value={jsonPlaceHolderApi}>
      <Router >
        <App />
      </Router>
    </JsonPlaceHolderContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

