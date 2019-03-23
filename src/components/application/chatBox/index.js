import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Button } from 'antd'

const { TextArea } = Input;

function ChatBox(props) {
  useEffect(() => {
    var scrollingElement = (document.getElementById("scroll")) /* you could provide your scrolling element with react ref */
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  });

  for (var key in props.rooms) {
    if (props.currentRoom == props.rooms[key].name)
      var Messages = props.rooms[key].messages;
  }
  console.log(Messages)
  const Text = Messages.map((msg) => (
    <Card title={msg.id} bordered={false} style={{ width: 300 }}>
      <p>{msg.message}</p>
    </Card>)
  );

  return (
    <div>
      <Row>
        <div className="scrollable-container" id="scroll" style={{ height: '75vh' }}>
          {Text}
        </div>
      </Row>
      <Row style={{ backgroundColor: '#f2f2f2' }}>
        <Col span={16}>
          {/* <div className="input-box"> */}
            <TextArea style={{ margin: 10, height: 50 }} placeholder="Enter Text" autoSize={{ rows: 4 }} />
          {/* </div> */}
        </Col>
        <Col span={2}>
          <Button 
            type="primary" 
            icon="upload"
            style={{ margin: 10,marginLeft: 15, height: 50 }}
          >
            Send
          </Button>
        </Col>
      </Row>

    </div>
  )
}

export default ChatBox;