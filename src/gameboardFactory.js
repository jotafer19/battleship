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

  placeShip(shipName, coordinates) {
    const ship = this.ships[shipName];

    if (coordinates[0] > 9 || coordinates[1] > 9) {
      throw new Error("Coordinates out of range.");
    }

    if (coordinates[1] + ship.length - 1 > 9) {
      throw new Error("Ship length exceeds board column length.");
    }

    const endColumn = coordinates[1] + ship.length - 1;

    for (let i = coordinates[1]; i <= endColumn; i++) {
        if (this.board[coordinates[0]][i]) {
            throw new Error("A ship is already in that position!");
        }
    }

    for (let i = coordinates[1]; i <= endColumn; i++) {
        this.board[coordinates[0]][i] = ship.name;
    }
  }

  receiveAttack(coordinates) {
    const boardCell = this.board[coordinates[0]][coordinates[1]];
    if (!boardCell) {
        this.board[coordinates[0]][coordinates[1]] = 'X';
    } else if (boardCell === "X") {
        throw new Error('Space already hit!')
    } else {
        const ship = this.ships[boardCell];
        ship.hit();
        return 'HIT'
    }

    return this.board[coordinates[0]][coordinates[1]];
  }

  checkGameOver() {
    return Object.values(this.ships).every(ship => ship.sunk === true);
  }
}
