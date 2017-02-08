import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { makeGettDayForecast } from '../../selectors';
import DayForecast from '../../components/DayForecast';
import DataForecast from '../../components/DataForecast';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Back = styled.h3`
  text-decoration: underline;
  margin: 0;
  &:hover {
    cursor: hand;
    cursor: pointer;
  }
`;

const Data = styled.div`
  margin: 15px;
`;

const DetailedForecast = ({ getDayForecast, onClickBack, router }) => {
  let dayForecast = getDayForecast(router.params.day);
  if (!dayForecast) {
    dayForecast = getDayForecast('now');
  }
  return (
    <Wrapper>
      <DayForecast dayForecast={dayForecast} onClickDay={onClickBack} />
      <Data>
        <DataForecast key={'minTemp'} data={{ label: 'Min temp', value: dayForecast.minTemp }} />
        <DataForecast key={'maxTemp'} data={{ label: 'Max temp', value: dayForecast.maxTemp }} />
        <DataForecast key={'humidity'} data={{ label: 'Humidity', value: dayForecast.humidity }} />
        <DataForecast key={'pressure'} data={{ label: 'Pressure', value: dayForecast.pressure }} />
      </Data>
      <Back onClick={onClickBack}>Back</Back>
    </Wrapper>
  );
};

DetailedForecast.propTypes = {
  getDayForecast: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

DetailedForecast.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getDayForecast: makeGettDayForecast(),
});

const mapDispatchToProps = (dispatch, { router }) => ({
  onClickBack: () => {
    router.push(`/${router.params.cityCountry}`);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailedForecast);
