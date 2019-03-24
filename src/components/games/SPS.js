import React, {useState} from 'react';
import {Button, message} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

function Game() {

    const [playerID, setPlayerID] = useState('Left')
    const [playerLeft, setPlayerLeft] = useState('')
    const [playerRight, setPlayerRight] = useState('paper')
    const [gameCount, setGameCount] = useState(0)

    function choice(choice) {
        if (playerID === 'Left'){
            setPlayerLeft(choice);
        }
        else setPlayerRight(choice);
        
        setGameCount(gameCount+1);
        run();  
        setGameCount(gameCount+1); 
    }

    function run() {
        setGameCount(gameCount+1);
        console.log(playerLeft,playerRight,gameCount);
        if (playerLeft !== ''&&playerRight !== ''){
            if (playerLeft === playerRight){
                message.info("It's a tie", 2);
            }
            else if (playerLeft==='rock'&&playerRight==='scissors'||playerLeft==='paper'&&playerRight==='rock'||playerLeft==='scissors'&&playerRight==='paper'){
                if(playerID==='Left'){
                    message.success("Congradulations you won!!", 2);
                }
                else message.warning("Sorry but you lost",2);
            }
            else {
                if (playerID==='Left'){
                    message.warning("Sorry but you lost",2);
                }
                else message.success("Congradulations you won!!", 2);
            }
        }
    }

    return (
        <div className="container">
            <ButtonGroup>
                <Button
                onClick={()=>choice('rock')}>
                    Rock
                </Button>
                <Button
                onClick={()=>choice('paper')}>
                    Paper
                </Button>
                <Button
                onClick={()=>choice('scissors')}>
                    Scissors
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default Game;