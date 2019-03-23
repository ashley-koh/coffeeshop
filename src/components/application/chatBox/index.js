import React, { useState } from 'react';
import { Card } from 'antd'

function ChatBox(props) {
    var scrollingElement = (document.getElementById("scroll")) /* you could provide your scrolling element with react ref */
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
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
        <div className="scrollable-container" id="scroll" style={{ height: 500 }}>
        {Text}
    </div>
    )
}

export default ChatBox;