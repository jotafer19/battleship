import gameController from "./gameController.js";
import DOM from "./DOM.js";
import Player from "./playerFactory.js";

const playGame = () => {
    const player = new Player('player');
    const playerBoard = player.board;
    const computer = new Player('computer');
    const computerBoard = computer.board;

    const game = gameController(player, computer);
    const dom = DOM(player, computer);

    const handlePlayerAttack = (event) => {
        if (!player.turn) return;

        const coordinates = [event.target.dataset.row, event.target.dataset.col];
        if (!player.checkCoordinates(coordinates)) return;

        const attack = player.playerAttack(coordinates, computerBoard);

        (game.isHit(attack)) ? dom.displayHit() : dom.displayMiss();

        if (game.checkWinner()) {
            game.gameOver();
        } else {
            game.changeTurns();
            setTimeout(handleCPUAttack, 500);
        }
    }

    const handleCPUAttack = () => {
        if (!computer.turn) return;

        const attack = computer.computerAttack(playerBoard);

        (game.isHit(attack)) ? dom.displayHit() : dom.displayMiss();

        if (game.checkWinner()) {
            game.gameOver();
        } else {
            game.changeTurns();
        }
    }

    const addListeners = () => {
        const computerCells = document.querySelectorAll('.computer .cell');
        computerCells.forEach(cell => cell.addEventListener('click', handlePlayerAttack));
    }

    const removeListeners = () => {
        const computerCells = document.querySelectorAll('.computer .cell');
        computerCells.forEach(cell => cell.removeEventListener('click', handlePlayerAttack));
    }

    const init = () => {
        dom.displayBoards();
        game.placeComputerShips();
        game.placePlayerShips();
        dom.displayPlayerShips()
        game.firstTurn()
        addListeners()
    }

    return { init }
}

playGame().init()