
class Board {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array.from({length: 10 }).fill(null));
  }
}

console.log(new Board())