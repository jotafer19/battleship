import Board from "./boardFactory.js";

describe('Board tests', () => {
  const board = new Board();
  board.addShip('carrier', 5, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]])

  test('Attack carrier', () => {
    board.receiveAttack([0, 0]);
    expect(board.board[0][0]).toBeTruthy();
  })

  test('Attack water', () => {
    board.receiveAttack([1, 5]);
    expect(board.board[1][5]).toBeFalsy();
  })

  test('Not all ships are sunk', () => {
    expect(board.allShipsSunk()).toBeFalsy();
  })
})