let currentPlayer = "X";
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
const cells = document.querySelectorAll("td");
const messageBox = document.querySelector("#message-box");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.innerHTML === "") {
      cell.innerHTML = currentPlayer;
      const [row, col] = cell.id.split("-");
      board[row][col] = currentPlayer;
      if (checkWin()) {
        messageBox.innerHTML = `${currentPlayer} ganhou!`;
        messageBox.classList.add("win-message");
        resetGame();
      } else if (checkTie()) {
        messageBox.innerHTML = "Empate!";
        messageBox.classList.add("tie-message");
        resetGame();
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

function checkWin() {
  // horizontal
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === currentPlayer &&
        board[row][1] === currentPlayer &&
        board[row][2] === currentPlayer) {
      return true;
    }
  }
  // vertical
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === currentPlayer &&
        board[1][col] === currentPlayer &&
        board[2][col] === currentPlayer) {
      return true;
    }
  }
  // diagonal
  if (board[0][0] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][2] === currentPlayer) {
    return true;
  }
  if (board[0][2] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][0] === currentPlayer) {
    return true;
  }
  return false;
}
function checkTie() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") {
        return false;
      }
    }
  }
  return true;
}
function resetGame() {
  cells.forEach(cell => {
    cell.innerHTML = "";
  });
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      board[rowIndex][colIndex] = "";
    });
  });
  currentPlayer = "X";
}
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGame);