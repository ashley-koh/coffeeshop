import React, { useState } from 'react';
import { Menu, Icon, Button, Row, Col } from 'antd';
import './index.css';

import ChatBox from './chatBox/index';
import RecommendedUsers from './recommended-users/index';
import CreateRoom from './create-room/index'

function Application(props) {
  const [currentRoom, setRoom] = useState("General");
  const [creatingNewRoom, setCreatingNewRoom] = useState(false);

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
        <Col span={4}>
            <div className="topic-header"><h2>Available Rooms</h2></div>
            <Menu
              onClick={(e) => handleClick(e)}
              style={{ minHeight: '90svh' }}
              defaultSelectedKeys={['General']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              style={{ borderRight: 'none' }}
            >
              {Options}
            </Menu>
            {/* <div style={{ width: '100%', textAlign: 'center' }}>
              <Button 
                onClick={() => setCreatingNewRoom(true)}
                style={{ width: '90%', marginTop: 10 }}
                type="primary"
                icon="plus"
              >
                Create a room
              </Button>
            </div>
            <div>
              { creatingNewRoom ? <CreateRoom 
                  setCreatingNewRoom={setCreatingNewRoom}
                  currentUser={props.currentUser}
                /> : null}
            </div> */}
        </Col>
        <Col span={15}>
              <ChatBox 
                rooms={props.rooms} 
                setRooms={props.setRooms} 
                currentRoom={currentRoom}
                currentUser={props.currentUser}
              />
          
        </Col>
        <Col span={5} style={{ border: '1px solid #e8e8e8' }}>
          <Row><h1 className="topic-header">Recommend Users</h1></Row>
          <Row type="flex">
            <RecommendedUsers />
          </Row>
        </Col>

      </Row>
    </div>
  )
}


export default Application;