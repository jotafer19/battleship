import Ship from './shipFactory.js';

export default class Board {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array.from({length: 10 }).fill(null));
    this.ships = {};
  }

  addShip(shipName, shipLength, coordinates) {
    const newShip = new Ship(shipName, shipLength);
    this.ships[shipName] = newShip;
    coordinates.forEach(coordinate => {
      const [row, col] = coordinate;
      this.board[row][col] = newShip;
    })
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;

    if (!this.board[row][col]) {
      return false;
    } else {
      const ship = this.board[row][col];
      ship.getHit();
      return true;
    }
  }

  getShips() {
    return Object.values(this.ships);
  }

  allShipsSunk() {
    const allShips = this.getShips();
    return allShips.every(ship => ship.sunk);
  }

  resetBoard() {
    this.board = Array.from({ length: 10 }, () => Array.from({length: 10 }).fill(null));
    this.ships = {};
  }
}