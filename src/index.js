import gameController from "./gameController.js";
import DOM from "./DOM.js";
import Player from "./playerFactory.js";

const playGame = () => {
    const player = new Player('player');
    const computer = new Player('computer');

    const game = gameController(player, computer);
    const dom = DOM(player, computer);

    const handlePlayerAttack = (event) => {
        const coordinates = game.getClickedCell(event);
        if (player.checkCoordinates(coordinates)) return;
        player.attack(computer.getBoard(), coordinates);
        dom.displayMove();
        removeListeners()
        if (computer.getBoard().checkGameOver()) {
            alert('You win')
        } else {
            setTimeout(handleCPUAttack, 500)
        }
    }

    const handleCPUAttack = () => {
        game.changeTurns()
        computer.randomAttack(player.getBoard());
        dom.displayMove();
        game.changeTurns()
        if (player.getBoard().checkGameOver()) {
            console.log('COmputer Wins')
        } else {
            addListeners()
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
        dom.createBoards();
        game.placeComputerShips();
        game.placePlayerShips();
        dom.displayPlayerShips()
        game.startTurn()
        addListeners()
        
    }

    return { init }
}

playGame().init()