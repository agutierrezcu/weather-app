import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import { LOCATION_CHANGE } from 'react-router-redux';
import {
  SET_CITY_COUNTRY,
  NEW_SEARCH,
  START_FETCH_FORECAST_DATA,
  SUCCESS_FETCHED_FORECAST,
  FINISH_FETCH_FORECAST_DATA,
  ERROR_FETCHED_FORECAST,
} from './constants';

import { getDate, getDay, convertTemp } from './utils/formatters';

const getDayForecast = (day, date, weather, data) => ({
  day,
  date,
  icon: weather.icon,
  description: weather.main,
  ...data,
});

const fetchedForecast = (forecast = {}, action) => {
  // Sometimes list property comes from API in different way
  const list = action.nextDaysForecast.list || action.nextDaysForecast.List;
  const nextDays = list.reduce((previous, current) =>
    Object.assign({}, previous, {
      [getDay(current.dt)]: getDayForecast(getDay(current.dt), getDate(current.dt), current.weather[0], {
        minTemp: convertTemp(current.temp.min),
        maxTemp: convertTemp(current.temp.max),
        humidity: current.humidity,
        pressure: current.pressure,
      }),
    }), {
      now: getDayForecast('now', 'Now', action.currentForecast.weather[0], {
        minTemp: convertTemp(action.currentForecast.main.temp_min),
        maxTemp: convertTemp(action.currentForecast.main.temp_max),
        humidity: action.currentForecast.main.humidity,
        pressure: action.currentForecast.main.pressure,
      }),
    });
  return {
    ...forecast,
    nextDays,
  };
};

const defaultForecast = {
  cityCountry: '',
  isLoading: false,
  error: {},
  nextDays: {},
};

const forecastReducer = (forecast = defaultForecast, action) => {
  switch (action.type) {
    case SET_CITY_COUNTRY: {
      return {
        ...forecast,
        cityCountry: action.cityCountry,
        nextDays: {},
        error: {},
      };
    }
    case NEW_SEARCH: {
      return defaultForecast;
    }
    case START_FETCH_FORECAST_DATA: {
      return {
        ...forecast,
        isLoading: true,
      };
    }
    case SUCCESS_FETCHED_FORECAST: {
      return fetchedForecast(forecast, action);
    }
    case FINISH_FETCH_FORECAST_DATA: {
      return Object.assign({}, forecast, {
        isLoading: false,
      });
    }
    case ERROR_FETCHED_FORECAST: {
      return {
        ...forecast,
        isLoading: false,
        nextDays: {},
        error: action.error,
      };
    }
    default:
      return forecast;
  }
};

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

const routeReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
};

export default function createReducer() {
  return combineReducers({
    forecast: forecastReducer,
    route: routeReducer,
  });
}
