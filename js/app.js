/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie; 


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.getElementsByClassName("sqr");
const messageEl = document.getElementById("message");
const resetEl = document.getElementById("reset");


/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false; 
  render();
}

const render = () => {
  updateBoard();
  updateMessage();
}

const updateBoard = () => {
  board.forEach((squareValue, index) => {
    const square = squareEls[index]
    square.innerText = squareValue
  })
}

const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.innerText = "Player Turn: " + turn;
  } else if (winner === false && tie === true) {
    messageEl.innerText = "It's a tie!!!"
  } else {
    messageEl.innerText = "Congrats player " + turn;
  }
}

const handleClick = (event) => {
  const squareIndex = event.target.id;
  const value = board[squareIndex];
  if (value === "X" || value === "O") {
    console.log("This square is already taken");
    return;
  }

  if (winner === true) {
    console.log("You can't play while there's a winner!");
    return
  }

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

const placePiece = (index) => {
  board[index] = turn;
  console.log(board);
} 

const checkForWinner = () => {
  winningCombos.forEach(combo => {
    const firstIndex = combo[0];
    const secondIndex = combo[1];
    const thirdIndex = combo[2];

    const firstValue = board[firstIndex];
    const secondValue = board[secondIndex];
    const thirdValue = board[thirdIndex];

    if (
        firstValue !== '' &&
        firstValue === secondValue &&
        firstValue === thirdValue
      ) {
        winner = true;
        console.log("We have a winner!!");
      }
  })
}

const checkForTie = () => {
  if (winner === true) {
    return;
  }

  const hasEmptyValues = board.some(value => value === '');

  if (hasEmptyValues === true) {
    tie = false;
  } else {
    tie = true;
  }

  console.log("Check for tie: " + tie);

}

const switchPlayerTurn = () => {
  if (winner === true) {
    return;
  }

  if (turn === "X") {
    turn = "O"
  } else {
    turn = "X"
  }

  console.log("Changed turn to " + turn);
}

init();


/*----------------------------- Event Listeners -----------------------------*/
for (const element of squareEls) {
  element.addEventListener("click", (event) => {
    handleClick(event);
  });
}

resetEl.addEventListener("click", (e) => {
  init();
});

