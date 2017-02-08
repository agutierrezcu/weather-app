import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import check from 'check-types';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { makeSelectCityCountry, makeSelectIsLoading, makeSelectError, makeSelectNextDays } from '../../selectors';
import Loading from '../../components/Loading';
import UnavailableData from '../../components/UnavailableData';
import ErrorMessage from '../../components/ErrorMessage';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2em;
  border: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const Header = styled.h1`
  text-align: center;
  text-transform: uppercase;
`;

const ForecastPage = (props) => {
  let children = React.Children.only(props.children);
  if (props.isLoading) {
    children = <Loading />;
  } else if (check.instanceStrict(props.error, Error)) {
    children = <ErrorMessage error={props.error} />;
  } else if (check.emptyObject(props.nextDays)) {
    children = <UnavailableData />;
  }
  return (
    <Wrapper>
      <Header>
        {props.cityCountry}
      </Header>
      {children}
    </Wrapper>
  );
};

ForecastPage.propTypes = {
  cityCountry: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  nextDays: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cityCountry: makeSelectCityCountry(),
  isLoading: makeSelectIsLoading(),
  error: makeSelectError(),
  nextDays: makeSelectNextDays(),
});

export default connect(mapStateToProps)(ForecastPage);

