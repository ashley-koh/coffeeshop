import React, {useState} from 'react';
import {Button, message} from 'antd';
import './TTT.css';

function Game() {

    const [gameBoard, setGameBoard] = useState([
        '','','',
        '','','',
        '','',''
    ])
    const [TF, setTF] = useState([false,false,false,false,false,false,false,false,false])
    const [turn, setTurn] = useState('X')
    
    function resetBoard() {
        setGameBoard([
            '','','',
            '','','',
            '','',''
        ]);
        setTF([false,false,false,false,false,false,false,false,false]);
        setTurn('X')
    }

    function checkBoard() {
        if (gameBoard[0] !== ''){
            if (gameBoard[0]===gameBoard[1]&&gameBoard[1]===gameBoard[2]){gameEnd()}
            else if (gameBoard[0]===gameBoard[4]&&gameBoard[4]===gameBoard[8]){gameEnd()}
            else if (gameBoard[0]===gameBoard[3]&&gameBoard[3]===gameBoard[6]){gameEnd()}
        }
        if (gameBoard[4] !== ''){
            if (gameBoard[1]===gameBoard[4]&&gameBoard[4]===gameBoard[7]){gameEnd()}
            else if (gameBoard[3]===gameBoard[4]&&gameBoard[4]===gameBoard[5]){gameEnd()}
            else if (gameBoard[2]===gameBoard[4]&&gameBoard[4]===gameBoard[6]){gameEnd()}
        }
        if (gameBoard[8] !== ''){
            if (gameBoard[2]===gameBoard[5]&&gameBoard[5]===gameBoard[8]){gameEnd()}
            else if (gameBoard[6]===gameBoard[7]&&gameBoard[7]===gameBoard[8]){gameEnd()}
        }
    }

    function gameEnd() {
        setTF([true,true,true,true,true,true,true,true,true]);
        message.success("Congradulations you won!!", 2);
    }

    function createTile (value, index) {
        return (
        <Button
        className="Tile"
        key={index}
        disabled={TF[index]}
        onClick={() => onClick(turn, index)}
        >{gameBoard[index]}</Button>
    )}

    function onClick(turn, index){
            let board = gameBoard;
            board[index] = turn;
            setGameBoard(board);
            let newTF = TF;
            newTF[index] = true;
            setTF(newTF);
            if (turn==='X')setTurn('O');
            else setTurn('X')
            checkBoard();
        
    }

    return (
        <div className="container">
            {gameBoard.map((value, index) => createTile(value, index))}
            <div className="container">
                <Button
                    className="reset-btn"
                    key="reset"
                    onClick={() => resetBoard()}
                >Reset</Button>
            </div>
        </div>
    )

}

export default Game;