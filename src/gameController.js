const gameController = (player, computer) => {

  const placePlayerShips = () => {
    player.randomShipPlacement();
  };

  const placeComputerShips = () => {
    computer.randomShipPlacement();
  };

  const checkAllShipsPlaced = () => {
    const ships = Object.values(player.board.ships);

    return ships.every(ship => ship.position.length !== 0)
  }

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
    return player.turn ? computer.board.allShipsSunk() : player.board.allShipsSunk();
  }

  const gameOver = () => {
    player.turn = false;
    computer.turn = false;
  }

  return { 
    placePlayerShips,
    placeComputerShips,
    checkAllShipsPlaced,
    firstTurn,
    changeTurns,
    getClickedCell,
    isHit,
    checkWinner,
    gameOver
   };
};

export default gameController
