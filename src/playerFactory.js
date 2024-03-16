import Board from "./boardFactory.js";

export { Player, Computer }

class Player {
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

class Computer extends Player {
  constructor(name) {
    super(name)
    this.allAttacksDone = [];
    this.attackHit = false;
    this.allHitAttacks = [];
    this.nextAttack = [];
  }

  isAttackAlreadyDone(coordinates) {
    const [row, col] = coordinates;

    for (let attack of this.allAttacksDone) {
      if (attack[0] === row && attack[1] === col) return true;
    }
    return false;
  }

  randomCoordinates() {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (this.isAttackAlreadyDone([row, col])) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }

    return [row, col];
  }

  computerAttacks() {
    if (!this.attackHit || !this.nextAttack.length) {
      this.resetAttackStatus()
      const isHit = this.randomComputerAttack();
      if (isHit) {
        return this.computerHits()
      } else if (!isHit) {
        return false;
      }
    } else if (this.attackHit && this.nextAttack.length) {
      const coordinates = this.nextAttack.shift();
      this.allAttacksDone.push(coordinates)
      const isHit = this.enemyBoard.receiveAttack(coordinates);
      if (isHit) {
        return this.computerHits()
      } else if (!isHit && !this.nextAttack.length) {
        this.resetAttackStatus()
        return false;
      }
    }
  }

  randomComputerAttack() {
    const coordinates = this.randomCoordinates();
    this.allAttacksDone.push(coordinates);
    return this.enemyBoard.receiveAttack(coordinates);
  }

  computerHits() {
    this.attackHit = true;
    this.allHitAttacks.push(this.allAttacksDone.at(-1));
    const lastHit = this.allHitAttacks.at(-1);
    const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    moves.forEach(move => {
      const newRow = move[0] + lastHit[0];
      const newCol = move[1] + lastHit[1];
      if (this.isAttackAlreadyDone([newRow, newCol]) || (newRow < 0 || newCol < 0 || newRow > 9 || newCol > 9)) return;
      this.nextAttack.push([newRow, newCol]);
    })

    if (this.allHitAttacks.length > 1) {
      const previousHit = this.allHitAttacks.at(-2);
      if (lastHit[0] === previousHit[0]) {
        this.nextAttack = this.nextAttack.filter(move => move[0] === lastHit[0]);
      } else if (lastHit[1] === previousHit[1]) {
        this.nextAttack = this.nextAttack.filter(move => move[1] === lastHit[1]);
      }
    }
    return true;
  }

  resetAttackStatus() {
    this.attackHit = false;
    this.allHitAttacks = [];
    this.nextAttack = [];
  }

  getLastCoordinates() {
    return this.allAttacksDone.at(-1);
  }
}