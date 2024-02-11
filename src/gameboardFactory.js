import Ship from "./shipFactory.js";

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = {
      carrier: new Ship("carrier", 5),
      battleship: new Ship("battleship", 4),
      destroyer: new Ship("destroyer", 3),
      submarine: new Ship("submarine", 2),
      patrolBoat: new Ship("patrol boat", 1),
    };
  }

  isValid(xCor, yCor, ship) {
    if (xCor < 0 || xCor > 9 || yCor < 0 || yCor > 9) return false;

    if (yCor + ship.length - 1 > 9) return false;

    return true;
  }

  placeShip(shipName, coordinates) {
    const ship = this.ships[shipName];

    if (!this.isValid(coordinates[0], coordinates[1], ship)) return false;

    const endColumn = coordinates[1] + ship.length - 1;

    for (let i = coordinates[1]; i <= endColumn; i++) {
        if (this.board[coordinates[0]][i]) return false;
    }

    for (let i = coordinates[1]; i <= endColumn; i++) {
        this.board[coordinates[0]][i] = ship;
    }
  }

  receiveAttack(coordinates) {
    const boardCell = this.board[coordinates[0]][coordinates[1]];
    if (boardCell === "X") {
      // coordinate already attacked
      return false;
    } 
    
    if (!boardCell) {
      // missed attack;
      this.board[coordinates[0]][coordinates[1]] = "X";
    } else {
      this.board[coordinates[0]][coordinates[1]].hit();
    }

    return true;
  }

  checkGameOver() {
    return Object.values(this.ships).every(ship => ship.sunk === true);
  }

  printGameboard() {
    this.board.forEach(row => {
      console.log(row)
    })
  }
}