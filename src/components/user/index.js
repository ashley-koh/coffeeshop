import React, { useState } from 'react';
import { List, Row, Col, Button, Input, Select } from 'antd';
import axios from 'axios';
import './index.css';

const Option = Select.Option;

function User(props) {

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [xCoor, setXCoor] = useState();
  const [yCoor, setYCoor] = useState();
  const [roomname, setRoomName] = useState();
  const [postingAs, setPostingAs] = useState(props.users[0].name);
  const [firstMsg, setFirstMsg] = useState();
  const [newMsg, setNewMsg] = useState();
  const [sendTo, setSendTo] = useState(0);

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
          <Row><Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} /></Row>
          <Row style={{ margin: '10px 0px' }}><span>Address:</span></Row>
          <Row style={{ marginBottom: 10 }}><Input placeholder="Address" onChange={(e) => getLocation(e.target.value)} /></Row>
          <Row style={{ margin: '5px 0' }}><Input placeholder="X-coordinates" onChange={(e) => setXCoor(e.target.value)} value={xCoor} /></Row>
          <Row><Input placeholder="Y-coordinates" onChange={(e) => setYCoor(e.target.value)} value={yCoor} /></Row>
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
          <Row><Input placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} value={roomname} /></Row>
          <Row style={{ margin: '10px 0' }}>First Message:</Row>
          <Row><Input placeholder="First Message" onChange={(e) => setFirstMsg(e.target.value)} value={firstMsg} /></Row>
          <Row style={{ margin: '10px 0' }}>Post As:</Row>
          <Row>
            <Col span={12}>
              <Select defaultValue={props.users[0].name} onChange={(value) => setPostingAs(value)} >
                {props.users.map((user, index) => (
                  <Option key={index} value={user.name}>{user.name}</Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={6}>
              <Button
                type="primary"
                style={{ marginLeft: 13 }}
                onClick={() => addNewRoom()}
              >
                Add New Room
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: 35 }}><h1>Send New Message</h1></Row>
          <Row style={{ marginBottom: 10 }}>Message</Row>
          <Row>
            <Input placeholder="Message" onChange={(e) => setNewMsg(e.target.value)} value={newMsg} />
          </Row>
          <Row style={{ margin: '10px 0' }}>
            <Col span={6}>
              Post As:
            </Col>
            <Col span={4}>
              Post To:
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Select defaultValue={props.users[0].name} onChange={(value) => setPostingAs(value)} >
                {props.users.map((user, index) => (
                  <Option key={index} value={user.name}>{user.name}</Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <Select defaultValue={0} onChange={(value) => setSendTo(value)} >
                {props.rooms.map((room, index) => (
                  <Option key={index} value={index}>{room.name}</Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={7}>
              <Button
                type="primary"
                style={{ marginLeft: 15 }}
                onClick={() => sendNewMsg()}
              >
                Send New Message
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
    setName();
    setXCoor();
    setYCoor();
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
    props.setRooms(rooms);
    setRoomName();
    setFirstMsg();
  }

  function sendNewMsg() {
    let rooms = props.rooms;
    console.log(sendTo)
    rooms[sendTo].messages.push({
      id: postingAs,
      message: newMsg
    })
    props.setRooms(rooms);
    setNewMsg();

  }

  function getLocation(value) {
    axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${value}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
      .then(res => {
        console.log(res.data.results)
        let result = res.data.results;
        if (typeof result[0] === "undefined") {
          setXCoor();
          setYCoor();
        } else {
          setXCoor(res.data.results[0].X)
          setYCoor(res.data.results[0].Y)
        }
      })
      .catch(err => console.log(err))
  };

}

export default User;