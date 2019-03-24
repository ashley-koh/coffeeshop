import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import Axios from 'axios';

function CreateRoom(props) {

  const [roomName, setRoomName] = useState();
  const [firstMsg, setFirstMsg] = useState();

  return (
    <div style={{ marginLeft: 20, marginTop: 15, width: '80%', textAlign: 'center' }}>
      <Row >Room Name:</Row>
      <Row style={{ margin: '10px 0' }}><Input placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)}/></Row>
      <Row>First Message:</Row>
      <Row style={{ margin: '10px 0' }}><Input placeholder="First Message" onChange={(e) => setFirstMsg(e.target.value)}/></Row>
      <Row>
        <Col span={10} offset={2}>
          <Button onClick={() => handleCancel()}>Cancel</Button>
        </Col>
        <Col span={10}>
          <Button type="primary" onClick={() => handleCreate()}>Create</Button>
        </Col>
      </Row>
    </div>
  )

  function handleCancel() {
    props.setCreatingNewRoom(false);
  }

  function handleCreate() {
    props.setCreatingNewRoom(false);
    Axios.post('http://128.199.88.168/sendmessage', {
      id: props.currentUser,
      message: firstMsg,
      room: roomName
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
}

export default CreateRoom;