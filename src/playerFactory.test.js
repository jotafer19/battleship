import Player from "./playerFactory";

describe('Player tests', () => {
    const player = new Player('player');
    const computer = new Player('computer');

    player.board.placeShips('carrier', [0, 0], "row");
    computer.board.placeShips('carrier', [9, 5], "row");

    test('Player attacks and hits', () => {
        expect(player.playerAttack([9, 9], computer.board)).toBeTruthy();
    })

    test('Player attacks and miss', () => {
        expect(player.playerAttack([8, 6], computer.board)).toBeFalsy();
    })

    test('Player attacks a cell already attacked', () => {
        expect(player.playerAttack([8, 6], computer.board)).toBeUndefined();
    })

    test('Computer attacks randomly', () => {
        expect(computer.computerAttack(player.board)).not.toBeUndefined()
    })

    test('Turn change', () => {
        player.changeTurn();
        expect(player.turn).toBeTruthy();
    })
})