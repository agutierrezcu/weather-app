const daysOfWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const monthsOfYear = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'Aug',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

function convertTemp(kelvin) {
  return parseInt(((kelvin - 273.15) * 1.8000 + 32.00), 10); // eslint-disable-line no-mixed-operators
}

function getDate(unixTimestmap) {
  const date = new Date(unixTimestmap * 1000);
  const day = daysOfWeek[date.getDay()];
  const month = `${monthsOfYear[date.getMonth()]} ${date.getDate()}`;
  return `${day}, ${month}`;
}

function getDay(unixTimestmap) {
  const date = new Date(unixTimestmap * 1000);
  const day = daysOfWeek[date.getDay()];
  return day.toLowerCase();
}

module.exports = {
  convertTemp,
  getDate,
  getDay,
};
