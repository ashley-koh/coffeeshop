import React, { useState } from 'react';
import { List, Row, Col, Button, Input } from 'antd';
import './index.css';

function User(props) {

  const [name, setName] = useState();
  const [xCoor, setXCoor] = useState();
  const [yCoor, setYCoor] = useState();

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
          <Row style={{ margin: '10px 0px' }}><span>Name:</span></Row>
          <Row><Input placeholder="Name" onChange={(e) => setName(e.target.value)}/></Row>
          <Row style={{ margin: '10px 0px' }}><span>Location:</span></Row>
          <Row style={{ margin: '5px 0' }}><Input placeholder="X-coordinates" onChange={(e) => setXCoor(e.target.value)}/></Row>
          <Row><Input placeholder="Y-coordinates" onChange={(e) => setYCoor(e.target.value)}/></Row>
          <Row type="flex" justify="end">
            <Button 
              type="primary"
              style={{ marginTop: 10 }}
            >
              Add New User
            </Button>
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
  }

}

export default User;