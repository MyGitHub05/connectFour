function GameBoard() {
  const board = [];
  const rows = 6;
  const cols = 7;

  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (column, player) => {
    const availableCells = board
      .filter((row) => row[column] === "0")
      .map((row) => row[column]);

    if (!availableCells.length) return;
    const lowestRow = availableCells.length - 1;
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );

    console.log(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
}

function Cell() {
  let value = "0";
  const addToken = (player) => (value = player);

  const getValue = () => value;

  return { addToken, getValue };
}

function GameController(PlayerOne = "Yellow", PlayerTwo = "Red") {
  const board = GameBoard();
  const Players = [
    { name: PlayerOne, token: 1 },
    { name: PlayerTwo, token: 2 },
  ];

  let activePlayer = Players[0];
  const switchPlayerTurn = () =>
    (activePlayer = activePlayer === Players[0] ? Players[1] : Players[0]);

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (column) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column}`
    );
    board.dropToken(column, getActivePlayer().name);
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();
  return { playRound, getActivePlayer };
}

const game = GameBoard();
