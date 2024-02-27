import Ship from "./shipFactory.js";

export default class Board {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = {
      carrier: new Ship("carrier", 5),
      battleship: new Ship("battleship", 4),
      destroyer: new Ship("destroyer", 3),
      submarine: new Ship("submarine", 2),
      patrolBoat: new Ship("patrolBoat", 1),
    };
  }

  placeShips(shipName, coordinates, direction) {
    const ship = this.ships[shipName];

    if (!this.shipPosition(ship, coordinates, direction)) return false;

    this.placeShipTiles(ship);
    this.placeWaterTiles(ship);
    return true;
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;

    if (this.board[row][col] === "X" || this.board[row][col] === "O") return false;

    if (!this.board[row][col] || this.board[row][col] === "water") {
      this.board[row][col] = "O";
      return false;
    }

    const ship = this.ships[this.board[row][col]];
    this.board[row][col] = "X";
    ship.getHit();
    return true;
  }

  allShipsSunk() {
    return Object.values(this.ships).every(ship => ship.sunk);
  }

  shipPosition(ship, coordinates, direction) {
    const possiblePositions = [];
    const [row, col] = coordinates;

    if (direction === 'row') {
      for (let i = col; i < col + ship.length; i++) possiblePositions.push([row, i]);
    } else if (direction === 'col') {
      for (let i = row; i < row + ship.length; i++) possiblePositions.push([i, col]);
    }

    ship.position = possiblePositions;
    return possiblePositions.every(position => this.isValid(position));
  }

  isValid(coordinates) {
    const [row, col] = coordinates;

    if ((row < 0 || col < 0 || row > 9 || col > 9) || this.board[row][col]) return false;

    return true;
  }

  placeShipTiles(ship) {
    ship.position.forEach(coordinates => {
      const [row, col] = coordinates;
      this.board[row][col] = ship.name;
    })
  }

  placeWaterTiles(ship) {
    const possibleWaterTiles = [];

    ship.position.forEach(coordinates => {
      const [row, col] = coordinates;
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if ((i !== row || j !== col) && (i >= 0 && j >= 0 && i < 10 && j < 10)) possibleWaterTiles.push([i, j]);
        }
      }
    })

    possibleWaterTiles.forEach(coordinates => {
      const [row, col] = coordinates;
      if (!this.board[row][col]) this.board[row][col] = "water";
    })
  }

  printBoard() {
    this.board.forEach((row) => {
      console.log(row);
    });
  }
}
