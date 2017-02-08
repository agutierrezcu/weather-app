import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  line-height: 1.5em;
  margin: 15px;
`;

const Label = styled.div`
  margin: 5px;
  font-weight: bold;
  width: 50%;
  text-align: right;
`;

const Value = styled.div`
  width: 50%;
`;

const DataForecast = (props) => (
  <Wrapper>
    <Label>{`${props.data.label}${':'}`}</Label>
    <Value>{props.data.value}</Value>
  </Wrapper>
);

DataForecast.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    symbol: PropTypes.string,
  }).isRequired,
};

export default DataForecast;
