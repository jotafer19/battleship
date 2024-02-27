import Board from "./boardFactory.js";

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = new Board();
    this.attacksDone = [];
    this.turn = false;
  }

  playerAttack(coordinates, computerBoard) {
    if (!this.checkCoordinates(coordinates)) return;
    this.attacksDone.push(coordinates);
    return computerBoard.receiveAttack(coordinates);
  }

  computerAttack(playerBoard) {
    const coordinates = this.randomCoordinates();
    this.attacksDone.push(coordinates);
    return playerBoard.receiveAttack(coordinates);
  }

  randomCoordinates() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (!this.checkCoordinates([x, y])) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    return [x, y];
  }

  checkCoordinates(coordinates) {
    const [row, col] = coordinates;

    for (let element of this.attacksDone) {
      if (element[0] === row && element[1] === col) return false;
    }

    return true;
  }
}
