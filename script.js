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
      .filter((row) => row[column].getValue() === 0)
      .map((row) => row[column]);

    if (!availableCells.length) return;
    const lowestRow = availableCells.length - 1;
    board[lowestRow][column].addToken(player);
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
  let value = 0;
  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function GameController(PlayerOne = "Yellow", PlayerTwo = "Red") {
  const board = GameBoard();
  const players = [
    { name: PlayerOne, token: 1 },
    { name: PlayerTwo, token: 2 },
  ];

  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (column) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column}`
    );
    board.dropToken(column, getActivePlayer().token);
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();
  return { playRound, getActivePlayer, getBoard: board.getBoard };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const message = document.querySelector(".message");

  const updateScreen = () => {
    boardDiv.textContent = "";
    message.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    message.textContent = `${activePlayer.name}'s turn.....`;

    //it will change the content inside cells
    function playerColor(cellValue) {
      if (cellValue === 1) {
        return "yellow";
      } else if (cellValue === 2) {
        return "red";
      }
      return "white";
    }

    board.forEach((row) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.column = index;
        //cellButton.textContent = cell.getValue();
        cellButton.style.backgroundColor = playerColor(cell.getValue());
        boardDiv.appendChild(cellButton);
      });
    });
  };
  function ClickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;

    if (!selectedColumn) return;
    game.playRound(selectedColumn);
    updateScreen();
  }

  boardDiv.addEventListener("click", ClickHandlerBoard);
  updateScreen();
}

ScreenController();
