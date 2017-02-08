import {
  SET_CITY_COUNTRY,
  NEW_SEARCH,
} from './constants';

const setCityCountry = (cityCountry) => ({
  type: SET_CITY_COUNTRY,
  cityCountry,
});

const newSearch = () => ({
  type: NEW_SEARCH,
});

export {
  setCityCountry,
  newSearch,
};
