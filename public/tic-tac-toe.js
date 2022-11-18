import Grid from "./grid.js";

const markCell = (event) => {
  let square = event.target;
  let idx = square.dataset.boxnum;
  // if grid cell/index has already been marked, don't remark it
  if (grid.board[idx] !== "") return;

  // if grid cell/index is empty, mark it and check game progress
  grid.board[idx] = playerTurn;
  square.textContent = playerTurn;

  gameOver = Grid.checkWin(grid.board);

  if (!gameOver) {
    // turn will be alternate to each if they mark a cell successfully
    playerTurn = playerTurn === PLAYER_TURN ? COMPUTER_TURN : PLAYER_TURN;
  } else {
    // remove click listeners on board cells
    removeGridListeners();
    displayGameDecison(gameOver);
  }
};

const displayGameDecison = (decision) => {
  const h2Element = document.getElementById("winner-heading");

  if (decision === "T") {
    h2Element.textContent = "Winner: None!";
  } else {
    h2Element.textContent = `Winner: ${decision}`;
  }
  h2Element.style.visibility = "visible";

  const newGameButton = document.getElementById("new-game");
  newGameButton.style.opacity = null;
  newGameButton.style.cursor = "pointer";
  newGameButton.addEventListener("click", cleanup);
};

const removeGridListeners = () => {
  const squares = document.querySelectorAll(".box");
  squares.forEach((square) => {
    square.removeEventListener("click", markCell);
  });
};

const cleanup = () => {
  const section = document.getElementById("main-section");
  const squares = document.querySelectorAll(".box");

  squares.forEach((child) => section.removeChild(child));

  initializeGame();
};

const initializeGame = () => {
  grid = new Grid();
  const section = document.getElementById("main-section");

  for (let i = 0; i < grid.board.length; i++) {
    const square = document.createElement("div");
    square.classList.add("box");
    square.setAttribute("data-boxnum", i);
    section.appendChild(square);
    square.addEventListener("click", markCell);
  }

  const h2Element = document.getElementById("winner-heading");
  h2Element.style.visibility = "hidden";

  const newGameButton = document.getElementById("new-game");
  newGameButton.style.opacity = 0.6;
  newGameButton.style.cursor = "not-allowed";
  newGameButton.removeEventListener("click", cleanup);
};

let grid;
const PLAYER_TURN = "X";
const COMPUTER_TURN = "O";
let playerTurn = PLAYER_TURN;
let gameOver = false;

initializeGame();
