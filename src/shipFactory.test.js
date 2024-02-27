import Ship from "./shipFactory";

describe('Ship tests', () => {
  const ship = new Ship('destroyer', 3);

  test('Check ship status', () => {
    expect(ship.sunk).toBeFalsy();
  })

  test('Check ship getting hit', () => {
    ship.getHit();
    expect(ship.hits).toBe(1);
  })

  test('Check ship is sunk', () => {
    ship.getHit();
    ship.getHit();
    expect(ship.sunk).toBeTruthy();
  })
})