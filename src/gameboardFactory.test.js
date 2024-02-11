import Gameboard from "./gameboardFactory";

describe('Test gameboard class', () => {
    const gameboard = new Gameboard();

    test('Invalid coordinates', () => {
        expect(gameboard.placeShip('carrier', [10, 10])).toBeFalsy();
    })

    test('Place a ship in an invalid position', () => {
        expect(gameboard.placeShip('carrier', [0, 6])).toBeFalsy();
    })
    test('Hit a ship', () => {
        gameboard.placeShip('carrier', [0, 0]);
        expect(gameboard.receiveAttack([0, 3])).toBeTruthy();
    })

    test('Hit an unused place', () => {
        gameboard.printGameboard()
        expect(gameboard.receiveAttack([6, 9])).toBeTruthy();
    })

    test('Place a ship in an already used position', () => {
        expect(gameboard.placeShip('battleship', [0, 4])).toBeFalsy();
    })

    test('Check if all ships are sunk', () => {
        console.log(gameboard.ships)
        expect(gameboard.checkGameOver()).toBeFalsy()
    })
})