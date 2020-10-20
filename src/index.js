import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import jsonPlaceHolderApi from './services/JsonPlaceHolderApi';
import { JsonPlaceHolderContext } from './components/JsonPlaceHolderContext';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <JsonPlaceHolderContext.Provider value={jsonPlaceHolderApi}>
      <Router>
        <App />
      </Router>
    </JsonPlaceHolderContext.Provider>
  </Provider>,
  document.getElementById('root')
);
