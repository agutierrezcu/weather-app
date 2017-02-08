import { delay } from 'redux-saga';
import { takeLatest, takeEvery, select, call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_END_POINT, DAYS_COUNT } from './config';
import { setCityCountry } from './actions';
import { makeSelectCityCountry } from './selectors';
import request from './utils/request';

import {
  SET_CITY_COUNTRY,
  START_FETCH_FORECAST_DATA,
  SUCCESS_FETCHED_FORECAST,
  FINISH_FETCH_FORECAST_DATA,
  ERROR_FETCHED_FORECAST,
} from './constants';

function* watchLocationChange() {
  yield takeEvery(LOCATION_CHANGE, trySetCityCountry);
}

function* trySetCityCountry(locationChange) {
  const path = locationChange.payload.pathname;
  if (path === '/') {
    return;
  }

  const cityCountryInState = yield select(makeSelectCityCountry());
  if (path.indexOf(cityCountryInState) > 0) {
    return;
  }

  const pathTokens = path.split('/');
  if (pathTokens.length < 2) {
    return;
  }

  const cityCountry = decodeURIComponent(pathTokens[1]);
  yield put(setCityCountry(cityCountry));
}

function* watchSetCityCountry() {
  yield takeLatest(SET_CITY_COUNTRY, fetchForecast);
}

function* fetchForecast() {
  yield put({
    type: START_FETCH_FORECAST_DATA,
  });

  yield delay(3000);

  const cityCountry = yield select(makeSelectCityCountry());

  const queryParameter = `q=${cityCountry}&type=accurate&APPID=${OPEN_WEATHER_API_KEY}`;

  const currentForecastUrl = `${OPEN_WEATHER_END_POINT}/weather?${queryParameter}`;
  const nextDayForecastUrl = `${OPEN_WEATHER_END_POINT}/forecast/daily?${queryParameter}&cnt=${DAYS_COUNT}`;

  try {
    const [currentForecast, nextDaysForecast] = yield [
      call(request, currentForecastUrl),
      call(request, nextDayForecastUrl),
    ];
    yield put({
      type: SUCCESS_FETCHED_FORECAST,
      currentForecast,
      nextDaysForecast,
    });

    yield put({
      type: FINISH_FETCH_FORECAST_DATA,
    });
  } catch (error) {
    yield put({
      type: ERROR_FETCHED_FORECAST,
      error,
    });
  }
}

export default function* rootSaga() {
  yield [
    watchLocationChange(),
    watchSetCityCountry(),
  ];
}
