import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import check from 'check-types';
import styled from 'styled-components';

import { newSearch } from '../../actions';

const Wrapper = styled.div`
  display: inherit;
  flex-direction: inherit;
  justify-content: inherit;
  align-items: inherit;
  line-height: inherit;
  width: inherit;
`;

const Input = styled.input`
  border: 1px solid black;
  line-height: inherit;
  margin: 0;
  border-radius: 5px;
  width: 55%;
  max-width: 400px;
  min-width: 150px;
`;

const Button = styled.a`
  line-height: 1.5em;
  border: 0px solid black;
  margin: 10px;
  padding: 0.5em;
  border-radius: 0.6em;
  box-sizing: border-box;
  color: white;
  background-color: #449D44;
  box-shadow: 2px 2px 10px gray;

  &:hover {
    color: #449D44;
    background-color: white;
    cursor: hand;
    cursor: pointer;
  }
`;

const DisabledButton = styled.a`
  line-height: 1.5em;
  border: 0px solid black;
  margin: 10px;
  padding: 0.5em;
  border-radius: 0.6em;
  box-sizing: border-box;
  color: white;
  background-color: #C2CDC2;
  box-shadow: 2px 2px 10px gray;
`;

class Search extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      cityCountry: '',
    };
  }

  onChangeCityCountry = (event) => {
    this.setState({
      cityCountry: event.target.value,
    });
  }

  onClickGetForecast = () => {
    this.performSearch();
  }

  handleKeyPress = (event) => {
    if (event.charCode === 13) {
      this.performSearch();
    }
  }

  performSearch = () => {
    if (this.isTextValid()) {
      this.props.onNewSearch();
      this.context.router.push(`/${this.state.cityCountry}`);
      this.reset();
    }
  }

  reset = () => {
    this.setState({
      cityCountry: '',
    });
  }

  isTextValid = () => check.nonEmptyString(this.state.cityCountry);

  render() {
    const button = (this.isTextValid()) ?
      (<Button onClick={this.onClickGetForecast}>Get forecast</Button>) :
      (<DisabledButton onClick={this.onClickGetForecast}>Get forecast</DisabledButton>);

    return (
      <Wrapper>
        <Input type="search" value={this.state.cityCountry} onKeyPress={this.handleKeyPress} onChange={this.onChangeCityCountry} placeholder="Barcelona, Spain" />
        {button}
      </Wrapper>
    );
  }
}

Search.propTypes = {
  onNewSearch: PropTypes.func.isRequired,
};

Search.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onNewSearch: () => {
    dispatch(newSearch());
  },
});

export default connect(null, mapDispatchToProps)(Search);
