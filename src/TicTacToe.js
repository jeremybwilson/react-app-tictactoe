import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import './TicTacToe.css';

function TicTacToe() {
  return (
    <div className="TicTacToe">
      <header className="TicTacToe-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Square /> */}
        <Board />
      </header>
    </div>
  );
}

export default TicTacToe;

// square
  // value (prop)
  // onclick function (prop)
function Square(props) {
  return (
    <div>
      <button className="square" onClick={props.onClick}>
      {props.value}
      </button>
    </div>
  );
}

// board
function Board() {
  // state
    // boardState
    const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
    // turnState
    const [xIsNext, setXIsNext] = useState(true);
  // handleClick
  const handleClick = index => {
    // copy of our board state
    const squares = [...boardSquares];
    // if the index of the array of the board is filled, return
    if (calculateWinner(boardSquares) || squares[index]) return
    // mutate that copy, and add X or O
    squares[index] = xIsNext ? "X" : "O";
    // calculate next turn
    // set the state of the board
    setBoardSquares(squares);
    // set the state of the turn
    setXIsNext(!xIsNext);
  };
  // create our board
  
  // create a render square function
  const renderSquare = index => {
    // take in an index
    return (
      // return a square, with the correct value and function
      <Square value={boardSquares[index]} onClick={() => handleClick(index)}/>
    );
  };
  
  // initialize status
  let status;
  const winner = calculateWinner(boardSquares);
  
  status = winner 
    ? `Winner is: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;
    // this needs to take in an index
      // return a square, with the correct value and function
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

// function that calculates the winner
function calculateWinner(squares){
  // how to we store the winning line combinations
  const winningLines = [
    [0, 1, 2],
    [3, 5, 6],
    [7, 8, 9],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // loop through this set
  for(let i =0; i < winningLines.length; i++){
    // check to see if values in our squares
    const [a, b, c] = winningLines[i];
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
      // if so, return winner (X or O)
      return squares[a];
    }
  }
  // else, return nothing
  return null;
}