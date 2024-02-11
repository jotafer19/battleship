/* eslint-disable no-undef */
import Ship from "./shipFactory";


describe("Ship tests", () => {
  const testShip = new Ship('carrier', 5);

  test("Check ship number of hits", () => {
    expect(testShip.hits).toBe(0);
  });

  test("Ship got hit", () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });

  test("Ship is sunk", () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.sunk).toBeTruthy();
  });
});
