const DOM = (player, computer) => {
  const playerBoard = player.getBoard();
  const computerBoard = computer.getBoard();

  const createBoards = () => {
    const playerBoard = document.querySelector(".player.board");
    const computerBoard = document.querySelector(".computer.board");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const playerCell = document.createElement("div");
        playerCell.classList.add("cell");
        playerCell.dataset.row = i;
        playerCell.dataset.col = j;
        playerBoard.appendChild(playerCell);

        const computerCell = document.createElement("div");
        computerCell.classList.add("cell");
        computerCell.dataset.row = i;
        computerCell.dataset.col = j;
        computerBoard.appendChild(computerCell);
      }
    }
  };

  const displayPlayerShips = () => {
    let shipPositions = [];
    
    Object.values(playerBoard.ships).forEach(ship => {
      shipPositions = shipPositions.concat(ship.position);
    })

    shipPositions.forEach(coordinates => {
      const [x, y] = coordinates;
      const cell = document.querySelector(`.player .cell[data-row="${x}"][data-col="${y}"]`);
      cell.classList.add('ship');
    })
  }

  const displayMove = () => {
    let attackedCell;
    let displayCell;

    if (player.getTurn()) {
      const [x, y] = player.attacksDone.at(-1);
      attackedCell = computerBoard.board[x][y];
      displayCell = document.querySelector(`.computer .cell[data-row="${x}"][data-col="${y}"]`);
    } else if (computer.getTurn()) {
      const [x, y] = computer.attacksDone.at(-1);
      attackedCell = playerBoard.board[x][y];
      displayCell = document.querySelector(`.player .cell[data-row="${x}"][data-col="${y}"]`);
    }

    (attackedCell === "X") ? displayCell.classList.add('hit') : displayCell.classList.add('miss');
  }

  return {
    createBoards,
    displayPlayerShips,
    displayMove,
  };
};

export default DOM;