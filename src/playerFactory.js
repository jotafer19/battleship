import Board from "./boardFactory.js";

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = new Board();
    this.enemyBoard = null;
    this.turn = false;
  }

  setEnemyBoard(enemyBoard) {
    this.enemyBoard = enemyBoard;
  }

  getBoard() {
    return this.board;
  }
  
  addShip(shipName, shipLength, coordinates) {
    this.board.addShip(shipName, shipLength, coordinates);
  }

  playerAttack(coordinates) {
    return this.enemyBoard.receiveAttack(coordinates);
  }

  checkGameOver() {
    return this.enemyBoard.allShipsSunk();
  }

  reset() {
    this.board.resetBoard();
  }
}