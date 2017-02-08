import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { makeSelectNextDays } from '../../selectors';
import DayForecast from '../../components/DayForecast';

const Wrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Hint = styled.h3`
  width: 100%;
  text-align: center;
  margin: 0;
`;

const NextDays = ({ nextDays, onClickDay }) => {
  const days = Object.entries(nextDays).map(([key, value]) => <DayForecast key={key} dayForecast={value} onClickDay={onClickDay} />);
  return (
    <Wrapper>
      <Hint>
        HINT: Click on day to get more info.
      </Hint>
      {days}
    </Wrapper>
  );
};

NextDays.propTypes = {
  nextDays: PropTypes.object.isRequired,
  onClickDay: PropTypes.func.isRequired,
};

DayForecast.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nextDays: makeSelectNextDays(),
});

const mapDispatchToProps = (dispatch, { router }) => ({
  onClickDay: (day) => {
    router.push(`/${router.params.cityCountry}/${day.day}`);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NextDays);
