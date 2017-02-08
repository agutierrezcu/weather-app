import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./favicon.ico'; // eslint-disable-line import/no-unresolved
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './store';
import { makeSelectLocationState } from './selectors';

import App from './containers/App';
import HomePage from './containers/HomePage';
import ForecastPage from './containers/ForecastPage';
import NextDays from './containers/NextDays';
import DetailedForecast from './containers/DetailedForecast';

import 'sanitize.css/sanitize.css'; // eslint-disable-line import/first
import './global-styles';

const initialState = {};

const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/:cityCountry" component={ForecastPage}>
          <IndexRoute component={NextDays} />
          <Route path="/:cityCountry/:day" component={DetailedForecast} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
