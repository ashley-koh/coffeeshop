import React, { useState } from 'react';
import { Layout, Menu, Select, Row, Col } from 'antd';
import axios from 'axios';
import './App.css';

import Application from './components/application/index';
import User from './components/user/index';
import LoginSignUp from './components/login-signup/index'

import initUsers from './components/user/users';
import initRooms from './components/application/rooms';

const { Header, Content, Footer } = Layout;
const Option = Select.Option;

function App() {
  
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(["app"]);
  const [currentUser, setCurrentUser] = useState()
  const [users, setUsers] = useState(initUsers);
  const [rooms, setRooms] = useState(initRooms);

  

  return (
      <div className="app">
        <Layout className="layout">
          <Header>
            <Row type="flex">
              <Col span={22}>
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
              </Col>
              <Col span={2}>
                <Select 
                  defaultValue={users[0].name}
                  onChange={(e) => setCurrentUser(e.target.value)}
                >
                  {users.map((user, index)=> (
                    <Option key={index} value={user.name}>{user.name}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Header>
          <Content style={{ backgroundColor: 'white' }}>
            <CurrentPage/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            NPES ©2019 Created by Ashley Koh, Tyler Goh, Jean Soh & Lim Qin Xin
          </Footer>
        </Layout>
      </div>
  );

  function CurrentPage() {
    if (currentPage[0] === "app") {
      if (userSignedIn) {
        return <Application
          rooms={rooms}
          setRooms={setRooms}
          currentUser={currentUser}
        />
      } else {
        return <LoginSignUp setUserSignedIn={setUserSignedIn} setCurrentUser={setCurrentUser}/>
      }
    } else {
      return <User
      users={users}
      setUsers={setUsers}
      rooms={rooms} 
      setRooms={setRooms}
    />
    }
  }

}

export default App;
