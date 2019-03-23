import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import './App.css';

import Application from './components/application/index';
import User from './components/user/index';

import initUsers from './components/user/users';

const { Header, Content, Footer } = Layout;

function App() {
  
  const [currentPage, setCurrentPage] = useState(["user"]);
  const [users, setUsers] = useState(initUsers);

  return (
      <div className="app">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={currentPage}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="app" onClick={() => setCurrentPage(["app"])}>App</Menu.Item>
              <Menu.Item key="user" onClick={() => setCurrentPage(["user"])}>User</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
            <CurrentPage/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            NPES ©2019 Created by Ashley Koh, Tyler Goh, Jean Soh & Lim Qing Xin
          </Footer>
        </Layout>
      </div>
  );

  function CurrentPage() {
    if (currentPage[0] === "app") {
      return <Application/>
    } else {
      return <User
      users={users}
      setUsers={setUsers}
    />
    }
  }
}

export default App;
