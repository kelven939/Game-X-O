document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const message = document.querySelector('.message');
  let currentPlayer = 'X';
  let gameOver = false;
  const cells = Array.from({ length: 9 });

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }

    return null;
  }

  function checkDraw() {
    return cells.every(cell => cell);
  }

  function endGame(result) {
    gameOver = true;
    message.textContent = result ? `${result} venceu!` : 'Empate!';
  }

  function handleClick(index) {
    if (gameOver || cells[index]) return;

    cells[index] = currentPlayer;
    renderBoard();

    const winner = checkWinner();
    if (winner) {
      endGame(winner);
    } else if (checkDraw()) {
      endGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      // Se o modo for cpu e for a vez da CPU jogar
      if (mode === 'cpu' && currentPlayer === 'O') {
        makeCPUMove();
      }
    }
  }

  function renderBoard() {
    board.innerHTML = '';
    cells.forEach((value, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = value;
      cell.addEventListener('click', () => handleClick(index));
      board.appendChild(cell);
    });
  }

  function restartGame() {
    cells.fill(undefined);
    currentPlayer = 'X';
    gameOver = false;
    renderBoard();
    message.textContent = '';
    if (mode === 'cpu' && currentPlayer === 'O') {
      makeCPUMove();
    }
  }

  const restartButton = document.getElementById('restartButton');
  restartButton.addEventListener('click', restartGame);

  let mode = 'multiplayer'; // Pode ser 'multiplayer' ou 'cpu'

  function updateMode(newMode) {
    mode = newMode;
    restartGame();
  }

  // eventos aos botões de modo
  const multiplayerButton = document.getElementById('multiplayerButton');
  const cpuButton = document.getElementById('cpuButton');

  multiplayerButton.addEventListener('click', () => updateMode('multiplayer'));
  cpuButton.addEventListener('click', () => updateMode('cpu'));

  // Função para fazer a jogada da CPU
  function makeCPUMove() {
    const emptyCells = cells.reduce((acc, val, index) => (val === undefined ? [...acc, index] : acc), []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cpuMove = emptyCells[randomIndex];

    // jogada da CPU após um pequeno atraso
    setTimeout(() => {
      handleClick(cpuMove);
    }, 500);
  }
  renderBoard();
});