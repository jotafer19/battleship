"use strict";
(self["webpackChunkwebpack_template"] = self["webpackChunkwebpack_template"] || []).push([["app"],{

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DOM = () => {
    const displayBoards = () => {
        const playerOneBoard = document.querySelector('.player-one.board');
        const playerTwoBoard = document.querySelector('.player-two.board');
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const playerOneCell = document.createElement('div');
                playerOneCell.classList.add('cell');
                playerOneCell.dataset.row = i;
                playerOneCell.dataset.col = j;
                playerOneBoard.append(playerOneCell);

                const playerTwoCell = document.createElement('div');
                playerTwoCell.classList.add('cell');
                playerTwoCell.dataset.row = i;
                playerTwoCell.dataset.col = j;
                playerTwoBoard.append(playerTwoCell);
            }
        }
    }

    const generateShips = () => {
        const shipsData = [
            {
                name: 'carrier',
                length: 5,
            },
            {
                name: 'battleship',
                length: 4,
            },
            {
                name: 'destroyer',
                length: 3,
            },
            {
                name: 'submarine',
                length: 2,
            },
            {
                name: 'patrol',
                length: 2,
            },
        ];

        const createdShips = [];
        shipsData.forEach(ship => {
            const newShip = document.createElement('div');
            newShip.classList.add('ship');
            newShip.setAttribute('id', ship.name);
            newShip.draggable = "true";
            newShip.dataset.length = ship.length;
            newShip.dataset.direction = "row";
            for (let i = 0; i < ship.length; i++) {
                const shipPart = document.createElement('div');
                shipPart.classList.add('ship-part');
                newShip.append(shipPart)
            }
            createdShips.push(newShip);
        })

        return createdShips;
    }

    const isInTheBoard = (draggedShip, startCoordinates) => {
        const length = parseInt(draggedShip.dataset.length);
        const direction = draggedShip.dataset.direction;
        const [row, col] = startCoordinates;

        if (direction === "row") {
            if (col + length - 1 < 0 || col + length - 1 > 9) return false;
        } else if (direction === "col") {
            if (row + length - 1 < 0 || row + length - 1 > 9) return false;
        }

        return true;
    }

    const getShipCoordinates = (ship, startCoordinates) => {
        const [row, col] = startCoordinates;
        const length = parseInt(ship.dataset.length);
        const direction = ship.dataset.direction;

        const shipCoordinates = [];
        if (direction === "row") {
            for (let i = col; i < col + length; i++) shipCoordinates.push([row, i])
        } else if (direction === "col") {
            for (let i = row; i < row + length; i++) shipCoordinates.push([i, col]);
        }

        return shipCoordinates;
    }

    const getAllCellsUsed = () => {
        const allShipsPlaced = document.querySelectorAll('.active .cell .ship:not(.dragged)');
        const allCellsUsed = [];
        allShipsPlaced.forEach(ship => {
            const startingCoordinates = [parseInt(ship.dataset.row), parseInt(ship.dataset.col)];
            const shipCoordinates = getShipCoordinates(ship, startingCoordinates);
            shipCoordinates.forEach(coordinate => allCellsUsed.push(coordinate));
        })
        return allCellsUsed;
    }

    const areCoordinatesAdjacent = (draggedShipCoordinates, shipsPlacedCoordinates) => {
        for (let coord1 of draggedShipCoordinates) {
            for (let coord2 of shipsPlacedCoordinates) {
                const rowDiff = Math.abs(coord1[0] - coord2[0]);
                const colDiff = Math.abs(coord1[1] - coord2[1]);
                if (rowDiff <= 1 && colDiff <= 1) return true;
            }
        }
        return false;
    }

    const isValidPosition = (draggedShip, startCoordinates) => {
        if (!isInTheBoard(draggedShip, startCoordinates)) return false;
        const draggedShipCoordinates = getShipCoordinates(draggedShip, startCoordinates);
        const shipsPlacedCoordinates = getAllCellsUsed();
        if (shipsPlacedCoordinates.length) {
            if (areCoordinatesAdjacent(draggedShipCoordinates, shipsPlacedCoordinates)) return false;
        }

        return true;
    }

    const dragStart = (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);

        event.target.classList.add('dragged');
    }

    const dragEnd = (event) => {
        event.preventDefault();
        event.target.classList.toggle('dragged');
    }

    const dragOver = (event) => {
        event.preventDefault();
    }

    const shipClick = (event) => {
        const ship = event.target.closest('.ship')

        if (!ship.parentNode.classList.contains('cell')) return;

        const startCoordinates = [parseInt(ship.dataset.row), parseInt(ship.dataset.col)];
        const direction = ship.dataset.direction;

        ship.classList.toggle('dragged')

        if (direction === "row") {
            ship.dataset.direction = "col";
            isValidPosition(ship, startCoordinates) ? ship.style.gridAutoFlow = "row" : ship.dataset.direction = "row";
        } else if (direction === "col") {
            ship.dataset.direction = "row"
            isValidPosition(ship, startCoordinates) ? ship.style.gridAutoFlow = "column" : ship.dataset.direction = "col";
        }

        ship.classList.toggle('dragged')
    }

    const dragEnter = (event) => {
        event.preventDefault();
        const cell = event.target;
        cell.classList.add('drag-over')
    }

    const dragLeave = (event) => {
        event.preventDefault();
        const cell = event.target;
        cell.classList.remove('drag-over')
    }

    const dragDrop = (event) => {
        event.preventDefault();

        const cell = event.target;
        const [row, col] = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
        cell.classList.remove('drag-over')

        const data = event.dataTransfer.getData('text/plain');
        const draggableShip = document.getElementById(data);

        try {
            if (!isValidPosition(draggableShip, [row, col]) || cell.classList.contains('ship-part')) return;
            draggableShip.style.position = "absolute";
            draggableShip.dataset.row = row;
            draggableShip.dataset.col = col;
            cell.append(draggableShip);
        } catch {
            return;
        }
    }

    const shipListeners = () => {
        const allShips = document.querySelectorAll('.active .ship');
        allShips.forEach(ship => {
            ship.addEventListener('dragstart', dragStart)
            ship.addEventListener('dragend', dragEnd)
            ship.addEventListener('click', shipClick);
        })
    }

    const boardListeners = () => {
        const allCells = document.querySelectorAll('.active .board .cell');
        allCells.forEach(cell => {
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragleave', dragLeave);
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('drop', dragDrop);
        })
    }

    const displayShips = () => {
        const shipsContainer = document.querySelector('.active .ship-container');
        const ships = generateShips();
        ships.forEach(ship => {
            shipsContainer.append(ship);
        })
        shipListeners()
        boardListeners()
    }

    const resetBoard = () => {
        const shipContainer = document.querySelector('.active .ship-container');
        const allShips = document.querySelectorAll('.active .ship');

        allShips.forEach(ship => ship.remove())
        generateShips().forEach(ship => shipContainer.append(ship))
        shipListeners()
    }

    const getRandomCoordinates = () => {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        return [row, col];
    }

    const getRandomDirection = () => {
        const randomNumber = Math.floor(Math.random() * 2);

        return randomNumber === 0 ? "row" : "col";
    }

    const changeDirection = (ship) => {
        const direction = getRandomDirection();
        if (direction === "col") {
            ship.style.gridAutoFlow = "row";
            ship.dataset.direction = "col";
        }
    }

    const placeRandomly = () => {
        resetBoard();
        const allShips = document.querySelectorAll('.active .ship-container .ship');
        allShips.forEach(ship => {
            changeDirection(ship);
            let [row, col] = getRandomCoordinates();
            while (!isValidPosition(ship, [row, col])) [row, col] = getRandomCoordinates();
            ship.style.position = "absolute";
            ship.dataset.row = row;
            ship.dataset.col = col;
            const cell = document.querySelector(`.active .cell[data-row="${row}"][data-col="${col}"]`);
            cell.append(ship);
        })
    }

    const placeComputerShips = () => {
        const playerOne = document.querySelector('.player-one-container');
        const playerTwo = document.querySelector('.player-two-container');

        playerOne.classList.toggle('active')
        playerTwo.classList.toggle('active');
        placeRandomly()
    }

    const checkShipsPlaced = () => {
        const allShips = document.querySelectorAll('.active .cell .ship');
        return allShips.length >= 5;
    }

    const changePlayerDisplay = () => {
        const playerOne = document.querySelector('.player-one-container');
        const playerTwo = document.querySelector('.player-two-container');
        const nextPlayerButton = document.querySelector('button.next-player');
        const startGame = document.querySelector('button.start-game');

        playerOne.classList.toggle('active');
        playerOne.classList.toggle('inactive');
        playerTwo.classList.toggle('active');
        playerTwo.classList.toggle('inactive');
        nextPlayerButton.classList.toggle('inactive');
        startGame.classList.toggle('inactive')
    }

    const nextPlayerPlacement = () => {
        changePlayerDisplay()
        displayShips();
    }

    const changePlayer = () => {
        const activePlayer = document.querySelector('.player.active');
        const inactivePlayer = document.querySelector('.player.inactive');

        activePlayer.classList.toggle('active')
        activePlayer.classList.toggle('inactive')
        inactivePlayer.classList.toggle('active')
        inactivePlayer.classList.toggle('inactive')
    }

    const displayBothBoards = () => {
        const playerOne = document.querySelector('.player-one-container')
        const playerTwo = document.querySelector('.player-two-container')
        const shipContainers = document.querySelectorAll('.ship-container');
        playerTwo.classList.toggle('inactive');
        shipContainers.forEach(container => container.classList.toggle('inactive'));
    }

    const loadGame = () => {
        const gameModeContainer = document.querySelector('.game-mode-container');
        const gameContainer = document.querySelector('.game-container');
        const playerOne = document.querySelector('.player-one-container');
        const controllerContainer = document.querySelector('.controller-container');

        gameModeContainer.classList.toggle('inactive');
        gameContainer.classList.toggle('inactive');
        playerOne.classList.toggle('inactive');
        playerOne.classList.toggle('active');
        controllerContainer.classList.toggle('inactive')
    }

    const displayNames = (playerOne, playerTwo) => {
        const playerOneName = document.querySelector('.player-one.display-name')
        const playerTwoName = document.querySelector('.player-two.display-name')

        playerOneName.textContent = `${playerOne.name} board`
        playerTwoName.textContent = `${playerTwo.name} board`;
    }

    const loadVsPlayer = () => {
        loadGame()
        const startButton = document.querySelector('button.start-game')
        startButton.classList.toggle('inactive')
    }

    const loadVsComputer = () => {
        loadGame()
        const nextPlayerButton = document.querySelector('button.next-player')
        nextPlayerButton.classList.toggle('inactive')
    }

    const removeCells = () => {
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach(cell => cell.remove());
    }   

    const vsPlayerDisplayBothBoards = () => {
        const activePlayer = document.querySelector('.player.active');
        const inactivePlayer = document.querySelector('.player.inactive');

        activePlayer.classList.toggle('active')
        inactivePlayer.classList.toggle('inactive')
    }

    const resetGame = () => {
        const gameModeContainer = document.querySelector('.game-mode-container')
        const gameContainer = document.querySelector('.game-container')
        const allShipContainer = document.querySelectorAll('.ship-container')
        const allPlayerContainer = document.querySelectorAll('.player')
        const nextPlayerButton = document.querySelector('button.next-player')
        const winnerContainer = document.querySelector('.winner-container')
        const turn = document.querySelector('.game-log')

        gameModeContainer.classList.toggle('inactive')
        gameContainer.classList.toggle('inactive')
        allShipContainer.forEach(container => container.classList.toggle('inactive'))
        allPlayerContainer.forEach(container => container.classList.toggle('inactive'))
        nextPlayerButton.classList.toggle('inactive')
        winnerContainer.classList.toggle('inactive')
        turn.textContent = ""

        removeCells()
    }

    const displayWinner = (playerName) => {
        const winnerContainer = document.querySelector('.winner-container')
        winnerContainer.classList.toggle('inactive')
        
        const winnerMessage = document.querySelector('.winner-message')
        winnerMessage.textContent = `${playerName} wins!`
    }

    const initVsPlayer = (playerOne, playerTwo) => {
        loadVsPlayer();
        displayNames(playerOne, playerTwo)
        displayBoards();
        displayShips()
    }

    const initVsComputer = (player, computer) => {
        loadVsComputer();
        displayNames(player, computer)
        displayBoards();
        displayShips()
    }

    const displayGameLog = (playerTurn) => {
        const gameLog = document.querySelector('.game-log');
        gameLog.textContent = `${playerTurn.name} turn`
    }

    return {
        initVsPlayer,
        initVsComputer,
        resetBoard,
        placeRandomly,
        changePlayer,
        checkShipsPlaced,
        getShipCoordinates,
        nextPlayerPlacement,
        displayWinner,
        resetGame,
        displayBothBoards,
        placeComputerShips,
        vsPlayerDisplayBothBoards,
        displayGameLog
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);

/***/ }),

/***/ "./src/boardFactory.js":
/*!*****************************!*\
  !*** ./src/boardFactory.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory.js */ "./src/shipFactory.js");


class Board {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array.from({length: 10 }).fill(null));
    this.ships = {};
  }

  addShip(shipName, shipLength, coordinates) {
    const newShip = new _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"](shipName, shipLength);
    this.ships[shipName] = newShip;
    coordinates.forEach(coordinate => {
      const [row, col] = coordinate;
      this.board[row][col] = newShip;
    })
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;

    if (!this.board[row][col]) {
      return false;
    } else {
      const ship = this.board[row][col];
      ship.getHit();
      return true;
    }
  }

  getShips() {
    return Object.values(this.ships);
  }

  allShipsSunk() {
    const allShips = this.getShips();
    return allShips.every(ship => ship.sunk);
  }

  resetBoard() {
    this.board = Array.from({ length: 10 }, () => Array.from({length: 10 }).fill(null));
    this.ships = {};
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM.js */ "./src/DOM.js");
/* harmony import */ var _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerFactory.js */ "./src/playerFactory.js");



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
    const playerOne = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__.Player('Player 1')
    const playerTwo = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__.Player('Player 2')
    playerOne.setEnemyBoard(playerTwo.getBoard())
    playerTwo.setEnemyBoard(playerOne.getBoard());

    const dom = (0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
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
                startGameButton.removeEventListener('click', startGameVsPlayer)
            }
        } else if (!isHit) {
            event.target.classList.add('miss')
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
    const player = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__.Player('Player')
    const computer = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__.Computer('Computer')
    player.setEnemyBoard(computer.getBoard())
    computer.setEnemyBoard(player.getBoard())

    const dom = (0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
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
    const dom = (0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    
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


/***/ }),

/***/ "./src/playerFactory.js":
/*!******************************!*\
  !*** ./src/playerFactory.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computer: () => (/* binding */ Computer),
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _boardFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boardFactory.js */ "./src/boardFactory.js");




class Player {
  constructor(name) {
    this.name = name;
    this.board = new _boardFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.enemyBoard = null;
    this.turn = false;
  }

  setEnemyBoard(enemyBoard) {
    this.enemyBoard = enemyBoard;
  }

  getBoard() {
    return this.board;
  }
  
  addShip(shipName, shipLength, coordinates) {
    this.board.addShip(shipName, shipLength, coordinates);
  }

  playerAttack(coordinates) {
    return this.enemyBoard.receiveAttack(coordinates);
  }

  checkGameOver() {
    return this.enemyBoard.allShipsSunk();
  }

  reset() {
    this.board.resetBoard();
  }
}

class Computer extends Player {
  constructor(name) {
    super(name)
    this.allAttacksDone = [];
    this.attackHit = false;
    this.allHitAttacks = [];
    this.nextAttack = [];
  }

  isAttackAlreadyDone(coordinates) {
    const [row, col] = coordinates;

    for (let attack of this.allAttacksDone) {
      if (attack[0] === row && attack[1] === col) return true;
    }
    return false;
  }

  randomCoordinates() {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (this.isAttackAlreadyDone([row, col])) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }

    return [row, col];
  }

  computerAttacks() {
    if (!this.attackHit || !this.nextAttack.length) {
      this.resetAttackStatus()
      const isHit = this.randomComputerAttack();
      if (isHit) {
        return this.computerHits()
      } else if (!isHit) {
        return false;
      }
    } else if (this.attackHit && this.nextAttack.length) {
      const coordinates = this.nextAttack.shift();
      this.allAttacksDone.push(coordinates)
      const isHit = this.enemyBoard.receiveAttack(coordinates);
      if (isHit) {
        return this.computerHits()
      } else if (!isHit && !this.nextAttack.length) {
        this.resetAttackStatus()
        return false;
      }
    }
  }

  randomComputerAttack() {
    const coordinates = this.randomCoordinates();
    this.allAttacksDone.push(coordinates);
    return this.enemyBoard.receiveAttack(coordinates);
  }

  computerHits() {
    this.attackHit = true;
    this.allHitAttacks.push(this.allAttacksDone.at(-1));
    const lastHit = this.allHitAttacks.at(-1);
    const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    moves.forEach(move => {
      const newRow = move[0] + lastHit[0];
      const newCol = move[1] + lastHit[1];
      if (this.isAttackAlreadyDone([newRow, newCol]) || (newRow < 0 || newCol < 0 || newRow > 9 || newCol > 9)) return;
      this.nextAttack.push([newRow, newCol]);
    })

    if (this.allHitAttacks.length > 1) {
      const previousHit = this.allHitAttacks.at(-2);
      if (lastHit[0] === previousHit[0]) {
        this.nextAttack = this.nextAttack.filter(move => move[0] === lastHit[0]);
      } else if (lastHit[1] === previousHit[1]) {
        this.nextAttack = this.nextAttack.filter(move => move[1] === lastHit[1]);
      }
    }
    return true;
  }

  resetAttackStatus() {
    this.attackHit = false;
    this.allHitAttacks = [];
    this.nextAttack = [];
  }

  getLastCoordinates() {
    return this.allAttacksDone.at(-1);
  }
}

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.totalHits = 0;
    this.sunk = false;
  }

  getHit() {
    this.totalHits += 1;
    this.isSunk();
  }

  isSunk() {
    this.sunk = this.totalHits >= this.length;
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRCxVQUFVO0FBQ1YsOEJBQThCLGtCQUFrQjtBQUNoRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSxJQUFJLGVBQWUsSUFBSTtBQUNsRztBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLGdCQUFnQjtBQUN2RCx1Q0FBdUMsZ0JBQWdCO0FBQ3ZEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFlBQVk7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQy9ha0I7O0FBRXJCO0FBQ2Y7QUFDQSw4QkFBOEIsWUFBWSxvQkFBb0IsWUFBWTtBQUMxRTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLHVEQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixZQUFZLG9CQUFvQixZQUFZO0FBQzFFO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFDMEI7QUFDMkI7O0FBRXJEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIscURBQU07QUFDaEMsMEJBQTBCLHFEQUFNO0FBQ2hDO0FBQ0E7O0FBRUEsZ0JBQWdCLG1EQUFHO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHVCQUF1QixxREFBTTtBQUM3Qix5QkFBeUIsdURBQVE7QUFDakM7QUFDQTs7QUFFQSxnQkFBZ0IsbURBQUc7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGLElBQUksZUFBZSxJQUFJO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7QUFHQTs7QUFFQTtBQUNBLGdCQUFnQixtREFBRztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVRc0M7O0FBRVg7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix3REFBSztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvSGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2JvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvcGxheWVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3NoaXBGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERPTSA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJPbmVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItb25lLmJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHBsYXllclR3b0JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10d28uYm9hcmQnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJPbmVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQm9hcmQuYXBwZW5kKHBsYXllck9uZUNlbGwpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGxheWVyVHdvQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0JvYXJkLmFwcGVuZChwbGF5ZXJUd29DZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdlbmVyYXRlU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBzRGF0YSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2FycmllcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmF0dGxlc2hpcCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZGVzdHJveWVyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzdWJtYXJpbmUnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3BhdHJvbCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBjcmVhdGVkU2hpcHMgPSBbXTtcbiAgICAgICAgc2hpcHNEYXRhLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTaGlwLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgIG5ld1NoaXAuc2V0QXR0cmlidXRlKCdpZCcsIHNoaXAubmFtZSk7XG4gICAgICAgICAgICBuZXdTaGlwLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgbmV3U2hpcC5kYXRhc2V0Lmxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgICAgICAgICAgbmV3U2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwUGFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHNoaXBQYXJ0LmNsYXNzTGlzdC5hZGQoJ3NoaXAtcGFydCcpO1xuICAgICAgICAgICAgICAgIG5ld1NoaXAuYXBwZW5kKHNoaXBQYXJ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlZFNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZWRTaGlwcztcbiAgICB9XG5cbiAgICBjb25zdCBpc0luVGhlQm9hcmQgPSAoZHJhZ2dlZFNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpID0+IHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gcGFyc2VJbnQoZHJhZ2dlZFNoaXAuZGF0YXNldC5sZW5ndGgpO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LmRpcmVjdGlvbjtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IHN0YXJ0Q29vcmRpbmF0ZXM7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgICAgICAgaWYgKGNvbCArIGxlbmd0aCAtIDEgPCAwIHx8IGNvbCArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAgICAgICBpZiAocm93ICsgbGVuZ3RoIC0gMSA8IDAgfHwgcm93ICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGdldFNoaXBDb29yZGluYXRlcyA9IChzaGlwLCBzdGFydENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzdGFydENvb3JkaW5hdGVzO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBwYXJzZUludChzaGlwLmRhdGFzZXQubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gc2hpcC5kYXRhc2V0LmRpcmVjdGlvbjtcblxuICAgICAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbDsgaSA8IGNvbCArIGxlbmd0aDsgaSsrKSBzaGlwQ29vcmRpbmF0ZXMucHVzaChbcm93LCBpXSlcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY29sXCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPCByb3cgKyBsZW5ndGg7IGkrKykgc2hpcENvb3JkaW5hdGVzLnB1c2goW2ksIGNvbF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBjb25zdCBnZXRBbGxDZWxsc1VzZWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzUGxhY2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuY2VsbCAuc2hpcDpub3QoLmRyYWdnZWQpJyk7XG4gICAgICAgIGNvbnN0IGFsbENlbGxzVXNlZCA9IFtdO1xuICAgICAgICBhbGxTaGlwc1BsYWNlZC5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRpbmdDb29yZGluYXRlcyA9IFtwYXJzZUludChzaGlwLmRhdGFzZXQucm93KSwgcGFyc2VJbnQoc2hpcC5kYXRhc2V0LmNvbCldO1xuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gZ2V0U2hpcENvb3JkaW5hdGVzKHNoaXAsIHN0YXJ0aW5nQ29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLmZvckVhY2goY29vcmRpbmF0ZSA9PiBhbGxDZWxsc1VzZWQucHVzaChjb29yZGluYXRlKSk7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBhbGxDZWxsc1VzZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgYXJlQ29vcmRpbmF0ZXNBZGphY2VudCA9IChkcmFnZ2VkU2hpcENvb3JkaW5hdGVzLCBzaGlwc1BsYWNlZENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGNvb3JkMSBvZiBkcmFnZ2VkU2hpcENvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb29yZDIgb2Ygc2hpcHNQbGFjZWRDb29yZGluYXRlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd0RpZmYgPSBNYXRoLmFicyhjb29yZDFbMF0gLSBjb29yZDJbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbERpZmYgPSBNYXRoLmFicyhjb29yZDFbMV0gLSBjb29yZDJbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChyb3dEaWZmIDw9IDEgJiYgY29sRGlmZiA8PSAxKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gKGRyYWdnZWRTaGlwLCBzdGFydENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgIGlmICghaXNJblRoZUJvYXJkKGRyYWdnZWRTaGlwLCBzdGFydENvb3JkaW5hdGVzKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBkcmFnZ2VkU2hpcENvb3JkaW5hdGVzID0gZ2V0U2hpcENvb3JkaW5hdGVzKGRyYWdnZWRTaGlwLCBzdGFydENvb3JkaW5hdGVzKTtcbiAgICAgICAgY29uc3Qgc2hpcHNQbGFjZWRDb29yZGluYXRlcyA9IGdldEFsbENlbGxzVXNlZCgpO1xuICAgICAgICBpZiAoc2hpcHNQbGFjZWRDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChhcmVDb29yZGluYXRlc0FkamFjZW50KGRyYWdnZWRTaGlwQ29vcmRpbmF0ZXMsIHNoaXBzUGxhY2VkQ29vcmRpbmF0ZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBldmVudC50YXJnZXQuaWQpO1xuXG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ0VuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZHJhZ2dlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGRyYWdPdmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNoaXAnKVxuXG4gICAgICAgIGlmICghc2hpcC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc3RhcnRDb29yZGluYXRlcyA9IFtwYXJzZUludChzaGlwLmRhdGFzZXQucm93KSwgcGFyc2VJbnQoc2hpcC5kYXRhc2V0LmNvbCldO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uO1xuXG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LnRvZ2dsZSgnZHJhZ2dlZCcpXG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgICAgICAgc2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwiY29sXCI7XG4gICAgICAgICAgICBpc1ZhbGlkUG9zaXRpb24oc2hpcCwgc3RhcnRDb29yZGluYXRlcykgPyBzaGlwLnN0eWxlLmdyaWRBdXRvRmxvdyA9IFwicm93XCIgOiBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJyb3dcIjtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY29sXCIpIHtcbiAgICAgICAgICAgIHNoaXAuZGF0YXNldC5kaXJlY3Rpb24gPSBcInJvd1wiXG4gICAgICAgICAgICBpc1ZhbGlkUG9zaXRpb24oc2hpcCwgc3RhcnRDb29yZGluYXRlcykgPyBzaGlwLnN0eWxlLmdyaWRBdXRvRmxvdyA9IFwiY29sdW1uXCIgOiBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJjb2xcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LnRvZ2dsZSgnZHJhZ2dlZCcpXG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ0VudGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJylcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnTGVhdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxuICAgIH1cblxuICAgIGNvbnN0IGRyYWdEcm9wID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IFtwYXJzZUludChjZWxsLmRhdGFzZXQucm93KSwgcGFyc2VJbnQoY2VsbC5kYXRhc2V0LmNvbCldO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpXG5cbiAgICAgICAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZVNoaXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUG9zaXRpb24oZHJhZ2dhYmxlU2hpcCwgW3JvdywgY29sXSkgfHwgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAtcGFydCcpKSByZXR1cm47XG4gICAgICAgICAgICBkcmFnZ2FibGVTaGlwLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgZHJhZ2dhYmxlU2hpcC5kYXRhc2V0LnJvdyA9IHJvdztcbiAgICAgICAgICAgIGRyYWdnYWJsZVNoaXAuZGF0YXNldC5jb2wgPSBjb2w7XG4gICAgICAgICAgICBjZWxsLmFwcGVuZChkcmFnZ2FibGVTaGlwKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzaGlwTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLnNoaXAnKTtcbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZHJhZ1N0YXJ0KVxuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJhZ0VuZClcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaGlwQ2xpY2spO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGJvYXJkTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLmJvYXJkIC5jZWxsJyk7XG4gICAgICAgIGFsbENlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcik7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSk7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJhZ0Ryb3ApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlIC5zaGlwLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBzaGlwcyA9IGdlbmVyYXRlU2hpcHMoKTtcbiAgICAgICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIHNoaXBzQ29udGFpbmVyLmFwcGVuZChzaGlwKTtcbiAgICAgICAgfSlcbiAgICAgICAgc2hpcExpc3RlbmVycygpXG4gICAgICAgIGJvYXJkTGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICBjb25zdCByZXNldEJvYXJkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZSAuc2hpcC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5zaGlwJyk7XG5cbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHNoaXAucmVtb3ZlKCkpXG4gICAgICAgIGdlbmVyYXRlU2hpcHMoKS5mb3JFYWNoKHNoaXAgPT4gc2hpcENvbnRhaW5lci5hcHBlbmQoc2hpcCkpXG4gICAgICAgIHNoaXBMaXN0ZW5lcnMoKVxuICAgIH1cblxuICAgIGNvbnN0IGdldFJhbmRvbUNvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRSYW5kb21EaXJlY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuXG4gICAgICAgIHJldHVybiByYW5kb21OdW1iZXIgPT09IDAgPyBcInJvd1wiIDogXCJjb2xcIjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VEaXJlY3Rpb24gPSAoc2hpcCkgPT4ge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBnZXRSYW5kb21EaXJlY3Rpb24oKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgICAgICAgc2hpcC5zdHlsZS5ncmlkQXV0b0Zsb3cgPSBcInJvd1wiO1xuICAgICAgICAgICAgc2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwiY29sXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwbGFjZVJhbmRvbWx5ID0gKCkgPT4ge1xuICAgICAgICByZXNldEJvYXJkKCk7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuc2hpcC1jb250YWluZXIgLnNoaXAnKTtcbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGNoYW5nZURpcmVjdGlvbihzaGlwKTtcbiAgICAgICAgICAgIGxldCBbcm93LCBjb2xdID0gZ2V0UmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICAgIHdoaWxlICghaXNWYWxpZFBvc2l0aW9uKHNoaXAsIFtyb3csIGNvbF0pKSBbcm93LCBjb2xdID0gZ2V0UmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICAgIHNoaXAuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgICAgICAgc2hpcC5kYXRhc2V0LmNvbCA9IGNvbDtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWN0aXZlIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICAgICAgICBjZWxsLmFwcGVuZChzaGlwKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBwbGFjZUNvbXB1dGVyU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllck9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItb25lLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwbGF5ZXJUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR3by1jb250YWluZXInKTtcblxuICAgICAgICBwbGF5ZXJPbmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgcGxheWVyVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICBwbGFjZVJhbmRvbWx5KClcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja1NoaXBzUGxhY2VkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLmNlbGwgLnNoaXAnKTtcbiAgICAgICAgcmV0dXJuIGFsbFNoaXBzLmxlbmd0aCA+PSA1O1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZVBsYXllckRpc3BsYXkgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllck9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItb25lLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwbGF5ZXJUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR3by1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgbmV4dFBsYXllckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5uZXh0LXBsYXllcicpO1xuICAgICAgICBjb25zdCBzdGFydEdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uc3RhcnQtZ2FtZScpO1xuXG4gICAgICAgIHBsYXllck9uZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgcGxheWVyT25lLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHBsYXllclR3by5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgcGxheWVyVHdvLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIG5leHRQbGF5ZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgc3RhcnRHYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0UGxheWVyUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgICAgICBjaGFuZ2VQbGF5ZXJEaXNwbGF5KClcbiAgICAgICAgZGlzcGxheVNoaXBzKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlUGxheWVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3RpdmVQbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLmFjdGl2ZScpO1xuICAgICAgICBjb25zdCBpbmFjdGl2ZVBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIuaW5hY3RpdmUnKTtcblxuICAgICAgICBhY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgYWN0aXZlUGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgaW5hY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgaW5hY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlCb3RoQm9hcmRzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLW9uZS1jb250YWluZXInKVxuICAgICAgICBjb25zdCBwbGF5ZXJUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR3by1jb250YWluZXInKVxuICAgICAgICBjb25zdCBzaGlwQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLWNvbnRhaW5lcicpO1xuICAgICAgICBwbGF5ZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgc2hpcENvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJykpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvYWRHYW1lID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lTW9kZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLW1vZGUtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcGxheWVyT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1vbmUtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbGxlci1jb250YWluZXInKTtcblxuICAgICAgICBnYW1lTW9kZUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICBnYW1lQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHBsYXllck9uZS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICBwbGF5ZXJPbmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIGNvbnRyb2xsZXJDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlOYW1lcyA9IChwbGF5ZXJPbmUsIHBsYXllclR3bykgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJPbmVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1vbmUuZGlzcGxheS1uYW1lJylcbiAgICAgICAgY29uc3QgcGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItdHdvLmRpc3BsYXktbmFtZScpXG5cbiAgICAgICAgcGxheWVyT25lTmFtZS50ZXh0Q29udGVudCA9IGAke3BsYXllck9uZS5uYW1lfSBib2FyZGBcbiAgICAgICAgcGxheWVyVHdvTmFtZS50ZXh0Q29udGVudCA9IGAke3BsYXllclR3by5uYW1lfSBib2FyZGA7XG4gICAgfVxuXG4gICAgY29uc3QgbG9hZFZzUGxheWVyID0gKCkgPT4ge1xuICAgICAgICBsb2FkR2FtZSgpXG4gICAgICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnN0YXJ0LWdhbWUnKVxuICAgICAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgfVxuXG4gICAgY29uc3QgbG9hZFZzQ29tcHV0ZXIgPSAoKSA9PiB7XG4gICAgICAgIGxvYWRHYW1lKClcbiAgICAgICAgY29uc3QgbmV4dFBsYXllckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5uZXh0LXBsYXllcicpXG4gICAgICAgIG5leHRQbGF5ZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZUNlbGxzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgICAgIGFsbENlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLnJlbW92ZSgpKTtcbiAgICB9ICAgXG5cbiAgICBjb25zdCB2c1BsYXllckRpc3BsYXlCb3RoQm9hcmRzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3RpdmVQbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLmFjdGl2ZScpO1xuICAgICAgICBjb25zdCBpbmFjdGl2ZVBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIuaW5hY3RpdmUnKTtcblxuICAgICAgICBhY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgaW5hY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc2V0R2FtZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZU1vZGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1tb2RlLWNvbnRhaW5lcicpXG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1jb250YWluZXInKVxuICAgICAgICBjb25zdCBhbGxTaGlwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtY29udGFpbmVyJylcbiAgICAgICAgY29uc3QgYWxsUGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcicpXG4gICAgICAgIGNvbnN0IG5leHRQbGF5ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ubmV4dC1wbGF5ZXInKVxuICAgICAgICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLWNvbnRhaW5lcicpXG4gICAgICAgIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1sb2cnKVxuXG4gICAgICAgIGdhbWVNb2RlQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgZ2FtZUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIGFsbFNoaXBDb250YWluZXIuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJykpXG4gICAgICAgIGFsbFBsYXllckNvbnRhaW5lci5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKSlcbiAgICAgICAgbmV4dFBsYXllckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIHdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIHR1cm4udGV4dENvbnRlbnQgPSBcIlwiXG5cbiAgICAgICAgcmVtb3ZlQ2VsbHMoKVxuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlXaW5uZXIgPSAocGxheWVyTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLWNvbnRhaW5lcicpXG4gICAgICAgIHdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIFxuICAgICAgICBjb25zdCB3aW5uZXJNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5lci1tZXNzYWdlJylcbiAgICAgICAgd2lubmVyTWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3BsYXllck5hbWV9IHdpbnMhYFxuICAgIH1cblxuICAgIGNvbnN0IGluaXRWc1BsYXllciA9IChwbGF5ZXJPbmUsIHBsYXllclR3bykgPT4ge1xuICAgICAgICBsb2FkVnNQbGF5ZXIoKTtcbiAgICAgICAgZGlzcGxheU5hbWVzKHBsYXllck9uZSwgcGxheWVyVHdvKVxuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICAgIGRpc3BsYXlTaGlwcygpXG4gICAgfVxuXG4gICAgY29uc3QgaW5pdFZzQ29tcHV0ZXIgPSAocGxheWVyLCBjb21wdXRlcikgPT4ge1xuICAgICAgICBsb2FkVnNDb21wdXRlcigpO1xuICAgICAgICBkaXNwbGF5TmFtZXMocGxheWVyLCBjb21wdXRlcilcbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgICBkaXNwbGF5U2hpcHMoKVxuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlHYW1lTG9nID0gKHBsYXllclR1cm4pID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWxvZycpO1xuICAgICAgICBnYW1lTG9nLnRleHRDb250ZW50ID0gYCR7cGxheWVyVHVybi5uYW1lfSB0dXJuYFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXRWc1BsYXllcixcbiAgICAgICAgaW5pdFZzQ29tcHV0ZXIsXG4gICAgICAgIHJlc2V0Qm9hcmQsXG4gICAgICAgIHBsYWNlUmFuZG9tbHksXG4gICAgICAgIGNoYW5nZVBsYXllcixcbiAgICAgICAgY2hlY2tTaGlwc1BsYWNlZCxcbiAgICAgICAgZ2V0U2hpcENvb3JkaW5hdGVzLFxuICAgICAgICBuZXh0UGxheWVyUGxhY2VtZW50LFxuICAgICAgICBkaXNwbGF5V2lubmVyLFxuICAgICAgICByZXNldEdhbWUsXG4gICAgICAgIGRpc3BsYXlCb3RoQm9hcmRzLFxuICAgICAgICBwbGFjZUNvbXB1dGVyU2hpcHMsXG4gICAgICAgIHZzUGxheWVyRGlzcGxheUJvdGhCb2FyZHMsXG4gICAgICAgIGRpc3BsYXlHYW1lTG9nXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET007IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5LmZyb20oe2xlbmd0aDogMTAgfSkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5zaGlwcyA9IHt9O1xuICB9XG5cbiAgYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoc2hpcE5hbWUsIHNoaXBMZW5ndGgpO1xuICAgIHRoaXMuc2hpcHNbc2hpcE5hbWVdID0gbmV3U2hpcDtcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKGNvb3JkaW5hdGUgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGU7XG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IG5ld1NoaXA7XG4gICAgfSlcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoIXRoaXMuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmJvYXJkW3Jvd11bY29sXTtcbiAgICAgIHNoaXAuZ2V0SGl0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnZXRTaGlwcygpIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLnNoaXBzKTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBjb25zdCBhbGxTaGlwcyA9IHRoaXMuZ2V0U2hpcHMoKTtcbiAgICByZXR1cm4gYWxsU2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLnN1bmspO1xuICB9XG5cbiAgcmVzZXRCb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKCkgPT4gQXJyYXkuZnJvbSh7bGVuZ3RoOiAxMCB9KS5maWxsKG51bGwpKTtcbiAgICB0aGlzLnNoaXBzID0ge307XG4gIH1cbn0iLCJpbXBvcnQgRE9NIGZyb20gXCIuL0RPTS5qc1wiXG5pbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyRmFjdG9yeS5qc1wiXG5cbmNvbnN0IHNldENvdW50ZG93biA9ICgpID0+IHtcbiAgICBjb25zdCBjb3VudGRvd25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZG93bicpXG4gICAgbGV0IGNvdW50ZG93biA9IDU7XG5cbiAgICBjb25zdCBjb3VudGRvd25JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY291bnRkb3duLS07XG4gICAgICAgIGNvdW50ZG93bkVsZW1lbnQudGV4dENvbnRlbnQgPSBjb3VudGRvd247XG4gICAgICAgIGlmIChjb3VudGRvd24gPD0gMCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGRvd25JbnRlcnZhbClcbiAgICAgICAgICAgIGNvdW50ZG93bkVsZW1lbnQudGV4dENvbnRlbnQgPSBcIkNoYW5nZSFcIlxuICAgICAgICB9XG4gICAgfSwgMTAwMClcbiAgICBjb3VudGRvd25FbGVtZW50LnRleHRDb250ZW50ID0gNVxuICAgIHJldHVybiBjb3VudGRvd25JbnRlcnZhbDtcbn1cblxuY29uc3QgZGlzcGxheUNvdW50ZG93biA9ICgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYW5nZS1wbGF5ZXItY29udGFpbmVyJyk7XG4gICAgY29uc3QgZ2FtZUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWxvZycpXG4gICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWNvbnRhaW5lcicpO1xuXG4gICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgZ2FtZUxvZy5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgZ2FtZUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG59XG5cbmNvbnN0IHZzUGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ1BsYXllciAxJylcbiAgICBjb25zdCBwbGF5ZXJUd28gPSBuZXcgUGxheWVyKCdQbGF5ZXIgMicpXG4gICAgcGxheWVyT25lLnNldEVuZW15Qm9hcmQocGxheWVyVHdvLmdldEJvYXJkKCkpXG4gICAgcGxheWVyVHdvLnNldEVuZW15Qm9hcmQocGxheWVyT25lLmdldEJvYXJkKCkpO1xuXG4gICAgY29uc3QgZG9tID0gRE9NKCk7XG4gICAgZG9tLmluaXRWc1BsYXllcihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG5cbiAgICBjb25zdCBwbGF5ZXJBY3RpdmUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBwbGF5ZXJPbmUudHVybiA/IHBsYXllck9uZSA6IHBsYXllclR3b1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRQbGF5ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ubmV4dC1wbGF5ZXInKVxuICAgIG5leHRQbGF5ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmICghZG9tLmNoZWNrU2hpcHNQbGFjZWQoKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLnNoaXAnKTtcbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBOYW1lID0gc2hpcC5pZDtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBwYXJzZUludChzaGlwLmRhdGFzZXQubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IGRvbS5nZXRTaGlwQ29vcmRpbmF0ZXMoc2hpcCwgW3BhcnNlSW50KHNoaXAuZGF0YXNldC5yb3cpLCBwYXJzZUludChzaGlwLmRhdGFzZXQuY29sKV0pO1xuICAgICAgICAgICAgcGxheWVyT25lLmFkZFNoaXAoc2hpcE5hbWUsIHNoaXBMZW5ndGgsIHNoaXBDb29yZGluYXRlcyk7XG4gICAgICAgICAgICBzaGlwLnJlbW92ZSgpO1xuICAgICAgICB9KVxuICAgICAgICBkb20ubmV4dFBsYXllclBsYWNlbWVudCgpXG4gICAgfSlcblxuICAgIGNvbnN0IHN0YXJ0R2FtZVZzUGxheWVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWRvbS5jaGVja1NoaXBzUGxhY2VkKCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5zaGlwJyk7XG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwTmFtZSA9IHNoaXAuaWQ7XG4gICAgICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gcGFyc2VJbnQoc2hpcC5kYXRhc2V0Lmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBkb20uZ2V0U2hpcENvb3JkaW5hdGVzKHNoaXAsIFtwYXJzZUludChzaGlwLmRhdGFzZXQucm93KSwgcGFyc2VJbnQoc2hpcC5kYXRhc2V0LmNvbCldKTtcbiAgICAgICAgICAgIHBsYXllclR3by5hZGRTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBzaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgc2hpcC5yZW1vdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2xsZXItY29udGFpbmVyJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgICAgICBjb25zdCBwbGF5ZXJPbmVDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItb25lIC5jZWxsJyk7XG4gICAgICAgIGNvbnN0IHBsYXllclR3b0NlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllci10d28gLmNlbGwnKTtcbiAgICAgICAgY29uc3QgYWxsU2hpcENvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcC1jb250YWluZXInKVxuICAgICAgICBhbGxTaGlwQ29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKSlcbiAgICAgICAgcGxheWVyT25lLnR1cm4gPSB0cnVlO1xuICAgICAgICBkb20uZGlzcGxheUdhbWVMb2cocGxheWVyQWN0aXZlKCkpXG4gICAgICAgIHBsYXllck9uZUNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheWVyVHdvQWN0aW9uKSlcbiAgICAgICAgcGxheWVyVHdvQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5ZXJPbmVBY3Rpb24pKVxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5zdGFydC1nYW1lJylcbiAgICBzdGFydEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWVWc1BsYXllcilcblxuICAgIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgICAgIGlmIChwbGF5ZXJPbmUudHVybikge1xuICAgICAgICAgICAgcGxheWVyT25lLnR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllclR3by50dXJuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsYXllck9uZS50dXJuID0gdHJ1ZTtcbiAgICAgICAgICAgIHBsYXllclR3by50dXJuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJBY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlUGxheWVyID0gcGxheWVyQWN0aXZlKClcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIHx8IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3MnKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5yb3cpLCBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5jb2wpXVxuICAgICAgICBjb25zdCBpc0hpdCA9IGFjdGl2ZVBsYXllci5wbGF5ZXJBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgICBpZiAoaXNIaXQpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuICAgICAgICAgICAgY29uc3QgaXNHYW1lT3ZlciA9IGFjdGl2ZVBsYXllci5jaGVja0dhbWVPdmVyKCk7XG4gICAgICAgICAgICBpZiAoaXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVBsYXllci50dXJuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlXaW5uZXIoYWN0aXZlUGxheWVyLm5hbWUpO1xuICAgICAgICAgICAgICAgIGRvbS52c1BsYXllckRpc3BsYXlCb3RoQm9hcmRzKClcbiAgICAgICAgICAgICAgICBwbGF5ZXJPbmUucmVzZXQoKVxuICAgICAgICAgICAgICAgIHBsYXllclR3by5yZXNldCgpXG4gICAgICAgICAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lVnNQbGF5ZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzSGl0KSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzcycpXG4gICAgICAgICAgICBjaGFuZ2VUdXJuKClcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldENvdW50ZG93bigpXG4gICAgICAgICAgICAgICAgZGlzcGxheUNvdW50ZG93bigpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5Q291bnRkb3duKClcbiAgICAgICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlHYW1lTG9nKHBsYXllckFjdGl2ZSgpKVxuICAgICAgICAgICAgICAgICAgICBkb20uY2hhbmdlUGxheWVyKClcbiAgICAgICAgICAgICAgICB9LCA2MDAwKVxuICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBsYXllck9uZUFjdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXBsYXllck9uZS50dXJuKSByZXR1cm47XG4gICAgICAgIHBsYXllckFjdGlvbihldmVudClcbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJUd29BY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFwbGF5ZXJUd28udHVybikgcmV0dXJuO1xuICAgICAgICBwbGF5ZXJBY3Rpb24oZXZlbnQpXG4gICAgfVxuXG5cbn1cblxuY29uc3QgdnNDb21wdXRlciA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXInKVxuICAgIGNvbnN0IGNvbXB1dGVyID0gbmV3IENvbXB1dGVyKCdDb21wdXRlcicpXG4gICAgcGxheWVyLnNldEVuZW15Qm9hcmQoY29tcHV0ZXIuZ2V0Qm9hcmQoKSlcbiAgICBjb21wdXRlci5zZXRFbmVteUJvYXJkKHBsYXllci5nZXRCb2FyZCgpKVxuXG4gICAgY29uc3QgZG9tID0gRE9NKCk7XG4gICAgZG9tLmluaXRWc0NvbXB1dGVyKHBsYXllciwgY29tcHV0ZXIpO1xuXG4gICAgY29uc3QgYWN0aXZlUGxheWVyID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gcGxheWVyLnR1cm4gPyBwbGF5ZXIgOiBjb21wdXRlclxuICAgIH1cblxuICAgIGNvbnN0IHBsYWNlQ29tcHV0ZXJTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgZG9tLnBsYWNlQ29tcHV0ZXJTaGlwcygpXG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuc2hpcCcpO1xuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBzaGlwLmlkO1xuICAgICAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHBhcnNlSW50KHNoaXAuZGF0YXNldC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gZG9tLmdldFNoaXBDb29yZGluYXRlcyhzaGlwLCBbcGFyc2VJbnQoc2hpcC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KHNoaXAuZGF0YXNldC5jb2wpXSk7XG4gICAgICAgICAgICBjb21wdXRlci5hZGRTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBzaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgc2hpcC5yZW1vdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRHYW1lVnNDb21wdXRlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFkb20uY2hlY2tTaGlwc1BsYWNlZCgpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuc2hpcCcpO1xuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBzaGlwLmlkO1xuICAgICAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHBhcnNlSW50KHNoaXAuZGF0YXNldC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gZG9tLmdldFNoaXBDb29yZGluYXRlcyhzaGlwLCBbcGFyc2VJbnQoc2hpcC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KHNoaXAuZGF0YXNldC5jb2wpXSk7XG4gICAgICAgICAgICBwbGF5ZXIuYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgc2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIHNoaXAucmVtb3ZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sbGVyLWNvbnRhaW5lcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdHdvIC5jZWxsJyk7XG4gICAgICAgIHBsYXllci50dXJuID0gdHJ1ZTtcbiAgICAgICAgY29tcHV0ZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXllckFjdGlvbikpXG4gICAgICAgIHBsYWNlQ29tcHV0ZXJTaGlwcygpXG5cbiAgICAgICAgZG9tLmRpc3BsYXlHYW1lTG9nKGFjdGl2ZVBsYXllcigpKVxuICAgICAgICBkb20uZGlzcGxheUJvdGhCb2FyZHMoKVxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5zdGFydC1nYW1lJylcbiAgICBzdGFydEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWVWc0NvbXB1dGVyKVxuXG4gICAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHtcbiAgICAgICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICAgICAgICBwbGF5ZXIudHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgY29tcHV0ZXIudHVybiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGF5ZXIudHVybiA9IHRydWU7XG4gICAgICAgICAgICBjb21wdXRlci50dXJuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wdXRlckFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFjb21wdXRlci50dXJuKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGlzSGl0ID0gY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2tzKCk7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb21wdXRlci5nZXRMYXN0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXItb25lLmJvYXJkIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYClcbiAgICAgICAgaWYgKGlzSGl0KSB7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgY29uc3QgaXNHYW1lT3ZlciA9IGNvbXB1dGVyLmNoZWNrR2FtZU92ZXIoKTtcbiAgICAgICAgICAgIGlmIChpc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXIudHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5V2lubmVyKGNvbXB1dGVyLm5hbWUpXG4gICAgICAgICAgICAgICAgcGxheWVyLnJlc2V0KClcbiAgICAgICAgICAgICAgICBjb21wdXRlci5yZXNldCgpXG4gICAgICAgICAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lVnNDb21wdXRlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghaXNIaXQpIHtcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpXG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNoYW5nZVR1cm4oKTtcbiAgICAgICAgICAgIGRvbS5kaXNwbGF5R2FtZUxvZyhhY3RpdmVQbGF5ZXIoKSlcbiAgICAgICAgfSwgMTAwMClcblxuICAgIH1cblxuICAgIGNvbnN0IHBsYXllckFjdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXBsYXllci50dXJuKSByZXR1cm47XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSB8fCBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykpIHJldHVybjtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KSwgcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sKV1cbiAgICAgICAgY29uc3QgaXNIaXQgPSBwbGF5ZXIucGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgaWYgKGlzSGl0KSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGl0JylcbiAgICAgICAgICAgIGNvbnN0IGlzR2FtZU92ZXIgPSBwbGF5ZXIuY2hlY2tHYW1lT3ZlcigpO1xuICAgICAgICAgICAgaWYgKGlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIudHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5V2lubmVyKHBsYXllci5uYW1lKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIucmVzZXQoKVxuICAgICAgICAgICAgICAgIGNvbXB1dGVyLnJlc2V0KClcbiAgICAgICAgICAgICAgICBzdGFydEdhbWVCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWVWc0NvbXB1dGVyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFpc0hpdCkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxuICAgICAgICB9XG4gICAgICAgIGNoYW5nZVR1cm4oKVxuICAgICAgICBkb20uZGlzcGxheUdhbWVMb2coYWN0aXZlUGxheWVyKCkpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29tcHV0ZXJBY3Rpb24oKVxuICAgICAgICB9LCAxMDAwKVxuICAgIH1cblxuXG59XG5cbmNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGRvbSA9IERPTSgpO1xuICAgIFxuICAgIGNvbnN0IHJlc2V0Qm9hcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucmVzZXQtYm9hcmQnKVxuICAgIHJlc2V0Qm9hcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb20ucmVzZXRCb2FyZClcblxuICAgIGNvbnN0IHJhbmRvbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5yYW5kb21pemUnKVxuICAgIHJhbmRvbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvbS5wbGFjZVJhbmRvbWx5KVxuXG4gICAgY29uc3QgcGxheUFnYWluQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXktYWdhaW4nKVxuICAgIHBsYXlBZ2FpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvbS5yZXNldEdhbWUpXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudnMtQ1BVJykpIHtcbiAgICAgICAgICAgIHZzQ29tcHV0ZXIoKVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudnMtcGxheWVyJykpIHtcbiAgICAgICAgICAgIHZzUGxheWVyKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbnBsYXlHYW1lKClcbiIsImltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZEZhY3RvcnkuanNcIjtcblxuZXhwb3J0IHsgUGxheWVyLCBDb21wdXRlciB9XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB0aGlzLmVuZW15Qm9hcmQgPSBudWxsO1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgc2V0RW5lbXlCb2FyZChlbmVteUJvYXJkKSB7XG4gICAgdGhpcy5lbmVteUJvYXJkID0gZW5lbXlCb2FyZDtcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICB9XG4gIFxuICBhZGRTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBjb29yZGluYXRlcykge1xuICAgIHRoaXMuYm9hcmQuYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgY29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgcGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGNoZWNrR2FtZU92ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5lbXlCb2FyZC5hbGxTaGlwc1N1bmsoKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuYm9hcmQucmVzZXRCb2FyZCgpO1xuICB9XG59XG5cbmNsYXNzIENvbXB1dGVyIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpXG4gICAgdGhpcy5hbGxBdHRhY2tzRG9uZSA9IFtdO1xuICAgIHRoaXMuYXR0YWNrSGl0ID0gZmFsc2U7XG4gICAgdGhpcy5hbGxIaXRBdHRhY2tzID0gW107XG4gICAgdGhpcy5uZXh0QXR0YWNrID0gW107XG4gIH1cblxuICBpc0F0dGFja0FscmVhZHlEb25lKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuXG4gICAgZm9yIChsZXQgYXR0YWNrIG9mIHRoaXMuYWxsQXR0YWNrc0RvbmUpIHtcbiAgICAgIGlmIChhdHRhY2tbMF0gPT09IHJvdyAmJiBhdHRhY2tbMV0gPT09IGNvbCkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgIHdoaWxlICh0aGlzLmlzQXR0YWNrQWxyZWFkeURvbmUoW3JvdywgY29sXSkpIHtcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgfVxuXG4gIGNvbXB1dGVyQXR0YWNrcygpIHtcbiAgICBpZiAoIXRoaXMuYXR0YWNrSGl0IHx8ICF0aGlzLm5leHRBdHRhY2subGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2V0QXR0YWNrU3RhdHVzKClcbiAgICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5yYW5kb21Db21wdXRlckF0dGFjaygpO1xuICAgICAgaWYgKGlzSGl0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVySGl0cygpXG4gICAgICB9IGVsc2UgaWYgKCFpc0hpdCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmF0dGFja0hpdCAmJiB0aGlzLm5leHRBdHRhY2subGVuZ3RoKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFjay5zaGlmdCgpO1xuICAgICAgdGhpcy5hbGxBdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKVxuICAgICAgY29uc3QgaXNIaXQgPSB0aGlzLmVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICBpZiAoaXNIaXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcHV0ZXJIaXRzKClcbiAgICAgIH0gZWxzZSBpZiAoIWlzSGl0ICYmICF0aGlzLm5leHRBdHRhY2subGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVzZXRBdHRhY2tTdGF0dXMoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmFuZG9tQ29tcHV0ZXJBdHRhY2soKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLnJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5hbGxBdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gdGhpcy5lbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgY29tcHV0ZXJIaXRzKCkge1xuICAgIHRoaXMuYXR0YWNrSGl0ID0gdHJ1ZTtcbiAgICB0aGlzLmFsbEhpdEF0dGFja3MucHVzaCh0aGlzLmFsbEF0dGFja3NEb25lLmF0KC0xKSk7XG4gICAgY29uc3QgbGFzdEhpdCA9IHRoaXMuYWxsSGl0QXR0YWNrcy5hdCgtMSk7XG4gICAgY29uc3QgbW92ZXMgPSBbWzEsIDBdLCBbLTEsIDBdLCBbMCwgMV0sIFswLCAtMV1dO1xuICAgIG1vdmVzLmZvckVhY2gobW92ZSA9PiB7XG4gICAgICBjb25zdCBuZXdSb3cgPSBtb3ZlWzBdICsgbGFzdEhpdFswXTtcbiAgICAgIGNvbnN0IG5ld0NvbCA9IG1vdmVbMV0gKyBsYXN0SGl0WzFdO1xuICAgICAgaWYgKHRoaXMuaXNBdHRhY2tBbHJlYWR5RG9uZShbbmV3Um93LCBuZXdDb2xdKSB8fCAobmV3Um93IDwgMCB8fCBuZXdDb2wgPCAwIHx8IG5ld1JvdyA+IDkgfHwgbmV3Q29sID4gOSkpIHJldHVybjtcbiAgICAgIHRoaXMubmV4dEF0dGFjay5wdXNoKFtuZXdSb3csIG5ld0NvbF0pO1xuICAgIH0pXG5cbiAgICBpZiAodGhpcy5hbGxIaXRBdHRhY2tzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzSGl0ID0gdGhpcy5hbGxIaXRBdHRhY2tzLmF0KC0yKTtcbiAgICAgIGlmIChsYXN0SGl0WzBdID09PSBwcmV2aW91c0hpdFswXSkge1xuICAgICAgICB0aGlzLm5leHRBdHRhY2sgPSB0aGlzLm5leHRBdHRhY2suZmlsdGVyKG1vdmUgPT4gbW92ZVswXSA9PT0gbGFzdEhpdFswXSk7XG4gICAgICB9IGVsc2UgaWYgKGxhc3RIaXRbMV0gPT09IHByZXZpb3VzSGl0WzFdKSB7XG4gICAgICAgIHRoaXMubmV4dEF0dGFjayA9IHRoaXMubmV4dEF0dGFjay5maWx0ZXIobW92ZSA9PiBtb3ZlWzFdID09PSBsYXN0SGl0WzFdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXNldEF0dGFja1N0YXR1cygpIHtcbiAgICB0aGlzLmF0dGFja0hpdCA9IGZhbHNlO1xuICAgIHRoaXMuYWxsSGl0QXR0YWNrcyA9IFtdO1xuICAgIHRoaXMubmV4dEF0dGFjayA9IFtdO1xuICB9XG5cbiAgZ2V0TGFzdENvb3JkaW5hdGVzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbEF0dGFja3NEb25lLmF0KC0xKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMudG90YWxIaXRzID0gMDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgfVxuXG4gIGdldEhpdCgpIHtcbiAgICB0aGlzLnRvdGFsSGl0cyArPSAxO1xuICAgIHRoaXMuaXNTdW5rKCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgdGhpcy5zdW5rID0gdGhpcy50b3RhbEhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==