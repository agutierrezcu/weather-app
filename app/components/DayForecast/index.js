import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.article`
  flex: 0 1 auto;
  padding: 2px 0;
  margin: 0 10px 35px 10px;
  text-align: center;
  width: 28%;
  height: 30%;

  &:hover {
    color: #449D44;
    cursor: hand;
    cursor: pointer;
  }
`;

const Figure = styled.figure`
  margin: 0;
  text-align: center;
`;

const Caption = styled.figcaption`
  font-style: italic;
`;

const Image = styled.img`
  height: 128px;
  width: 120px;
`;

const DayForecast = ({ dayForecast, onClickDay }) => {
  const dayIcon = require(`../../icons/${dayForecast.icon}.svg`); // eslint-disable-line global-require
  return (
    <Wrapper onClick={() => onClickDay(dayForecast)}>
      <Figure>
        <Image src={dayIcon} alt={dayForecast.description} />
        <Caption>{dayForecast.description}</Caption>
      </Figure>
      <div>{dayForecast.date}</div>
    </Wrapper>
  );
};

DayForecast.propTypes = {
  dayForecast: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onClickDay: PropTypes.func.isRequired,
};

export default DayForecast;
