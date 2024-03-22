import DOM from "./DOM.js"
import { Player, Computer } from "./playerFactory.js"

const setCountdown = () => {
    const countdownElement = document.querySelector('.countdown')
    let countdown = 5;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval)
            countdownElement.textContent = "Change!"
        }
    }, 1000)
    countdownElement.textContent = 5
    return countdownInterval;
}

const displayCountdown = () => {
    const element = document.querySelector('.change-player-container');
    const gameLog = document.querySelector('.game-log')
    const gameContainer = document.querySelector('.game-container');

    element.classList.toggle('inactive')
    gameLog.classList.toggle('inactive')
    gameContainer.classList.toggle('inactive')
}

const vsPlayer = () => {
    const playerOne = new Player('Player 1')
    const playerTwo = new Player('Player 2')
    playerOne.setEnemyBoard(playerTwo.getBoard())
    playerTwo.setEnemyBoard(playerOne.getBoard());

    const dom = DOM();
    dom.initVsPlayer(playerOne, playerTwo);

    const playerActive = () => {
        return playerOne.turn ? playerOne : playerTwo
    }

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

    const startGameVsPlayer = () => {
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
        const allShipContainers = document.querySelectorAll('.ship-container')
        allShipContainers.forEach(container => container.classList.toggle('inactive'))
        playerOne.turn = true;
        dom.displayGameLog(playerActive())
        playerOneCells.forEach(cell => cell.addEventListener('click', playerTwoAction))
        playerTwoCells.forEach(cell => cell.addEventListener('click', playerOneAction))
    }

    const startGameButton = document.querySelector('button.start-game')
    startGameButton.addEventListener('click', startGameVsPlayer)

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
        const activePlayer = playerActive()
        if (event.target.classList.contains('hit') || event.target.classList.contains('miss')) return;
        const coordinates = [parseInt(event.target.dataset.row), parseInt(event.target.dataset.col)]
        const isHit = activePlayer.playerAttack(coordinates);
        if (isHit) {
            event.target.classList.add('hit')
            const isGameOver = activePlayer.checkGameOver();
            if (isGameOver) {
                activePlayer.turn = false;
                dom.displayWinner(activePlayer.name);
                dom.vsPlayerDisplayBothBoards()
                playerOne.reset()
                playerTwo.reset()
                startGameButton.removeEventListener('click', startGameVsPlayer);
                return;
            }
        } else if (!isHit) {
            event.target.classList.add('miss')
        }
        changeTurn()
        setTimeout(() => {
            setCountdown()
            displayCountdown();
            setTimeout(() => {
                displayCountdown()
                dom.displayGameLog(playerActive())
                dom.changePlayer()
            }, 6000)
        }, 1000)
    }

    const playerOneAction = (event) => {
        if (!playerOne.turn) return;
        playerAction(event)
    }

    const playerTwoAction = (event) => {
        if (!playerTwo.turn) return;
        playerAction(event)
    }


}

const vsComputer = () => {
    const player = new Player('Player')
    const computer = new Computer('Computer')
    player.setEnemyBoard(computer.getBoard())
    computer.setEnemyBoard(player.getBoard())

    const dom = DOM();
    dom.initVsComputer(player, computer);

    const activePlayer = () => {
        return player.turn ? player : computer
    }

    const placeComputerShips = () => {
        dom.placeComputerShips()
        const allShips = document.querySelectorAll('.active .ship');
        allShips.forEach(ship => {
            const shipName = ship.id;
            const shipLength = parseInt(ship.dataset.length);
            const shipCoordinates = dom.getShipCoordinates(ship, [parseInt(ship.dataset.row), parseInt(ship.dataset.col)]);
            computer.addShip(shipName, shipLength, shipCoordinates);
            ship.remove();
        })
        document.querySelector('.active').classList.toggle('active')
    }

    const startGameVsComputer = () => {
        if (!dom.checkShipsPlaced()) return;
        const allShips = document.querySelectorAll('.active .ship');
        allShips.forEach(ship => {
            const shipName = ship.id;
            const shipLength = parseInt(ship.dataset.length);
            const shipCoordinates = dom.getShipCoordinates(ship, [parseInt(ship.dataset.row), parseInt(ship.dataset.col)]);
            player.addShip(shipName, shipLength, shipCoordinates);
            ship.remove();
        })
        document.querySelector('.controller-container').classList.toggle('inactive')
        const computerCells = document.querySelectorAll('.player-two .cell');
        player.turn = true;
        computerCells.forEach(cell => cell.addEventListener('click', playerAction))
        placeComputerShips()

        dom.displayGameLog(activePlayer())
        dom.displayBothBoards()
    }

    const startGameButton = document.querySelector('button.start-game')
    startGameButton.addEventListener('click', startGameVsComputer)

    const changeTurn = () => {
        if (player.turn) {
            player.turn = false;
            computer.turn = true;
        } else {
            player.turn = true;
            computer.turn = false;
        }
    }

    const computerAction = () => {
        if (!computer.turn) return;
        const isHit = computer.computerAttacks();
        const [row, col] = computer.getLastCoordinates();
        const cell = document.querySelector(`.player-one.board .cell[data-row="${row}"][data-col="${col}"]`)
        if (isHit) {
            cell.classList.add('hit');
            const isGameOver = computer.checkGameOver();
            if (isGameOver) {
                computer.turn = false;
                dom.displayWinner(computer.name)
                player.reset()
                computer.reset()
                startGameButton.removeEventListener('click', startGameVsComputer)
            }
        } else if (!isHit) {
            cell.classList.add('miss')
        }

        setTimeout(() => {
            changeTurn();
            dom.displayGameLog(activePlayer())
        }, 1000)

    }

    const playerAction = (event) => {
        if (!player.turn) return;
        if (event.target.classList.contains('hit') || event.target.classList.contains('miss')) return;
        const coordinates = [parseInt(event.target.dataset.row), parseInt(event.target.dataset.col)]
        const isHit = player.playerAttack(coordinates);
        if (isHit) {
            event.target.classList.add('hit')
            const isGameOver = player.checkGameOver();
            if (isGameOver) {
                player.turn = false;
                dom.displayWinner(player.name);
                player.reset()
                computer.reset()
                startGameButton.removeEventListener('click', startGameVsComputer)
            }
        } else if (!isHit) {
            event.target.classList.add('miss')
        }
        changeTurn()
        dom.displayGameLog(activePlayer())
        setTimeout(() => {
            computerAction()
        }, 1000)
    }


}

const playGame = () => {
    const dom = DOM();
    
    const resetBoardButton = document.querySelector('button.reset-board')
    resetBoardButton.addEventListener('click', dom.resetBoard)

    const randomizeButton = document.querySelector('button.randomize')
    randomizeButton.addEventListener('click', dom.placeRandomly)

    const playAgainButton = document.querySelector('button.play-again')
    playAgainButton.addEventListener('click', dom.resetGame)

    document.addEventListener('click', event => {
        if (event.target.closest('.vs-CPU')) {
            vsComputer()
        } else if (event.target.closest('.vs-player')) {
            vsPlayer()
        }
    })
}

playGame()
