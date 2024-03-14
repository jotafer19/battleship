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

    const resetButton = () => {
        const button = document.querySelector('button.reset-board');
        button.addEventListener('click', resetBoard)
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

    const randomButton = () => {
        const button = document.querySelector('button.randomize');
        button.addEventListener('click', placeRandomly)
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

    const addControllerListeners = () => {
        resetButton()
        randomButton();
    }

    const displayBothBoards = () => {
        const playerOne = document.querySelector('.player-one-container');

        playerOne.classList.toggle('inactive');
        playerOne.classList.toggle('active');
    }

    const loadVsPlayer = () => {
        const gameModeContainer = document.querySelector('.game-mode-container');
        const gameContainer = document.querySelector('.game-container');
        const playerOne = document.querySelector('.player-one-container');
        const controllerContainer = document.querySelector('.controller-container');
        const startButton = document.querySelector('button.start-game')

        gameModeContainer.classList.toggle('active');
        gameModeContainer.classList.toggle('inactive');
        gameContainer.classList.toggle('inactive');
        playerOne.classList.toggle('inactive');
        playerOne.classList.toggle('active');
        controllerContainer.classList.toggle('inactive')
        startButton.classList.toggle('inactive')

        addControllerListeners()
    }

    const removeCells = () => {
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach(cell => cell.remove());
    }   

    const resetGame = () => {
        const gameModeContainer = document.querySelector('.game-mode-container')
        const gameContainer = document.querySelector('.game-container')
        const activePlayer = document.querySelector('.game-container .active')
        console.log('hey', activePlayer)
        const nextPlayerButton = document.querySelector('button.next-player')
        const winnerContainer = document.querySelector('.winner-container')

        gameModeContainer.classList.toggle('inactive')
        gameContainer.classList.toggle('inactive')
        activePlayer.classList.toggle('active')
        activePlayer.classList.toggle('inactive')
        nextPlayerButton.classList.toggle('inactive')
        winnerContainer.classList.toggle('inactive')

        removeCells()
    }

    const displayWinner = (playerName) => {
        const winnerContainer = document.querySelector('.winner-container')
        winnerContainer.classList.toggle('inactive')
        
        const winnerMessage = document.querySelector('.winner-message')
        winnerMessage.textContent = `${playerName} wins!`
    }

    return {
        loadVsPlayer,
        displayBoards,
        displayShips,
        resetButton,
        randomButton,
        changePlayer,
        checkShipsPlaced,
        getShipCoordinates,
        nextPlayerPlacement,
        displayWinner,
        resetGame
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



const vsPlayer = () => {
    const playerOne = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Player 1')
    const playerTwo = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Player 2')
    playerOne.setEnemyBoard(playerTwo.getBoard())
    playerTwo.setEnemyBoard(playerOne.getBoard());

    console.log(playerOne.getBoard())
    console.log(playerTwo.getBoard())

    const dom = (0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
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


/***/ }),

/***/ "./src/playerFactory.js":
/*!******************************!*\
  !*** ./src/playerFactory.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
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
    this.position = [];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRCxVQUFVO0FBQ1YsOEJBQThCLGtCQUFrQjtBQUNoRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSxJQUFJLGVBQWUsSUFBSTtBQUNsRztBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxZQUFZO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsR0FBRzs7Ozs7Ozs7Ozs7Ozs7O0FDdllrQjs7QUFFckI7QUFDZjtBQUNBLDhCQUE4QixZQUFZLG9CQUFvQixZQUFZO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsdURBQUk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLFlBQVksb0JBQW9CLFlBQVk7QUFDMUU7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUMwQjtBQUNhOztBQUV2QztBQUNBLDBCQUEwQix5REFBTTtBQUNoQywwQkFBMEIseURBQU07QUFDaEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQixtREFBRztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R3NDOztBQUV2QjtBQUNmO0FBQ0E7QUFDQSxxQkFBcUIsd0RBQUs7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2pDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9ib2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zaGlwRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUJvYXJkcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGxheWVyT25lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLW9uZS5ib2FyZCcpO1xuICAgICAgICBjb25zdCBwbGF5ZXJUd29Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItdHdvLmJvYXJkJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxheWVyT25lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHBsYXllck9uZUNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICAgICAgICAgIHBsYXllck9uZUNlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICAgICAgICAgIHBsYXllck9uZUNlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICAgICAgICAgIHBsYXllck9uZUJvYXJkLmFwcGVuZChwbGF5ZXJPbmVDZWxsKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYXllclR3b0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJUd29DZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJUd29DZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJUd29DZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgICAgICAgICBwbGF5ZXJUd29Cb2FyZC5hcHBlbmQocGxheWVyVHdvQ2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnZW5lcmF0ZVNoaXBzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwc0RhdGEgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2NhcnJpZXInLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogNSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2Rlc3Ryb3llcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3VibWFyaW5lJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdwYXRyb2wnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgY3JlYXRlZFNoaXBzID0gW107XG4gICAgICAgIHNoaXBzRGF0YS5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3U2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbmV3U2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgICAgICBuZXdTaGlwLnNldEF0dHJpYnV0ZSgnaWQnLCBzaGlwLm5hbWUpO1xuICAgICAgICAgICAgbmV3U2hpcC5kcmFnZ2FibGUgPSBcInRydWVcIjtcbiAgICAgICAgICAgIG5ld1NoaXAuZGF0YXNldC5sZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICAgICAgICAgIG5ld1NoaXAuZGF0YXNldC5kaXJlY3Rpb24gPSBcInJvd1wiO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcFBhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBzaGlwUGFydC5jbGFzc0xpc3QuYWRkKCdzaGlwLXBhcnQnKTtcbiAgICAgICAgICAgICAgICBuZXdTaGlwLmFwcGVuZChzaGlwUGFydClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZWRTaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBjcmVhdGVkU2hpcHM7XG4gICAgfVxuXG4gICAgY29uc3QgaXNJblRoZUJvYXJkID0gKGRyYWdnZWRTaGlwLCBzdGFydENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHBhcnNlSW50KGRyYWdnZWRTaGlwLmRhdGFzZXQubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gZHJhZ2dlZFNoaXAuZGF0YXNldC5kaXJlY3Rpb247XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzdGFydENvb3JkaW5hdGVzO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgICAgICAgIGlmIChjb2wgKyBsZW5ndGggLSAxIDwgMCB8fCBjb2wgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgICAgICAgaWYgKHJvdyArIGxlbmd0aCAtIDEgPCAwIHx8IHJvdyArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRTaGlwQ29vcmRpbmF0ZXMgPSAoc2hpcCwgc3RhcnRDb29yZGluYXRlcykgPT4ge1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gc3RhcnRDb29yZGluYXRlcztcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gcGFyc2VJbnQoc2hpcC5kYXRhc2V0Lmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHNoaXAuZGF0YXNldC5kaXJlY3Rpb247XG5cbiAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gW107XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjb2w7IGkgPCBjb2wgKyBsZW5ndGg7IGkrKykgc2hpcENvb3JkaW5hdGVzLnB1c2goW3JvdywgaV0pXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgbGVuZ3RoOyBpKyspIHNoaXBDb29yZGluYXRlcy5wdXNoKFtpLCBjb2xdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXM7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0QWxsQ2VsbHNVc2VkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxTaGlwc1BsYWNlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLmNlbGwgLnNoaXA6bm90KC5kcmFnZ2VkKScpO1xuICAgICAgICBjb25zdCBhbGxDZWxsc1VzZWQgPSBbXTtcbiAgICAgICAgYWxsU2hpcHNQbGFjZWQuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0aW5nQ29vcmRpbmF0ZXMgPSBbcGFyc2VJbnQoc2hpcC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KHNoaXAuZGF0YXNldC5jb2wpXTtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IGdldFNoaXBDb29yZGluYXRlcyhzaGlwLCBzdGFydGluZ0Nvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIHNoaXBDb29yZGluYXRlcy5mb3JFYWNoKGNvb3JkaW5hdGUgPT4gYWxsQ2VsbHNVc2VkLnB1c2goY29vcmRpbmF0ZSkpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWxsQ2VsbHNVc2VkO1xuICAgIH1cblxuICAgIGNvbnN0IGFyZUNvb3JkaW5hdGVzQWRqYWNlbnQgPSAoZHJhZ2dlZFNoaXBDb29yZGluYXRlcywgc2hpcHNQbGFjZWRDb29yZGluYXRlcykgPT4ge1xuICAgICAgICBmb3IgKGxldCBjb29yZDEgb2YgZHJhZ2dlZFNoaXBDb29yZGluYXRlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29vcmQyIG9mIHNoaXBzUGxhY2VkQ29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3dEaWZmID0gTWF0aC5hYnMoY29vcmQxWzBdIC0gY29vcmQyWzBdKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xEaWZmID0gTWF0aC5hYnMoY29vcmQxWzFdIC0gY29vcmQyWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAocm93RGlmZiA8PSAxICYmIGNvbERpZmYgPD0gMSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzVmFsaWRQb3NpdGlvbiA9IChkcmFnZ2VkU2hpcCwgc3RhcnRDb29yZGluYXRlcykgPT4ge1xuICAgICAgICBpZiAoIWlzSW5UaGVCb2FyZChkcmFnZ2VkU2hpcCwgc3RhcnRDb29yZGluYXRlcykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgZHJhZ2dlZFNoaXBDb29yZGluYXRlcyA9IGdldFNoaXBDb29yZGluYXRlcyhkcmFnZ2VkU2hpcCwgc3RhcnRDb29yZGluYXRlcyk7XG4gICAgICAgIGNvbnN0IHNoaXBzUGxhY2VkQ29vcmRpbmF0ZXMgPSBnZXRBbGxDZWxsc1VzZWQoKTtcbiAgICAgICAgaWYgKHNoaXBzUGxhY2VkQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoYXJlQ29vcmRpbmF0ZXNBZGphY2VudChkcmFnZ2VkU2hpcENvb3JkaW5hdGVzLCBzaGlwc1BsYWNlZENvb3JkaW5hdGVzKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ1N0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgZXZlbnQudGFyZ2V0LmlkKTtcblxuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGRyYWdFbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2RyYWdnZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnT3ZlciA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXBDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaGlwJylcblxuICAgICAgICBpZiAoIXNoaXAucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0Q29vcmRpbmF0ZXMgPSBbcGFyc2VJbnQoc2hpcC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KHNoaXAuZGF0YXNldC5jb2wpXTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gc2hpcC5kYXRhc2V0LmRpcmVjdGlvbjtcblxuICAgICAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoJ2RyYWdnZWQnKVxuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgICAgICAgIHNoaXAuZGF0YXNldC5kaXJlY3Rpb24gPSBcImNvbFwiO1xuICAgICAgICAgICAgaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpID8gc2hpcC5zdHlsZS5ncmlkQXV0b0Zsb3cgPSBcInJvd1wiIDogc2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJyb3dcIlxuICAgICAgICAgICAgaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpID8gc2hpcC5zdHlsZS5ncmlkQXV0b0Zsb3cgPSBcImNvbHVtblwiIDogc2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwiY29sXCI7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoJ2RyYWdnZWQnKVxuICAgIH1cblxuICAgIGNvbnN0IGRyYWdFbnRlciA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpXG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ0xlYXZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJylcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnRHJvcCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBbcGFyc2VJbnQoY2VsbC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KGNlbGwuZGF0YXNldC5jb2wpXTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVTaGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghaXNWYWxpZFBvc2l0aW9uKGRyYWdnYWJsZVNoaXAsIFtyb3csIGNvbF0pIHx8IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwLXBhcnQnKSkgcmV0dXJuO1xuICAgICAgICAgICAgZHJhZ2dhYmxlU2hpcC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIGRyYWdnYWJsZVNoaXAuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICBkcmFnZ2FibGVTaGlwLmRhdGFzZXQuY29sID0gY29sO1xuICAgICAgICAgICAgY2VsbC5hcHBlbmQoZHJhZ2dhYmxlU2hpcCk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5zaGlwJyk7XG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydClcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGRyYWdFbmQpXG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hpcENsaWNrKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBib2FyZExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWxsQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5ib2FyZCAuY2VsbCcpO1xuICAgICAgICBhbGxDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBkaXNwbGF5U2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZSAuc2hpcC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBnZW5lcmF0ZVNoaXBzKCk7XG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBzaGlwc0NvbnRhaW5lci5hcHBlbmQoc2hpcCk7XG4gICAgICAgIH0pXG4gICAgICAgIHNoaXBMaXN0ZW5lcnMoKVxuICAgICAgICBib2FyZExpc3RlbmVycygpXG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2hpcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUgLnNoaXAtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuc2hpcCcpO1xuXG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiBzaGlwLnJlbW92ZSgpKVxuICAgICAgICBnZW5lcmF0ZVNoaXBzKCkuZm9yRWFjaChzaGlwID0+IHNoaXBDb250YWluZXIuYXBwZW5kKHNoaXApKVxuICAgICAgICBzaGlwTGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICBjb25zdCByZXNldEJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnJlc2V0LWJvYXJkJyk7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc2V0Qm9hcmQpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0UmFuZG9tQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICAgIH1cblxuICAgIGNvbnN0IGdldFJhbmRvbURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cbiAgICAgICAgcmV0dXJuIHJhbmRvbU51bWJlciA9PT0gMCA/IFwicm93XCIgOiBcImNvbFwiO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZURpcmVjdGlvbiA9IChzaGlwKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGdldFJhbmRvbURpcmVjdGlvbigpO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAgICAgICBzaGlwLnN0eWxlLmdyaWRBdXRvRmxvdyA9IFwicm93XCI7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJjb2xcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBsYWNlUmFuZG9tbHkgPSAoKSA9PiB7XG4gICAgICAgIHJlc2V0Qm9hcmQoKTtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5zaGlwLWNvbnRhaW5lciAuc2hpcCcpO1xuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY2hhbmdlRGlyZWN0aW9uKHNoaXApO1xuICAgICAgICAgICAgbGV0IFtyb3csIGNvbF0gPSBnZXRSYW5kb21Db29yZGluYXRlcygpO1xuICAgICAgICAgICAgd2hpbGUgKCFpc1ZhbGlkUG9zaXRpb24oc2hpcCwgW3JvdywgY29sXSkpIFtyb3csIGNvbF0gPSBnZXRSYW5kb21Db29yZGluYXRlcygpO1xuICAgICAgICAgICAgc2hpcC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIHNoaXAuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuY29sID0gY29sO1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY3RpdmUgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgICAgICAgIGNlbGwuYXBwZW5kKHNoaXApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHJhbmRvbUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnJhbmRvbWl6ZScpO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVJhbmRvbWx5KVxuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrU2hpcHNQbGFjZWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuY2VsbCAuc2hpcCcpO1xuXG4gICAgICAgIHJldHVybiBhbGxTaGlwcy5sZW5ndGggPj0gNTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VQbGF5ZXJEaXNwbGF5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLW9uZS1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcGxheWVyVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10d28tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IG5leHRQbGF5ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ubmV4dC1wbGF5ZXInKTtcbiAgICAgICAgY29uc3Qgc3RhcnRHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnN0YXJ0LWdhbWUnKTtcblxuICAgICAgICBwbGF5ZXJPbmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIHBsYXllck9uZS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICBwbGF5ZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIHBsYXllclR3by5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICBuZXh0UGxheWVyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHN0YXJ0R2FtZS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFBsYXllclBsYWNlbWVudCA9ICgpID0+IHtcbiAgICAgICAgY2hhbmdlUGxheWVyRGlzcGxheSgpXG4gICAgICAgIGRpc3BsYXlTaGlwcygpO1xuICAgIH1cblxuXG4gICAgY29uc3QgY2hhbmdlUGxheWVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3RpdmVQbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLmFjdGl2ZScpO1xuICAgICAgICBjb25zdCBpbmFjdGl2ZVBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIuaW5hY3RpdmUnKTtcblxuICAgICAgICBhY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgYWN0aXZlUGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgaW5hY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgaW5hY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IGFkZENvbnRyb2xsZXJMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIHJlc2V0QnV0dG9uKClcbiAgICAgICAgcmFuZG9tQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheUJvdGhCb2FyZHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllck9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItb25lLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHBsYXllck9uZS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICBwbGF5ZXJPbmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9hZFZzUGxheWVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lTW9kZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLW1vZGUtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcGxheWVyT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1vbmUtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbGxlci1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uc3RhcnQtZ2FtZScpXG5cbiAgICAgICAgZ2FtZU1vZGVDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIGdhbWVNb2RlQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIGdhbWVDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgcGxheWVyT25lLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHBsYXllck9uZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgY29udHJvbGxlckNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcblxuICAgICAgICBhZGRDb250cm9sbGVyTGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVDZWxscyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWxsQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgICAgICBhbGxDZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5yZW1vdmUoKSk7XG4gICAgfSAgIFxuXG4gICAgY29uc3QgcmVzZXRHYW1lID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lTW9kZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLW1vZGUtY29udGFpbmVyJylcbiAgICAgICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWNvbnRhaW5lcicpXG4gICAgICAgIGNvbnN0IGFjdGl2ZVBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWNvbnRhaW5lciAuYWN0aXZlJylcbiAgICAgICAgY29uc29sZS5sb2coJ2hleScsIGFjdGl2ZVBsYXllcilcbiAgICAgICAgY29uc3QgbmV4dFBsYXllckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5uZXh0LXBsYXllcicpXG4gICAgICAgIGNvbnN0IHdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXItY29udGFpbmVyJylcblxuICAgICAgICBnYW1lTW9kZUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIGdhbWVDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgICAgICBhY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgYWN0aXZlUGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgbmV4dFBsYXllckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIHdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG5cbiAgICAgICAgcmVtb3ZlQ2VsbHMoKVxuICAgIH1cblxuICAgIGNvbnN0IGRpc3BsYXlXaW5uZXIgPSAocGxheWVyTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLWNvbnRhaW5lcicpXG4gICAgICAgIHdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIFxuICAgICAgICBjb25zdCB3aW5uZXJNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5lci1tZXNzYWdlJylcbiAgICAgICAgd2lubmVyTWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3BsYXllck5hbWV9IHdpbnMhYFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRWc1BsYXllcixcbiAgICAgICAgZGlzcGxheUJvYXJkcyxcbiAgICAgICAgZGlzcGxheVNoaXBzLFxuICAgICAgICByZXNldEJ1dHRvbixcbiAgICAgICAgcmFuZG9tQnV0dG9uLFxuICAgICAgICBjaGFuZ2VQbGF5ZXIsXG4gICAgICAgIGNoZWNrU2hpcHNQbGFjZWQsXG4gICAgICAgIGdldFNoaXBDb29yZGluYXRlcyxcbiAgICAgICAgbmV4dFBsYXllclBsYWNlbWVudCxcbiAgICAgICAgZGlzcGxheVdpbm5lcixcbiAgICAgICAgcmVzZXRHYW1lXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET007IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5LmZyb20oe2xlbmd0aDogMTAgfSkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5zaGlwcyA9IHt9O1xuICB9XG5cbiAgYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoc2hpcE5hbWUsIHNoaXBMZW5ndGgpO1xuICAgIHRoaXMuc2hpcHNbc2hpcE5hbWVdID0gbmV3U2hpcDtcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKGNvb3JkaW5hdGUgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGU7XG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IG5ld1NoaXA7XG4gICAgfSlcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoIXRoaXMuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmJvYXJkW3Jvd11bY29sXTtcbiAgICAgIHNoaXAuZ2V0SGl0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnZXRTaGlwcygpIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLnNoaXBzKTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBjb25zdCBhbGxTaGlwcyA9IHRoaXMuZ2V0U2hpcHMoKTtcbiAgICByZXR1cm4gYWxsU2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLnN1bmspO1xuICB9XG5cbiAgcmVzZXRCb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKCkgPT4gQXJyYXkuZnJvbSh7bGVuZ3RoOiAxMCB9KS5maWxsKG51bGwpKTtcbiAgICB0aGlzLnNoaXBzID0ge307XG4gIH1cbn0iLCJpbXBvcnQgRE9NIGZyb20gXCIuL0RPTS5qc1wiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllckZhY3RvcnkuanNcIlxuXG5jb25zdCB2c1BsYXllciA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKCdQbGF5ZXIgMScpXG4gICAgY29uc3QgcGxheWVyVHdvID0gbmV3IFBsYXllcignUGxheWVyIDInKVxuICAgIHBsYXllck9uZS5zZXRFbmVteUJvYXJkKHBsYXllclR3by5nZXRCb2FyZCgpKVxuICAgIHBsYXllclR3by5zZXRFbmVteUJvYXJkKHBsYXllck9uZS5nZXRCb2FyZCgpKTtcblxuICAgIGNvbnNvbGUubG9nKHBsYXllck9uZS5nZXRCb2FyZCgpKVxuICAgIGNvbnNvbGUubG9nKHBsYXllclR3by5nZXRCb2FyZCgpKVxuXG4gICAgY29uc3QgZG9tID0gRE9NKCk7XG4gICAgZG9tLmxvYWRWc1BsYXllcigpO1xuICAgIGRvbS5kaXNwbGF5Qm9hcmRzKCk7XG4gICAgZG9tLmRpc3BsYXlTaGlwcygpXG5cbiAgICBjb25zdCBuZXh0UGxheWVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm5leHQtcGxheWVyJylcbiAgICBuZXh0UGxheWVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAoIWRvbS5jaGVja1NoaXBzUGxhY2VkKCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5zaGlwJyk7XG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwTmFtZSA9IHNoaXAuaWQ7XG4gICAgICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gcGFyc2VJbnQoc2hpcC5kYXRhc2V0Lmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBkb20uZ2V0U2hpcENvb3JkaW5hdGVzKHNoaXAsIFtwYXJzZUludChzaGlwLmRhdGFzZXQucm93KSwgcGFyc2VJbnQoc2hpcC5kYXRhc2V0LmNvbCldKTtcbiAgICAgICAgICAgIHBsYXllck9uZS5hZGRTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBzaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgc2hpcC5yZW1vdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgZG9tLm5leHRQbGF5ZXJQbGFjZW1lbnQoKVxuICAgIH0pXG5cbiAgICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuICAgICAgICBpZiAocGxheWVyT25lLnR1cm4pIHtcbiAgICAgICAgICAgIHBsYXllck9uZS50dXJuID0gZmFsc2U7XG4gICAgICAgICAgICBwbGF5ZXJUd28udHVybiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGF5ZXJPbmUudHVybiA9IHRydWU7XG4gICAgICAgICAgICBwbGF5ZXJUd28udHVybiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcGxheWVyQWN0aW9uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVBsYXllciA9IHBsYXllck9uZS50dXJuID8gcGxheWVyT25lIDogcGxheWVyVHdvO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGl0JykgfHwgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW3BhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbCldXG4gICAgICAgIGNvbnN0IGlzSGl0ID0gYWN0aXZlUGxheWVyLnBsYXllckF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICAgIGlmIChpc0hpdCkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG4gICAgICAgICAgICBjb25zdCBpc0dhbWVPdmVyID0gYWN0aXZlUGxheWVyLmNoZWNrR2FtZU92ZXIoKTtcbiAgICAgICAgICAgIGlmIChpc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlUGxheWVyLnR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheVdpbm5lcihhY3RpdmVQbGF5ZXIubmFtZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheS1hZ2FpbicpXG4gICAgICAgICAgICAgICAgcmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5yZXNldEdhbWUoKVxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJPbmUucmVzZXQoKVxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJUd28ucmVzZXQoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzSGl0KSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzcycpXG4gICAgICAgICAgICBjaGFuZ2VUdXJuKClcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvbS5jaGFuZ2VQbGF5ZXIoKVxuICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBsYXllck9uZUFjdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXBsYXllck9uZS50dXJuKSByZXR1cm47XG4gICAgICAgIHBsYXllckFjdGlvbihldmVudClcbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJUd29BY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFwbGF5ZXJUd28udHVybikgcmV0dXJuO1xuICAgICAgICBwbGF5ZXJBY3Rpb24oZXZlbnQpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnN0YXJ0LWdhbWUnKVxuICAgIHN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKCFkb20uY2hlY2tTaGlwc1BsYWNlZCgpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuc2hpcCcpO1xuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBzaGlwLmlkO1xuICAgICAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHBhcnNlSW50KHNoaXAuZGF0YXNldC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gZG9tLmdldFNoaXBDb29yZGluYXRlcyhzaGlwLCBbcGFyc2VJbnQoc2hpcC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KHNoaXAuZGF0YXNldC5jb2wpXSk7XG4gICAgICAgICAgICBwbGF5ZXJUd28uYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgc2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIHNoaXAucmVtb3ZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sbGVyLWNvbnRhaW5lcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgY29uc3QgcGxheWVyT25lQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLW9uZSAuY2VsbCcpO1xuICAgICAgICBjb25zdCBwbGF5ZXJUd29DZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdHdvIC5jZWxsJyk7XG4gICAgICAgIHBsYXllck9uZS50dXJuID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyT25lQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5ZXJUd29BY3Rpb24pKVxuICAgICAgICBwbGF5ZXJUd29DZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXllck9uZUFjdGlvbikpXG4gICAgfSlcbn1cblxuY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xvc2VzdCgnLnZzLUNQVScpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3B1JylcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQuY2xvc2VzdCgnLnZzLXBsYXllcicpKSB7XG4gICAgICAgICAgICB2c1BsYXllcigpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5wbGF5R2FtZSgpXG4iLCJpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRGYWN0b3J5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB0aGlzLmVuZW15Qm9hcmQgPSBudWxsO1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgc2V0RW5lbXlCb2FyZChlbmVteUJvYXJkKSB7XG4gICAgdGhpcy5lbmVteUJvYXJkID0gZW5lbXlCb2FyZDtcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICB9XG4gIFxuICBhZGRTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBjb29yZGluYXRlcykge1xuICAgIHRoaXMuYm9hcmQuYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgY29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgcGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGNoZWNrR2FtZU92ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5lbXlCb2FyZC5hbGxTaGlwc1N1bmsoKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuYm9hcmQucmVzZXRCb2FyZCgpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5wb3NpdGlvbiA9IFtdO1xuICAgIHRoaXMudG90YWxIaXRzID0gMDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgfVxuXG4gIGdldEhpdCgpIHtcbiAgICB0aGlzLnRvdGFsSGl0cyArPSAxO1xuICAgIHRoaXMuaXNTdW5rKCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgdGhpcy5zdW5rID0gdGhpcy50b3RhbEhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==