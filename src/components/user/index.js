import React, { useState } from 'react';
import { List, Row, Col, Button, Input, Select } from 'antd';
import './index.css';

const Option = Select.Option;

function User(props) {

  const [name, setName] = useState();
  const [xCoor, setXCoor] = useState();
  const [yCoor, setYCoor] = useState();
  const [roomname, setRoomName] = useState();
  const [postingAs, setPostingAs] = useState();
  const [firstMsg, setFirstMsg] = useState();

  return (
    <div className="user">
      <Row gutter={25}>
        <Col span={10}>
          <Row>
            <h1>Users</h1>
          </Row>
          <Row>
            <List 
              bordered
              dataSource={props.users}
              renderItem={user => (
                <List.Item>
                  Name: {user.name}
                </List.Item>
                )}
            />
          </Row>
        </Col>
        <Col span={10} offset={2}>
          <Row>
            <h1>Add New User</h1>
          </Row>
          <Row style={{ marginBottom: 10 }}><span>Name:</span></Row>
          <Row><Input placeholder="Name" onChange={(e) => setName(e.target.value)}/></Row>
          <Row style={{ margin: '10px 0px' }}><span>Location:</span></Row>
          <Row style={{ margin: '5px 0' }}><Input placeholder="X-coordinates" onChange={(e) => setXCoor(e.target.value)}/></Row>
          <Row><Input placeholder="Y-coordinates" onChange={(e) => setYCoor(e.target.value)}/></Row>
          <Row type="flex" justify="end">
            <Button 
              type="primary"
              style={{ marginTop: 15 }}
              onClick={() => addNewUser()}
            >
              Add New User
            </Button>
          </Row>
        </Col>
      </Row>
      <Row gutter={25}>
        <Col span={10}>
          <Row><h1>Rooms</h1></Row>
          <Row>
          <List 
              bordered
              dataSource={props.rooms}
              renderItem={room => (
                <List.Item>
                  {room.name}
                  <Row>
                    <List 
                      dataSource={room.messages}
                      renderItem={message => (
                        <List.Item>
                          {message.id}: {message.message}
                        </List.Item>
                        )}
                    />
                  </Row>
                </List.Item>
                )}
            />
          </Row>
        </Col>
        <Col span={10} offset={2}>
          <Row>
            <h1>Add New Room</h1>
          </Row>
          <Row style={{ marginBottom: 10 }}>Room Name:</Row>
          <Row><Input placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} /></Row>
          <Row style={{ margin: '10px 0' }}>First Message:</Row>
          <Row><Input placeholder="First Message" onChange={(e) => setFirstMsg(e.target.value)} /></Row>
          <Row style={{ margin: '10px 0' }}>Post As:</Row>
          <Row>
            <Col span={12}>
              <Select defaultValue={props.users[0].name} >
                {props.users.map(user => (
                  <Option value={user.name}>{user.name}</Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={6}>
              <Button 
                type="primary"
                style={{ marginLeft: 13 }}
                onClick={() => addNewUser()}
              >
                Add New Room
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )

  function addNewUser() {
    let users = props.users;
    users.push({
      name: name,
      location: {
        x: xCoor,
        y: yCoor
      }
    })
    props.setUsers(users);
  }

  function addNewRoom() {
    let rooms = props.rooms;
    rooms.push({
      name: roomname,
      messages: [
        {
          id: postingAs,
          message: firstMsg
        }
      ]
    })
  }

}

export default User;