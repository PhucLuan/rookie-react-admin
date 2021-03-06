import 'core-js';
import React from 'react';
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import App from './App';
import { icons } from './assets/icons';
import userManager from './Helper/userManager';
import './polyfill';
import store from './Redux/store';
import * as serviceWorker from './serviceWorker';



React.icons = icons

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <App/>
    </OidcProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
