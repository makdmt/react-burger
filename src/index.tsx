import React from 'react';
import ReactDOM from 'react-dom/client';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux/es/exports';
import thunk from 'redux-thunk';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_ORDERS,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR
} from './services/actions/wsFeed';

import { getCookie, removeBearer } from './utils/cookie-set-get';

import {
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_GET_ORDERS
} from './services/actions/wsUserOrders';

import { rootReducer } from './services/reducers';
import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_ORDERS,
  wsSendMessage: 'NOT_USED'
}

const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all';

const wsUserOrdersActions = {
  wsInit: WS_USER_ORDERS_CONNECTION_START,
  onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
  onError: WS_USER_ORDERS_CONNECTION_ERROR,
  onMessage: WS_USER_ORDERS_GET_ORDERS,
  wsSendMessage: 'NOT_USED'
}

const wsUserOrdersUrl = 'wss://norma.nomoreparties.space/orders';

// console.log(removeBearer(getCookie('accessToken')));

// const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsFeedUrl, wsFeedActions)));
const enhancer = composeEnhancers(applyMiddleware(thunk,
 socketMiddleware(wsFeedUrl, wsFeedActions),
 socketMiddleware(wsUserOrdersUrl, wsUserOrdersActions, () => removeBearer(getCookie('accessToken')))));
// const store = createStore(rootReducer, enhancer);
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
