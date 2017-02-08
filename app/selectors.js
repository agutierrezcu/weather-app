import { createSelector } from 'reselect';

const selectForecast = (state) => state.get('forecast');

const makeSelectCityCountry = () => createSelector(
  selectForecast,
  (forecast) => forecast.cityCountry
);

const makeSelectIsLoading = () => createSelector(
  selectForecast,
  (forecast) => forecast.isLoading
);

const makeSelectError = () => createSelector(
  selectForecast,
  (forecast) => forecast.error
);

const makeSelectNextDays = () => createSelector(
  selectForecast,
  (forecast) => forecast.nextDays
);

const makeGettDayForecast = () => createSelector(
  makeSelectNextDays(),
  (nextDays) => (day) => nextDays[day]
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectForecast,
  makeSelectCityCountry,
  makeSelectIsLoading,
  makeSelectError,
  makeSelectNextDays,
  makeGettDayForecast,
  makeSelectLocationState,
};
