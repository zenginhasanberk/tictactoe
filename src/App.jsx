import { useState } from "react";
import "./css/Board.css";

function App() {
  const [xTurn, setxTurn] = useState(true);
  const [clicked, setClicked] = useState(new Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [winnerName, setWinnerName] = useState(null);

  let tiles = [];

  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      tiles.push(
        <div
          key={i * 3 + j}
          onClick={() => clickSquare(i * 3 + j)}
          className="tile"
        ></div>
      );
    }
  }

  const clickSquare = (key) => {
    if (clicked[key] == "X" || clicked[key] == "O" || gameOver) return;

    if (xTurn) {
      event.target.innerHTML = "X";
    } else {
      event.target.innerHTML = "O";
    }
    setxTurn(!xTurn);

    const newClicked = [...clicked];
    if (xTurn) {
      newClicked[key] = "X";
    } else {
      newClicked[key] = "O";
    }

    setClicked(newClicked);
    checkForWinner(newClicked);
  };

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkForWinner(clicked) {
    for (let i = 0; i < winningConditions.length; ++i) {
      const [a, b, c] = winningConditions[i];
      if (clicked[a] && clicked[a] == clicked[b] && clicked[b] == clicked[c]) {
        setGameOver(true);
        setWinnerName(clicked[a]);
      }
    }
  }

  // TODO: Implement
  //   function restartGame() {
  //     setxTurn(true);
  //     setClicked(new Array(9).fill(null));
  //     setGameOver(false);
  //     setWinnerName(null);

  //     for (let i = 0; i < clicked.length; ++i) {
  //       const newTiles = [];

  //       for (let i = 0; i < 3; ++i) {
  //         for (let j = 0; j < 3; ++j) {
  //           newTiles.push(
  //             <div
  //               key={i * 3 + j}
  //               onClick={() => clickSquare(i * 3 + j)}
  //               className="tile"
  //             ></div>
  //           );
  //         }
  //       }
  //     }

  //   }

  return (
    <div className="container">
      {gameOver ? (
        <h1>{winnerName} wins!</h1>
      ) : (
        <h1>It&apos;s {xTurn ? <span>X</span> : <span>O</span>} turn </h1>
      )}
      <div className="board">{tiles}</div>
      {/* TODO IMPLEMENT Clear game <h1 onClick={restartGame}>Clear</h1> */}
    </div>
  );
}

export default App;
