import React, { useState } from 'react';
import { Menu, Icon, Button, Row, Col } from 'antd';
import './index.css';

import ChatBox from './chatBox/index'

function Application(props) {
  const [currentRoom, setRoom] = useState("General");
  const Options = props.rooms.map((room) =>
    <Menu.Item key={room.name}>
      <Icon type="pie-chart" />
      <span>{room.name}</span>
    </Menu.Item>
  );

  function handleClick(e) {
    setRoom(e.key);
  }
  return (
    <div className="sidebar">
      <Row type="flex">
        <Col span={3}>
            <Menu
              onClick={(e) => handleClick(e)}
              style={{ minHeight: '81svh' }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              style={{ borderRight: 'none' }}
            >
              {Options}
            </Menu>
        </Col>
        <Col span={21}>
          <ChatBox rooms={props.rooms} setRooms={props.setRooms} currentRoom={currentRoom}></ChatBox>
        </Col>
      </Row>
    </div>
  )
}


export default Application;