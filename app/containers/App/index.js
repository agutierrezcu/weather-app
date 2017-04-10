import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Search from '../../components/Search';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 90%;
`;

const TopBar = styled.nav`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 2em;
  width: 100%;
  border-bottom: 1px solid black;
`;

const Title = styled.h2`
  margin: 10px 0;
  padding-left: 0.5em;
  min-width: 180px;

  &:hover {
    cursor: hand;
    cursor: pointer;
  }
`;

const SearchWrapper = styled(TopBar)`
  justify-content: flex-end;
  border-bottom: 0;
`;

const App = (props, context) => (
  <Wrapper>
    <TopBar>
      <Title onClick={() => context.router.push('/')}>Weather App</Title>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
    </TopBar>
    {React.Children.toArray(props.children)}
  </Wrapper>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default App;
