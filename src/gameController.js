const gameController = (player, computer) => {
  const playerBoard = player.board;
  const computerBoard = computer.board;

  const placePlayerShips = () => {
    playerBoard.placeShips("carrier", [0, 0], 'row');
    playerBoard.placeShips("battleship", [9, 3], 'row');
    playerBoard.placeShips("destroyer", [4, 7], 'row');
    playerBoard.placeShips("submarine", [2, 1], 'row');
    playerBoard.placeShips("patrolBoat", [8, 0], 'row');
  };

  const placeComputerShips = () => {
    computerBoard.placeShips("carrier", [7, 3], 'row');
    computerBoard.placeShips("battleship", [2, 0], 'row');
    computerBoard.placeShips("destroyer", [0, 1], 'row');
    computerBoard.placeShips("submarine", [3, 7], 'row');
    computerBoard.placeShips("patrolBoat", [5, 0], 'row');
  };

  const firstTurn = () => {
    player.turn = true;
    computer.turn = false;
  }

  const changeTurns = () => {
    player.changeTurn();
    computer.changeTurn();
  }

  const checkWinner = () => {
    (player.turn) ? computerBoard.allShipsSunk() : playerBoard.allShipsSunk();
  };

  const getClickedCell = (event) => {
      const row = parseInt(event.target.dataset.row)
      const col = parseInt(event.target.dataset.col);
      
      return [row, col];
  };

  return { 
    placePlayerShips,
    placeComputerShips,
    getClickedCell,
    firstTurn,
    changeTurns,
    checkWinner
   };
};

export default gameController
