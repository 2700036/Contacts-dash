import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import jsonPlaceHolderApi from './services/JsonPlaceHolderApi';
import { JsonPlaceHolderContext } from './components/JsonPlaceHolderContext';

ReactDOM.render(
  <JsonPlaceHolderContext.Provider value={jsonPlaceHolderApi}>
    <Router>
      <App />
    </Router>
  </JsonPlaceHolderContext.Provider>,

  document.getElementById('root')
);
