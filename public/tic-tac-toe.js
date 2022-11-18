const markCell = (event) => {
  let square = event.target;
  // get content of cell if its already populated
  let divContent = square.textContent;

  // only let it mark if its not populated
  if (divContent === "") {
    event.target.textContent = playerTurn;
    // grab the data attribute from cell and use as index for the board array
    let idx = square.dataset.boxnum;
    board[idx] = playerTurn;

    let gameDecision = checkWin();

    if (gameDecision) {
      removeGridListeners();
      displayGameDecison(gameDecision);
      return;
    }

    // turn will be alternate to each if they mark a cell successfully
    playerTurn = playerTurn === PLAYER_TURN ? COMPUTER_TURN : PLAYER_TURN;
  }
};

const displayGameDecison = (decision) => {
  // const h2Element = document.getElementsByTagName("h2");
  if (decision === "T") {
    h2Element.textContent = "Winner: None!";
  } else {
    h2Element.textContent = `Winner: ${decision}`;
  }
  h2Element.style.visibility = "visible";
};

const checkWin = () => {
  let playerWon = undefined;
  let roundWon = false;

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

  for (let i = 0; i < winningConditions.length; i++) {
    const winCombo = winningConditions[i];
    let a = board[winCombo[0]];
    let b = board[winCombo[1]];
    let c = board[winCombo[2]];

    if (a === "" || b === "" || c === "") continue;
    if (a === b && b === c) {
      roundWon = true;
      playerWon = a;
      break;
    }
  }

  if (roundWon) return playerWon;

  let roundDraw = !board.includes("");
  if (roundDraw) return "T";
  return false;
};

const removeGridListeners = () => {
  const squares = document.querySelectorAll(".box");
  squares.forEach((square) => {
    square.removeEventListener("click", markCell);
  });
};

const PLAYER_TURN = "X";
const COMPUTER_TURN = "O";
let playerTurn = PLAYER_TURN;
const board = Array(9).fill("");

const section = document.getElementById("main-section");

for (let i = 0; i < board.length; i++) {
  const square = document.createElement("div");
  square.classList.add("box");
  square.setAttribute("data-boxnum", i);
  section.appendChild(square);
  square.addEventListener("click", markCell);
}

const h2Element = document.getElementById("winner-heading");
h2Element.style.visibility = "hidden";
