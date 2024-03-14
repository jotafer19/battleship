export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.position = [];
    this.totalHits = 0;
    this.sunk = false;
  }

  getHit() {
    this.totalHits += 1;
    this.isSunk();
  }

  isSunk() {
    this.sunk = this.totalHits >= this.length;
  }
}
