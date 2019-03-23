import React, { useState } from 'react';
import './index.css';

function Application() {
    const [message, setMessage] = useState({});
    
    return (
    <div className="chat">
        <h1>WELCOME TO MY CHAT ROOM</h1>
        <input type="text" name="name" />
        <input type="submit" value="Submit" />
    </div>
    )
}

export default Application;