const gameController = (player, computer) => {
  const playerBoard = player.board;
  const computerBoard = computer.board;

  const placePlayerShips = () => {
    player.randomShipPlacement();
  };

  const placeComputerShips = () => {
    computer.randomShipPlacement();
  };

  const firstTurn = () => {
    player.turn = true;
    computer.turn = false;
  }

  const changeTurns = () => {
    player.changeTurn();
    computer.changeTurn();
  }

  const getClickedCell = (event) => {
      const row = parseInt(event.target.dataset.row)
      const col = parseInt(event.target.dataset.col);
      
      return [row, col];
  };

  const isHit = (attack) => {
    return attack;
  }

  const checkWinner = () => {
    return player.turn ? computerBoard.allShipsSunk() : playerBoard.allShipsSunk();
  }

  const gameOver = () => {
    player.turn = false;
    computer.turn = false;
  }

  return { 
    placePlayerShips,
    placeComputerShips,
    firstTurn,
    changeTurns,
    getClickedCell,
    isHit,
    checkWinner,
    gameOver
   };
};

export default gameController
