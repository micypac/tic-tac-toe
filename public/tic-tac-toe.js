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
    // if game is not over, use localStorage to store game data
    setStorage();
  } else {
    // remove click listeners on board cells
    removeGridListeners();
    displayGameDecison(gameOver);
  }
};

const setStorage = () => {
  // store game data on local storage
  localStorage.setItem("player", playerTurn);
  localStorage.setItem("gameOver", gameOver);
  localStorage.setItem("board", JSON.stringify(grid.board));
};

const displayGameDecison = (decision) => {
  const h2Element = document.getElementById("winner-heading");

  if (decision === "T") {
    h2Element.textContent = "Winner: None!";
  } else {
    h2Element.textContent = `Winner: ${decision}`;
  }

  // show h2 element with who won the game
  h2Element.style.visibility = "visible";

  // enable "new game" button when game is over
  const newGameButton = document.getElementById("new-game");
  newGameButton.style.opacity = null;
  newGameButton.style.cursor = "pointer";
  newGameButton.addEventListener("click", cleanup);

  // disable "give up" button when game is over
  const giveUpButton = document.getElementById("give-up");
  giveUpButton.style.opacity = 0.6;
  giveUpButton.style.cursor = "not-allowed";
  giveUpButton.removeEventListener("click", surrenderGame);
};

const removeGridListeners = () => {
  const squares = document.querySelectorAll(".box");
  squares.forEach((square) => {
    square.removeEventListener("click", markCell);
  });
};

const cleanup = () => {
  // when "new game" button is click, clear local storage and each cells on the board
  localStorage.clear();
  const section = document.getElementById("main-section");
  const squares = document.querySelectorAll(".box");

  squares.forEach((child) => section.removeChild(child));

  initializeGame();
};

const surrenderGame = () => {
  // when "give up" button is clicked, other player automatically wins
  playerTurn = playerTurn === PLAYER_TURN ? COMPUTER_TURN : PLAYER_TURN;
  removeGridListeners();
  displayGameDecison(playerTurn);
};

const makeBoardCells = () => {
  const section = document.getElementById("main-section");

  // create board cells and if it has text content based on grid.board indeces
  for (let i = 0; i < grid.board.length; i++) {
    const square = document.createElement("div");
    if (grid.board[i] !== "") {
      square.textContent = grid.board[i];
    }
    square.classList.add("box");
    square.setAttribute("data-boxnum", i);
    section.appendChild(square);
    square.addEventListener("click", markCell);
  }
};

const initializeGame = () => {
  grid = new Grid();

  if (localStorage.length > 0) {
    let storageGrid = localStorage.getItem("board");
    let storageGameOver = localStorage.getItem("gameOver");
    let storagePlayer = localStorage.getItem("player");

    grid.board = JSON.parse(storageGrid);
    gameOver = Boolean(storageGameOver);
    playerTurn = storagePlayer;
  }

  makeBoardCells();

  const h2Element = document.getElementById("winner-heading");
  h2Element.style.visibility = "hidden";

  const newGameButton = document.getElementById("new-game");
  newGameButton.style.opacity = 0.6;
  newGameButton.style.cursor = "not-allowed";
  newGameButton.removeEventListener("click", cleanup);

  const giveUpButton = document.getElementById("give-up");
  giveUpButton.style.opacity = null;
  giveUpButton.style.cursor = "pointer";
  giveUpButton.addEventListener("click", surrenderGame);
};

const PLAYER_TURN = "X";
const COMPUTER_TURN = "O";
let playerTurn = PLAYER_TURN;
let grid;
let gameOver = false;

initializeGame();
