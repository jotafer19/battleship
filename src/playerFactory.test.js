import {Player, Computer} from "./playerFactory.js";

describe('Player tests', () => {
    const player = new Player('player');
    const computer = new Computer('computer');
    player.setEnemyBoard(computer.getBoard())
    computer.setEnemyBoard(player.getBoard())

    computer.addShip('carrier', 5, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]])

    test('Player attacks and hits', () => {
        expect(player.playerAttack([0, 0], computer.board)).toBeTruthy();
    })

    test('Player attacks and miss', () => {
        expect(player.playerAttack([8, 6], computer.board)).toBeFalsy();
    })

    test('Computer attacks randomly', () => {
        expect(computer.computerAttacks()).not.toBeUndefined()
    })
})