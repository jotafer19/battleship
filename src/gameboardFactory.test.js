import { experiments } from "webpack";
import Gameboard from "./gameboardFactory";

describe('Test gameboard class', () => {
    const gameboard = new Gameboard();

    test('Invalid coordinates', () => {
        expect(() => gameboard.placeShip('carrier', [10, 10])).toThrow("Coordinates out of range.")
    })

    test('Place a ship in an invalid position', () => {
        expect(() => gameboard.placeShip('carrier', [0, 6])).toThrow("Ship length exceeds board column length.");
    })
    test('Hit a ship', () => {
        gameboard.placeShip('carrier', [0, 0]);
        expect(gameboard.receiveAttack([0, 3])).toBe('HIT')
    })

    test('Hit an unused place', () => {
        expect(gameboard.receiveAttack([6, 9])).toBe('X')
    })

    test('Place a ship in an already used position', () => {
        expect(() => gameboard.placeShip('battleship', [0, 4])).toThrow("A ship is already in that position!")
    })

    test('Check if all ships are sunk', () => {
        console.log(gameboard.ships)
        expect(gameboard.checkGameOver()).toBeFalsy()
    })
})