import gameController from "./gameController.js";
import DOM from "./DOM.js";
import Player from "./playerFactory.js";

const playGame = () => {
    const player = new Player('player');
    const computer = new Player('computer');

    const game = gameController(player, computer);
    const dom = DOM(player, computer);

    const handlePlayerAttack = (event) => {
        if (!player.turn) return;

        const coordinates = [event.target.dataset.row, event.target.dataset.col];
        if (!player.checkCoordinates(coordinates)) return;

        const attack = player.playerAttack(coordinates, computer.board);

        (game.isHit(attack)) ? dom.displayHit() : dom.displayMiss();

        if (game.checkWinner()) {
            dom.displayWinner()
            game.gameOver();
        } else {
            game.changeTurns();
            setTimeout(handleCPUAttack, 500);
        }
    }

    const handleCPUAttack = () => {
        if (!computer.turn) return;

        const attack = computer.computerAttack(player.board);

        (game.isHit(attack)) ? dom.displayHit() : dom.displayMiss();

        if (game.checkWinner()) {
            dom.displayWinner()
            game.gameOver();
        } else {
            game.changeTurns();
        }
    }

    const addListeners = () => {
        const computerCells = document.querySelectorAll('.computer .cell');
        computerCells.forEach(cell => cell.addEventListener('click', handlePlayerAttack));
    }

    const changeDirectionHandler = () => {
        const directionButton = document.querySelector('button.direction');
        directionButton.addEventListener('click', dom.changeDirection);
    }

    const randomPlacement = () => {
        const randomButton = document.querySelector('button.random');
        randomButton.addEventListener('click', () => {
            if (game.checkAllShipsPlaced()) {
                player.resetPlayer()
                dom.cleanPlayerBoard()
            }
            player.randomShipPlacement()
            dom.displayPlayerShips()

            const cells = document.querySelectorAll('.player .cell');
            cells.forEach(cell => {
                cell.removeEventListener('mouseover', dom.mouseOverCell);
                cell.removeEventListener('mouseout', dom.mouseOutCell);
                cell.removeEventListener('click', dom.clickCell)
            })
        })
    }

    const shipPlacementHandler = () => {
        const cells = document.querySelectorAll('.player .cell')
        cells.forEach(cell => {
          cell.addEventListener('mouseover', dom.mouseOverCell);
    
          cell.addEventListener('mouseout', dom.mouseOutCell);
    
          cell.addEventListener('click', dom.clickCell)
        })
    }

    const shipsPlacement = () => {
        dom.displayBoards();
        shipPlacementHandler()
        randomPlacement()
        changeDirectionHandler();
    }

    const init = () => {
        game.placeComputerShips();
        game.firstTurn()
        addListeners()
    }

    const start = () => {
        const vsCPUButton = document.querySelector('.mode.vs-CPU');
        vsCPUButton.addEventListener('click', () => {
            document.querySelector('.mode-container').classList.toggle('inactive');
            document.querySelector('.game.vs-CPU').classList.toggle('inactive');
            shipsPlacement()
        })
        
        const startButton = document.querySelector('button.play-game');
        startButton.addEventListener('click', () => {
            if (game.checkAllShipsPlaced()) {
                document.querySelector('.info-placement').classList.toggle('inactive');
                document.querySelector('.computer-container').classList.toggle('inactive');
                init()
            }
        })

        const playAgainButton = document.querySelector('button.play-again');
        playAgainButton.addEventListener('click', () => {
            player.resetPlayer();
            computer.resetPlayer();
            dom.resetInterface()
        })
    }

    return { 
        start
    }
}

playGame().start()

