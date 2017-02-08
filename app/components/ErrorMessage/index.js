import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Text = styled.h4`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-aligntext-align: center;
`;

const ErrorMessage = (props) => (
  <Text>
    Error: {props.error.message}
  </Text>
);

ErrorMessage.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default ErrorMessage;
