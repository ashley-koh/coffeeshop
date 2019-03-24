import React, { useState } from 'react';
import { Avatar, Card, Button } from 'antd'

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
          description={(<Button type="primary">Connect</Button>)}
        />
      </Card>
    </div>
  )

}

export default RecommendedUser;