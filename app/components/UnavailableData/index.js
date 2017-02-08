import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-aligntext-align: center;
`;

const NoData = () => (
  <Text>
    Forecast data is not available. Please, wait for few minutes and try again.
  </Text>
);

export default NoData;
