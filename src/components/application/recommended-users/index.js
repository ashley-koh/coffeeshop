import React, { useState } from 'react';
import { Avatar, Card, Button } from 'antd'
import axios from 'axios';

const { Meta } = Card;

function RecommendedUser(props) {

  return (
    <div>
      <Card
        hoverable
        style={{ width: 110, margin: 15 }}
        cover={<img alt="avatar" src={`https://api.adorable.io/avatars/200/hello@adorable.io.png`} />}
      >
        <Meta
          style={{ textAlign: 'center' }}
          title="hello"
          description={(<Button onClick={() => connect()} type="primary">Connect</Button>)}
        />
      </Card>
    </div>
  )

  function connect() {
    axios.get('https://128.199.88.168:80/friend')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

}

export default RecommendedUser;