export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.position = [];
    this.hits = 0;
    this.sunk = false;
  }

  getHit() {
    this.hits += 1;
    this.isSunk();
  }

  isSunk() {
    this.sunk = this.hits >= this.length;
  }
}
