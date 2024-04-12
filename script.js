function GameBoard() {
  const board = [];
  const rows = 6;
  const cols = 7;

  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < cols; j++) {
      board[i].push("0");
    }
  }

  const getBoard = () => board;

  return { getBoard };
}

const game = GameBoard();

console.log(game.getBoard());
