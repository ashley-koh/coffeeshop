import React, { useState } from 'react';
import { Card, Row, Col, Button, Input } from 'antd';
import axios from 'axios';

function LoginSignUp(props) {

  const [loggingIn, setLoggingIn] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div style={{ backgroundColor: '#f0f2f5', height: '100%', paddingTop: 130 }}>
      <div>
        <Card style={{ width: 500, marginLeft: 'auto', marginRight: 'auto', marginBottom: 130, borderRadius: 10, textAlign: 'center' }}>
          <Row>
            <h1 style={{ margin: "15px 0" }}>Coffee Shop</h1>
          </Row>
          <Row>
            <Col span={8} offset={4}>
              <Button onClick={() => setLoggingIn(true)} type={loggingIn ? "primary" : "default"} style={{ width: '100%', borderBottomRightRadius: 0, borderTopRightRadius: 0 }}>Log In</Button>
            </Col>
            <Col span={8}>
              <Button onClick={() => setLoggingIn(false)} type={loggingIn ? "default" : "primary"} style={{ width: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Sign Up</Button>
            </Col>
          </Row>
          <Row style={{ margin: '10px 0' }}>Username</Row>
          <Row><Input style={{ width: '70%' }} size="large" onChange={(e) => setUsername(e.target.value)} placeholder="Username"/></Row>
          <Row style={{ margin: '10px 0' }}>Password</Row>
          <Row><Input style={{ width: '70%' }} type="password" size="large" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/></Row>
          <Row style={{ margin: "25px 0" }}>
            <Button onClick={() => register()} size="large" type="primary">Enter</Button>
          </Row>
        </Card>
      </div>
    </div>
  )


  function register() {
    let registration = "login"

    if (!loggingIn)
      registration = "register"

    axios.post(`http://128.199.88.168:80/${registration}`, {
      id: username,
      password, password
    })
      .then(res => {
        console.log(res)
        props.setUserSignedIn(true);
        props.setCurrentUser(username);
      })
      .catch(err => console.log(err))
  }
}

export default LoginSignUp;