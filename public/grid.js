export default class Grid {
  constructor() {
    this.board = Array(9).fill("");
  }

  static checkWin = (board) => {
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
}
