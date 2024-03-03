import Board from "./boardFactory.js";

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = new Board();
    this.attacksDone = [];
    this.turn = false;
    this.lastAttackHit = false;
    this.hitCoordinates = [];
    this.lastHitCoordinate = null;
    this.nextAttackCoordinates = [];
  }

  playerAttack(coordinates, computerBoard) {
    if (!this.checkCoordinates(coordinates)) return;
    this.attacksDone.push(coordinates);
    return computerBoard.receiveAttack(coordinates);
  }

  computerAttack(playerBoard) {
    if (!this.lastAttackHit || !this.nextAttackCoordinates.length) {
      this.resetAttackStatus();
      const attack = this.randomComputerAttack(playerBoard);
      if (attack) return this.computerAttackHits();
    } else if (this.lastAttackHit && this.nextAttackCoordinates.length) {
      const coordinates = this.nextAttackCoordinates.shift();
      this.attacksDone.push(coordinates);
      const attack = playerBoard.receiveAttack(coordinates);
      if (attack) {
        return this.computerAttackHits();
      } else if (!attack && !this.nextAttackCoordinates.length) {
        this.resetAttackStatus()
        return false;
      }
    }
  }

  resetAttackStatus() {
    this.lastAttackHit = false;
    this.lastHitCoordinate = null;
    this.nextAttackCoordinates = [];
  }

  randomShipPlacement() {
    const ships = Object.values(this.board.ships);
    ships.forEach(ship => {
      const placement = this.randomPlacementCoordinates(ship);
      console.log(placement)
      return this.board.placeShips(ship.name, placement.coordinates, placement.direction);
    })
  }

  removeShipPlacement() {
    const ships = Object.values(this.board.ships);
    ships.forEach(ship => {
      ship.position = [];
    })
  }

  randomPlacementCoordinates(ship) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let direction = this.randomDirection()

    while (row + ship.length > 10 || col + ship.length > 10 || !this.board.shipPosition(ship, [row, col], direction)) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      direction = this.randomDirection()
    }

    return  { coordinates: [row, col], direction: direction }
  }

  randomComputerAttack(playerBoard) {
    const coordinates = this.randomCoordinates();
    this.attacksDone.push(coordinates);
    return playerBoard.receiveAttack(coordinates);
  }

  computerAttackHits() {
    this.lastAttackHit = true;
    this.hitCoordinates.push(this.attacksDone.at(-1));
    this.lastHitCoordinate = this.hitCoordinates.at(-1);
    const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    moves.forEach(move => {
      const newRow = move[0] + this.lastHitCoordinate[0];
      const newCol = move[1] + this.lastHitCoordinate[1];
      if (!this.checkCoordinates([newRow, newCol]) || (newRow < 0 || newCol < 0 || newRow > 9 || newCol > 9)) return;
      this.nextAttackCoordinates.push([newRow, newCol]);
    })

    if (this.hitCoordinates.length > 1) {
      if (this.lastHitCoordinate[0] === this.hitCoordinates.at(-2)[0] &&
      this.lastHitCoordinate[1] - this.hitCoordinates.at(-2)[1] <= 1) {
        this.nextAttackCoordinates = this.nextAttackCoordinates.filter(move => move[0] === this.lastHitCoordinate[0]);
      } else if (this.lastHitCoordinate[1] === this.hitCoordinates.at(-2)[1] &&
      this.lastHitCoordinate[0] - this.hitCoordinates.at(-2)[0] <= 1) {
        this.nextAttackCoordinates = this.nextAttackCoordinates.filter(move => move[1] === this.lastHitCoordinate[1]);
      }
    }
    return true;
  }

  changeTurn() {
    this.turn ? this.turn = false : this.turn = true;
  }

  randomCoordinates() {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (!this.checkCoordinates([row, col])) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }

    return [row, col];
  }

  checkCoordinates(coordinates) {
    const [row, col] = coordinates;
    for (let element of this.attacksDone) {
      if (element[0] === row && element[1] === col) return false;
    }
    return true;
  }

  randomDirection() {
    const direction = ['row', 'col'];
    const position = Math.floor(Math.random() * direction.length);
    return direction[position];
  }

  resetPlayer() {
    this.board = new Board();
    this.attacksDone = [];
    this.lastAttackHit = false;
    this.hitCoordinates = [];
    this.lastHitCoordinate = null;
    this.nextAttackCoordinates = [];
  }
}