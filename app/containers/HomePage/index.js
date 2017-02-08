import React from 'react';
import styled from 'styled-components';

import Search from '../../components/Search';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: 1px solid black;
  line-height: 2em;
`;

const Header = styled.h1`
  text-align: center;
  margin: 0 0 15px 0;
`;

const HomePage = () => (
  <Wrapper>
    <Header>
      Enter a City and/or Country
    </Header>
    <Search />
  </Wrapper>
);

export default HomePage;
