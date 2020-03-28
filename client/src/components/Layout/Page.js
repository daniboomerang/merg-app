import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Spin } from 'antd';
import styled from 'styled-components';

const StyledContent = styled.div`
  justify-content: center;
  align-content: center;
  background: #0d2538;
  display: grid;
  height: 100%;
`;

const Page = ({ currentPage, loading, children }) => {
  const { Header, Content } = Layout;

  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentPage]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='home'><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key='notes'><Link to="/notes">Notes</Link></Menu.Item>
        </Menu>
      </Header>
      <Content>
        <StyledContent>{loading ? (<Spin />) : children}</StyledContent>
      </Content>
    </Layout>
  );
};

export default Page;
