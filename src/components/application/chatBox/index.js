import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Button, Comment, Avatar } from 'antd'
import axios from 'axios';

import GameModal from '../game-modal/index';
import useInterval from './useInterval';

const { TextArea } = Input;

function ChatBox(props) {

  const [modalVisibility, setModalVisibility] = useState(false);
  const [message, setMessage] = useState();

  useInterval(() => {
    // Your custom logic here
    axios.post('http://128.199.88.168:80/requestmessage', {
      id: props.currentUser,
      room: props.currentRoom
    })
      .then(res => {
        let rooms = props.rooms;
          let messages = res.data;
          let roomnames = props.rooms.map(room => { return room.name })
          let index = roomnames.indexOf(props.currentRoom);
          
          console.log(res.data)

          for (let i in messages) {
            rooms[index].messages.push(messages[i])
            console.log(messages[i])
          }

          props.setRooms(rooms);
      }).catch(err => console.log(err))
  }, 5000);

  useEffect(() => {
    var scrollingElement = (document.getElementById("scroll")) /* you could provide your scrolling element with react ref */
    scrollingElement.scrollTop = scrollingElement.scrollHeight;


  });

  for (var key in props.rooms) {
    if (props.currentRoom == props.rooms[key].name)
      var Messages = props.rooms[key].messages;
  }
  // console.log(Messages)
  // const Text = Messages.map((msg) => (
  //   <Card title={msg.id} bordered={true} style={{ width: 500, margin: '15px 15px' }}>
  //     <p>{msg.message}</p>
  //   </Card>)
  // );

  const Text = Messages.map((msg) => {
    let styling = { width: 400, margin: '15px 25px', border: '1px solid #e8e8e8', padding: '0px 15px', borderRadius: 10 }
    if (msg.id === props.currentUser) 
      styling = { width: 400, marginBottom: 15, marginRight: 25, float: 'right', border: '1px solid #e8e8e8', padding: '0px 15px', borderRadius: 10  }
    return (
      <Row>
        <Comment
          style={styling}
          // actions={[<span>Reply to</span>]}
          author={<a href="#" onClick={() => setModalVisibility(msg.id)}>{msg.id}</a>}
          avatar={(
            <Avatar
              src={`https://api.adorable.io/avatars/180/${msg.id}@adorable.io.png`}
              alt="Han Solo"
            />
          )}
          content={<p>{msg.message}</p>}
        >
          
        </Comment>
        <GameModal 
          modalVisibility={modalVisibility} 
          setModalVisibility={setModalVisibility}
        />
      </Row>
    )
    
  })

  return (
    <div>
      <Row style={{ borderLeft: '1px solid #e8e8e8' }}>
        <h1 className="topic-header">Chat</h1>
      </Row>
      <Row>
        <div className="scrollable-container" id="scroll" style={{ height: '75vh' }}>
          {Text}
        </div>
      </Row>
      <Row style={{ backgroundColor: 'white', borderLeft: '1px solid #e8e8e8' }}>
        <Col span={18} offset={2}>
          <Input 
            style={{ margin: 10, height: 45, borderRadius: 100 }} 
            placeholder="Enter Text" 
            autoSize={{ rows: 4 }} 
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </Col>
        <Col span={2}>
          <Button 
            type="primary" 
            icon="upload"
            style={{ margin: 10, marginLeft: 15, height: 45, borderRadius: 100 }}
            onClick={() => sendMsg()}
          >
            Send
          </Button>
        </Col>
        
      </Row>

    </div>
  )

  function sendMsg() {
    let data = {
      id: props.currentUser,
      message: message,
      room: props.currentRoom,
    }

    axios.post('http://128.199.88.168/sendmessage', data)
      .then(res => {
        // let rooms = props.rooms;
        // let roomnames = props.rooms.map(room => { return room.name });
        // let index = roomnames.indexOf(data.room);
        // console.log(res.data)
        // rooms[index].messages.push({
        //   id: data.id,
        //   message: data.message
        // });
        // props.setRooms(rooms);
        axios.post('http://128.199.88.168:80/requestmessage', {
          id: props.currentUser,
          room: props.currentRoom
        })
          .then(res => {
            let rooms = props.rooms;
            let messages = res.data;
            let roomnames = props.rooms.map(room => { return room.name })
            let index = roomnames.indexOf(data.room);
            

            for (let i in messages) {
              rooms[index].messages.push(messages[i])
              console.log(messages[i])
            }

            props.setRooms(rooms);
            setMessage();
          })
          .catch(err => console.log(err))
          
          
      })
      .catch(err => console.log(err))
  }
}

export default ChatBox;