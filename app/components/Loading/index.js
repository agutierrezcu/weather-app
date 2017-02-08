import React, { Component } from 'react';
import styled from 'styled-components';

const Text = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-aligntext-align: center;
`;

class Loading extends Component {
  constructor() {
    super();
    this.state = {
      progress: '',
    };
  }

  componentDidMount() {
    this.timer = this.increaseProgress();
  }

  componentDidUpdate() {
    clearTimeout(this.timer);
    this.timer = this.increaseProgress();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  increaseProgress = () => (
    setTimeout(() => {
      this.setState({
        progress: `${this.state.progress}.`,
      });
    }, 500)
  );

  render() {
    const progress = this.state.progress;
    return (
      <Text>
        {progress}Loading{progress}
      </Text>
    );
  }
}

export default Loading;
