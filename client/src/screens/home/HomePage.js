import React from 'react';
import Page from '../../components/Layout/Page';
import styled from 'styled-components';
import { Typography } from 'antd';

const NotesListSection = styled.div`
  box-shadow: 0px 0px 5px 2px #0d2538;
  border-radius: 15px;
  overflow-y: scroll;
  background: #0f2d44;
  padding: 20px 0;
  height: 500px;
  color: white;
  width: 600px;
`;

const { Title } = Typography;

const HomePage = () =>
  <Page currentPage="home">
    <NotesListSection>
      <Title>MERG Playground</Title>
    </NotesListSection>
  </Page>;


export default HomePage;
