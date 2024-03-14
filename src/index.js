import DOM from "./DOM.js"
import Player from "./playerFactory.js"

const vsPlayer = () => {
    const playerOne = new Player('Player 1')
    const playerTwo = new Player('Player 2')
    playerOne.setEnemyBoard(playerTwo.getBoard())
    playerTwo.setEnemyBoard(playerOne.getBoard());

    console.log(playerOne.getBoard())
    console.log(playerTwo.getBoard())

    const dom = DOM();
    dom.loadVsPlayer();
    dom.displayBoards();
    dom.displayShips()

    const nextPlayerButton = document.querySelector('button.next-player')
    nextPlayerButton.addEventListener('click', () => {
        if (!dom.checkShipsPlaced()) return;
        const allShips = document.querySelectorAll('.active .ship');
        allShips.forEach(ship => {
            const shipName = ship.id;
            const shipLength = parseInt(ship.dataset.length);
            const shipCoordinates = dom.getShipCoordinates(ship, [parseInt(ship.dataset.row), parseInt(ship.dataset.col)]);
            playerOne.addShip(shipName, shipLength, shipCoordinates);
            ship.remove();
        })
        dom.nextPlayerPlacement()
    })

    const changeTurn = () => {
        if (playerOne.turn) {
            playerOne.turn = false;
            playerTwo.turn = true;
        } else {
            playerOne.turn = true;
            playerTwo.turn = false;
        }
    }

    const playerAction = (event) => {
        const activePlayer = playerOne.turn ? playerOne : playerTwo;
        if (event.target.classList.contains('hit') || event.target.classList.contains('miss')) return;
        const coordinates = [parseInt(event.target.dataset.row), parseInt(event.target.dataset.col)]
        const isHit = activePlayer.playerAttack(coordinates);
        if (isHit) {
            event.target.classList.add('hit')
            const isGameOver = activePlayer.checkGameOver();
            if (isGameOver) {
                activePlayer.turn = false;
                dom.displayWinner(activePlayer.name);
                const resetButton = document.querySelector('button.play-again')
                resetButton.addEventListener('click', () => {
                    dom.resetGame()
                    playerOne.reset()
                    playerTwo.reset()
                })
            }
        } else if (!isHit) {
            event.target.classList.add('miss')
            changeTurn()
            setTimeout(() => {
                dom.changePlayer()
            }, 1000)
        }
    }

    const playerOneAction = (event) => {
        if (!playerOne.turn) return;
        playerAction(event)
    }

    const playerTwoAction = (event) => {
        if (!playerTwo.turn) return;
        playerAction(event)
    }

    const startGameButton = document.querySelector('button.start-game')
    startGameButton.addEventListener('click', () => {
        if (!dom.checkShipsPlaced()) return;
        const allShips = document.querySelectorAll('.active .ship');
        allShips.forEach(ship => {
            const shipName = ship.id;
            const shipLength = parseInt(ship.dataset.length);
            const shipCoordinates = dom.getShipCoordinates(ship, [parseInt(ship.dataset.row), parseInt(ship.dataset.col)]);
            playerTwo.addShip(shipName, shipLength, shipCoordinates);
            ship.remove();
        })
        document.querySelector('.controller-container').classList.toggle('inactive')
        const playerOneCells = document.querySelectorAll('.player-one .cell');
        const playerTwoCells = document.querySelectorAll('.player-two .cell');
        playerOne.turn = true;
        playerOneCells.forEach(cell => cell.addEventListener('click', playerTwoAction))
        playerTwoCells.forEach(cell => cell.addEventListener('click', playerOneAction))
    })
}

const playGame = () => {
    document.addEventListener('click', event => {
        if (event.target.closest('.vs-CPU')) {
            console.log('cpu')
        } else if (event.target.closest('.vs-player')) {
            vsPlayer()
        }
    })
}

playGame()
