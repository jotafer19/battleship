import Board from "./boardFactory";

describe('Board tests', () => {
  const board = new Board();

  test('Invalid coordinates', () => {
    expect(board.placeShips('carrier', [10, 10], "row")).toBeFalsy();
  })

  test('Valid coordinates', () => {
    expect(board.placeShips('carrier', [0, 0], "row")).toBeTruthy();
  })

  test('Place a ship in an already used cell', () => {
    expect(board.placeShips('battleship', [1, 5], "row")).toBeFalsy();
  })

  test('Attack carrier', () => {
    board.receiveAttack([0, 0]);
    expect(board.board[0][0]).toBe('X');
  })

  test('Attack water', () => {
    board.receiveAttack([1, 5]);
    expect(board.board[1][5]).toBe("O");
  })

  test('Attack nothing', () => {
    board.receiveAttack([9, 9]);
    expect(board.board[9][9]).toBe("O");
  })

  test('Not all ships are sunk', () => {
    expect(board.allShipsSunk()).toBeFalsy();
  })
})