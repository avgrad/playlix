import React from 'react';
import ReactDom from 'react-dom';
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appReducer from './state';

import App from './App';

const store = createStore(appReducer, applyMiddleware(reduxThunk));

ReactDom.render(<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
