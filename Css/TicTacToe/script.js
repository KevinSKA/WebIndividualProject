// Simple 2-player Tic Tac Toe (X vs O)

document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("game-board");
  const statusElement = document.getElementById("game-status");
  const resetBtn = document.getElementById("reset-btn");

  const popupOverlay = document.getElementById("popup-overlay");
  const popupTitle = document.getElementById("popup-title");
  const popupMessage = document.getElementById("popup-message");
  const popupBtn = document.getElementById("popup-btn");

  // Game state
  let board = Array(9).fill(null);
  let currentPlayer = "X";
  let gameActive = true;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function createBoard() {
    boardElement.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleCellClick);
      boardElement.appendChild(cell);
    }
  }

  function handleCellClick(e) {
    const index = parseInt(e.target.dataset.index, 10);

    if (!gameActive) return;
    if (board[index] !== null) return; 

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("filled");

    if (checkWinner(currentPlayer)) {
      endGame(`Player ${currentPlayer} wins!`);
      return;
    }

    if (checkDraw()) {
      endGame("It's a draw!");
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }

  function checkWinner(player) {
    return winningCombos.some((combo) =>
      combo.every((index) => board[index] === player)
    );
  }

  function checkDraw() {
    return board.every((cell) => cell !== null);
  }

  function updateStatus() {
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }

  function endGame(message) {
    gameActive = false;
    popupTitle.textContent = "Game Over";
    popupMessage.textContent = message;
    popupOverlay.classList.add("show");
  }

  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    popupOverlay.classList.remove("show");
    createBoard();
    updateStatus();
  }

  // Buttons
  resetBtn.addEventListener("click", resetGame);
  popupBtn.addEventListener("click", resetGame);

  // Initial setup
  createBoard();
  updateStatus();
});
