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
        playerOne.classList.toggle('active')
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

        gameModeContainer.classList.toggle('inactive')
        gameContainer.classList.toggle('inactive')
        allShipContainer.forEach(container => container.classList.toggle('inactive'))
        allPlayerContainer.forEach(container => container.classList.toggle('inactive'))
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
        loadVsComputer,
        displayBoards,
        displayShips,
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
        vsPlayerDisplayBothBoards
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
    const playerOne = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__.Player('Player 1')
    const playerTwo = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__.Player('Player 2')
    playerOne.setEnemyBoard(playerTwo.getBoard())
    playerTwo.setEnemyBoard(playerOne.getBoard());

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
                dom.vsPlayerDisplayBothBoards()
                playerOne.reset()
                playerTwo.reset()
                startGameButton.removeEventListener('click', startGameVsPlayer)
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


}

const vsComputer = () => {
    const player = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__.Player('Player')
    const computer = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_1__.Computer('Computer')
    player.setEnemyBoard(computer.getBoard())
    computer.setEnemyBoard(player.getBoard())

    const dom = (0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    dom.loadVsComputer();
    dom.displayBoards();
    dom.displayShips()

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
    }

    const startGameVsPlayer = () => {
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
        document.querySelector('.player.active').classList.toggle('active')
        player.turn = true;
        computerCells.forEach(cell => cell.addEventListener('click', playerAction))
        placeComputerShips()
        dom.displayBothBoards()
    }

    const startGameButton = document.querySelector('button.start-game')
    startGameButton.addEventListener('click', startGameVsPlayer)

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
                startGameButton.removeEventListener('click', startGameVsPlayer)
            }
        } else if (!isHit) {
            cell.classList.add('miss')
        }
        changeTurn();
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
                startGameButton.removeEventListener('click', startGameVsPlayer)
            }
        } else if (!isHit) {
            event.target.classList.add('miss')
        }
        changeTurn()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRCxVQUFVO0FBQ1YsOEJBQThCLGtCQUFrQjtBQUNoRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSxJQUFJLGVBQWUsSUFBSTtBQUNsRztBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFlBQVk7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEdBQUc7Ozs7Ozs7Ozs7Ozs7OztBQ3Jaa0I7O0FBRXJCO0FBQ2Y7QUFDQSw4QkFBOEIsWUFBWSxvQkFBb0IsWUFBWTtBQUMxRTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLHVEQUFJO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixZQUFZLG9CQUFvQixZQUFZO0FBQzFFO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFDMEI7QUFDMkI7O0FBRXJEO0FBQ0EsMEJBQTBCLHFEQUFNO0FBQ2hDLDBCQUEwQixxREFBTTtBQUNoQztBQUNBOztBQUVBLGdCQUFnQixtREFBRztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsdUJBQXVCLHFEQUFNO0FBQzdCLHlCQUF5Qix1REFBUTtBQUNqQztBQUNBOztBQUVBLGdCQUFnQixtREFBRztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUYsSUFBSSxlQUFlLElBQUk7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7OztBQUdBOztBQUVBO0FBQ0EsZ0JBQWdCLG1EQUFHO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hPc0M7O0FBRVg7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix3REFBSztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvSGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc2hpcEZhY3RvcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRE9NID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlCb2FyZHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsYXllck9uZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1vbmUuYm9hcmQnKTtcbiAgICAgICAgY29uc3QgcGxheWVyVHdvQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR3by5ib2FyZCcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYXllck9uZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJPbmVDZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJPbmVDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJPbmVDZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgICAgICAgICBwbGF5ZXJPbmVCb2FyZC5hcHBlbmQocGxheWVyT25lQ2VsbCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJUd29DZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgcGxheWVyVHdvQ2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICAgICAgICAgICAgcGxheWVyVHdvQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgICAgICAgICAgcGxheWVyVHdvQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgICAgICAgICAgcGxheWVyVHdvQm9hcmQuYXBwZW5kKHBsYXllclR3b0NlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ2VuZXJhdGVTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2hpcHNEYXRhID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdjYXJyaWVyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdiYXR0bGVzaGlwJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdkZXN0cm95ZXInLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3N1Ym1hcmluZScsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncGF0cm9sJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDIsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRTaGlwcyA9IFtdO1xuICAgICAgICBzaGlwc0RhdGEuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1NoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIG5ld1NoaXAuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgbmV3U2hpcC5zZXRBdHRyaWJ1dGUoJ2lkJywgc2hpcC5uYW1lKTtcbiAgICAgICAgICAgIG5ld1NoaXAuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gICAgICAgICAgICBuZXdTaGlwLmRhdGFzZXQubGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgICAgICAgICBuZXdTaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJyb3dcIjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBQYXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgc2hpcFBhcnQuY2xhc3NMaXN0LmFkZCgnc2hpcC1wYXJ0Jyk7XG4gICAgICAgICAgICAgICAgbmV3U2hpcC5hcHBlbmQoc2hpcFBhcnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVkU2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gY3JlYXRlZFNoaXBzO1xuICAgIH1cblxuICAgIGNvbnN0IGlzSW5UaGVCb2FyZCA9IChkcmFnZ2VkU2hpcCwgc3RhcnRDb29yZGluYXRlcykgPT4ge1xuICAgICAgICBjb25zdCBsZW5ndGggPSBwYXJzZUludChkcmFnZ2VkU2hpcC5kYXRhc2V0Lmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGRyYWdnZWRTaGlwLmRhdGFzZXQuZGlyZWN0aW9uO1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gc3RhcnRDb29yZGluYXRlcztcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICAgICAgICBpZiAoY29sICsgbGVuZ3RoIC0gMSA8IDAgfHwgY29sICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY29sXCIpIHtcbiAgICAgICAgICAgIGlmIChyb3cgKyBsZW5ndGggLSAxIDwgMCB8fCByb3cgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0U2hpcENvb3JkaW5hdGVzID0gKHNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpID0+IHtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IHN0YXJ0Q29vcmRpbmF0ZXM7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHBhcnNlSW50KHNoaXAuZGF0YXNldC5sZW5ndGgpO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uO1xuXG4gICAgICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sICsgbGVuZ3RoOyBpKyspIHNoaXBDb29yZGluYXRlcy5wdXNoKFtyb3csIGldKVxuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdyArIGxlbmd0aDsgaSsrKSBzaGlwQ29vcmRpbmF0ZXMucHVzaChbaSwgY29sXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGdldEFsbENlbGxzVXNlZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWxsU2hpcHNQbGFjZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5jZWxsIC5zaGlwOm5vdCguZHJhZ2dlZCknKTtcbiAgICAgICAgY29uc3QgYWxsQ2VsbHNVc2VkID0gW107XG4gICAgICAgIGFsbFNoaXBzUGxhY2VkLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdGFydGluZ0Nvb3JkaW5hdGVzID0gW3BhcnNlSW50KHNoaXAuZGF0YXNldC5yb3cpLCBwYXJzZUludChzaGlwLmRhdGFzZXQuY29sKV07XG4gICAgICAgICAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBnZXRTaGlwQ29vcmRpbmF0ZXMoc2hpcCwgc3RhcnRpbmdDb29yZGluYXRlcyk7XG4gICAgICAgICAgICBzaGlwQ29vcmRpbmF0ZXMuZm9yRWFjaChjb29yZGluYXRlID0+IGFsbENlbGxzVXNlZC5wdXNoKGNvb3JkaW5hdGUpKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFsbENlbGxzVXNlZDtcbiAgICB9XG5cbiAgICBjb25zdCBhcmVDb29yZGluYXRlc0FkamFjZW50ID0gKGRyYWdnZWRTaGlwQ29vcmRpbmF0ZXMsIHNoaXBzUGxhY2VkQ29vcmRpbmF0ZXMpID0+IHtcbiAgICAgICAgZm9yIChsZXQgY29vcmQxIG9mIGRyYWdnZWRTaGlwQ29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvb3JkMiBvZiBzaGlwc1BsYWNlZENvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93RGlmZiA9IE1hdGguYWJzKGNvb3JkMVswXSAtIGNvb3JkMlswXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sRGlmZiA9IE1hdGguYWJzKGNvb3JkMVsxXSAtIGNvb3JkMlsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJvd0RpZmYgPD0gMSAmJiBjb2xEaWZmIDw9IDEpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1ZhbGlkUG9zaXRpb24gPSAoZHJhZ2dlZFNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpID0+IHtcbiAgICAgICAgaWYgKCFpc0luVGhlQm9hcmQoZHJhZ2dlZFNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGRyYWdnZWRTaGlwQ29vcmRpbmF0ZXMgPSBnZXRTaGlwQ29vcmRpbmF0ZXMoZHJhZ2dlZFNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpO1xuICAgICAgICBjb25zdCBzaGlwc1BsYWNlZENvb3JkaW5hdGVzID0gZ2V0QWxsQ2VsbHNVc2VkKCk7XG4gICAgICAgIGlmIChzaGlwc1BsYWNlZENvb3JkaW5hdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGFyZUNvb3JkaW5hdGVzQWRqYWNlbnQoZHJhZ2dlZFNoaXBDb29yZGluYXRlcywgc2hpcHNQbGFjZWRDb29yZGluYXRlcykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGRyYWdTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIGV2ZW50LnRhcmdldC5pZCk7XG5cbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnRW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdkcmFnZ2VkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ092ZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgc2hpcCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hpcCcpXG5cbiAgICAgICAgaWYgKCFzaGlwLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzdGFydENvb3JkaW5hdGVzID0gW3BhcnNlSW50KHNoaXAuZGF0YXNldC5yb3cpLCBwYXJzZUludChzaGlwLmRhdGFzZXQuY29sKV07XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHNoaXAuZGF0YXNldC5kaXJlY3Rpb247XG5cbiAgICAgICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKCdkcmFnZ2VkJylcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJjb2xcIjtcbiAgICAgICAgICAgIGlzVmFsaWRQb3NpdGlvbihzaGlwLCBzdGFydENvb3JkaW5hdGVzKSA/IHNoaXAuc3R5bGUuZ3JpZEF1dG9GbG93ID0gXCJyb3dcIiA6IHNoaXAuZGF0YXNldC5kaXJlY3Rpb24gPSBcInJvd1wiO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgICAgICAgc2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwicm93XCJcbiAgICAgICAgICAgIGlzVmFsaWRQb3NpdGlvbihzaGlwLCBzdGFydENvb3JkaW5hdGVzKSA/IHNoaXAuc3R5bGUuZ3JpZEF1dG9GbG93ID0gXCJjb2x1bW5cIiA6IHNoaXAuZGF0YXNldC5kaXJlY3Rpb24gPSBcImNvbFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKCdkcmFnZ2VkJylcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKVxuICAgIH1cblxuICAgIGNvbnN0IGRyYWdMZWF2ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpXG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ0Ryb3AgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gW3BhcnNlSW50KGNlbGwuZGF0YXNldC5yb3cpLCBwYXJzZUludChjZWxsLmRhdGFzZXQuY29sKV07XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJylcblxuICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlU2hpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIWlzVmFsaWRQb3NpdGlvbihkcmFnZ2FibGVTaGlwLCBbcm93LCBjb2xdKSB8fCBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2hpcC1wYXJ0JykpIHJldHVybjtcbiAgICAgICAgICAgIGRyYWdnYWJsZVNoaXAuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICBkcmFnZ2FibGVTaGlwLmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgICAgICAgZHJhZ2dhYmxlU2hpcC5kYXRhc2V0LmNvbCA9IGNvbDtcbiAgICAgICAgICAgIGNlbGwuYXBwZW5kKGRyYWdnYWJsZVNoaXApO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuc2hpcCcpO1xuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpXG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBkcmFnRW5kKVxuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNoaXBDbGljayk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuYm9hcmQgLmNlbGwnKTtcbiAgICAgICAgYWxsQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3Zlcik7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcmFnRHJvcCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheVNoaXBzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUgLnNoaXAtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gZ2VuZXJhdGVTaGlwcygpO1xuICAgICAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgc2hpcHNDb250YWluZXIuYXBwZW5kKHNoaXApO1xuICAgICAgICB9KVxuICAgICAgICBzaGlwTGlzdGVuZXJzKClcbiAgICAgICAgYm9hcmRMaXN0ZW5lcnMoKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc2V0Qm9hcmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlIC5zaGlwLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLnNoaXAnKTtcblxuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4gc2hpcC5yZW1vdmUoKSlcbiAgICAgICAgZ2VuZXJhdGVTaGlwcygpLmZvckVhY2goc2hpcCA9PiBzaGlwQ29udGFpbmVyLmFwcGVuZChzaGlwKSlcbiAgICAgICAgc2hpcExpc3RlbmVycygpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0UmFuZG9tQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICAgIH1cblxuICAgIGNvbnN0IGdldFJhbmRvbURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cbiAgICAgICAgcmV0dXJuIHJhbmRvbU51bWJlciA9PT0gMCA/IFwicm93XCIgOiBcImNvbFwiO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZURpcmVjdGlvbiA9IChzaGlwKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGdldFJhbmRvbURpcmVjdGlvbigpO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAgICAgICBzaGlwLnN0eWxlLmdyaWRBdXRvRmxvdyA9IFwicm93XCI7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJjb2xcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBsYWNlUmFuZG9tbHkgPSAoKSA9PiB7XG4gICAgICAgIHJlc2V0Qm9hcmQoKTtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5zaGlwLWNvbnRhaW5lciAuc2hpcCcpO1xuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY2hhbmdlRGlyZWN0aW9uKHNoaXApO1xuICAgICAgICAgICAgbGV0IFtyb3csIGNvbF0gPSBnZXRSYW5kb21Db29yZGluYXRlcygpO1xuICAgICAgICAgICAgd2hpbGUgKCFpc1ZhbGlkUG9zaXRpb24oc2hpcCwgW3JvdywgY29sXSkpIFtyb3csIGNvbF0gPSBnZXRSYW5kb21Db29yZGluYXRlcygpO1xuICAgICAgICAgICAgc2hpcC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIHNoaXAuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuY29sID0gY29sO1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hY3RpdmUgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgICAgICAgIGNlbGwuYXBwZW5kKHNoaXApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHBsYWNlQ29tcHV0ZXJTaGlwcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGxheWVyT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1vbmUtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHBsYXllclR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItdHdvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIHBsYXllck9uZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgICBwbGF5ZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIHBsYWNlUmFuZG9tbHkoKVxuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrU2hpcHNQbGFjZWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuY2VsbCAuc2hpcCcpO1xuXG4gICAgICAgIHJldHVybiBhbGxTaGlwcy5sZW5ndGggPj0gNTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VQbGF5ZXJEaXNwbGF5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLW9uZS1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcGxheWVyVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10d28tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IG5leHRQbGF5ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ubmV4dC1wbGF5ZXInKTtcbiAgICAgICAgY29uc3Qgc3RhcnRHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnN0YXJ0LWdhbWUnKTtcblxuICAgICAgICBwbGF5ZXJPbmUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIHBsYXllck9uZS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICBwbGF5ZXJUd28uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIHBsYXllclR3by5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICBuZXh0UGxheWVyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHN0YXJ0R2FtZS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFBsYXllclBsYWNlbWVudCA9ICgpID0+IHtcbiAgICAgICAgY2hhbmdlUGxheWVyRGlzcGxheSgpXG4gICAgICAgIGRpc3BsYXlTaGlwcygpO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZVBsYXllciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci5hY3RpdmUnKTtcbiAgICAgICAgY29uc3QgaW5hY3RpdmVQbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLmluYWN0aXZlJyk7XG5cbiAgICAgICAgYWN0aXZlUGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIGFjdGl2ZVBsYXllci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIGluYWN0aXZlUGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIGluYWN0aXZlUGxheWVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICB9XG5cbiAgICBjb25zdCBkaXNwbGF5Qm90aEJvYXJkcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGxheWVyT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1vbmUtY29udGFpbmVyJylcbiAgICAgICAgY29uc3QgcGxheWVyVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10d28tY29udGFpbmVyJylcbiAgICAgICAgY29uc3Qgc2hpcENvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcC1jb250YWluZXInKTtcbiAgICAgICAgcGxheWVyT25lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIHBsYXllclR3by5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICBzaGlwQ29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9hZEdhbWUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVNb2RlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtbW9kZS1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwbGF5ZXJPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLW9uZS1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgY29udHJvbGxlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sbGVyLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGdhbWVNb2RlQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIGdhbWVDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgcGxheWVyT25lLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHBsYXllck9uZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgY29udHJvbGxlckNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgfVxuXG4gICAgY29uc3QgbG9hZFZzUGxheWVyID0gKCkgPT4ge1xuICAgICAgICBsb2FkR2FtZSgpXG4gICAgICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnN0YXJ0LWdhbWUnKVxuICAgICAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgfVxuXG4gICAgY29uc3QgbG9hZFZzQ29tcHV0ZXIgPSAoKSA9PiB7XG4gICAgICAgIGxvYWRHYW1lKClcbiAgICAgICAgY29uc3QgbmV4dFBsYXllckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5uZXh0LXBsYXllcicpXG4gICAgICAgIG5leHRQbGF5ZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZUNlbGxzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgICAgIGFsbENlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLnJlbW92ZSgpKTtcbiAgICB9ICAgXG5cbiAgICBjb25zdCB2c1BsYXllckRpc3BsYXlCb3RoQm9hcmRzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3RpdmVQbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLmFjdGl2ZScpO1xuICAgICAgICBjb25zdCBpbmFjdGl2ZVBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIuaW5hY3RpdmUnKTtcblxuICAgICAgICBhY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgaW5hY3RpdmVQbGF5ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc2V0R2FtZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZU1vZGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1tb2RlLWNvbnRhaW5lcicpXG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1jb250YWluZXInKVxuICAgICAgICBjb25zdCBhbGxTaGlwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtY29udGFpbmVyJylcbiAgICAgICAgY29uc3QgYWxsUGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcicpXG4gICAgICAgIGNvbnN0IG5leHRQbGF5ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ubmV4dC1wbGF5ZXInKVxuICAgICAgICBjb25zdCB3aW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLWNvbnRhaW5lcicpXG5cbiAgICAgICAgZ2FtZU1vZGVDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgICAgICBnYW1lQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgYWxsU2hpcENvbnRhaW5lci5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKSlcbiAgICAgICAgYWxsUGxheWVyQ29udGFpbmVyLmZvckVhY2goY29udGFpbmVyID0+IGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpKVxuICAgICAgICBuZXh0UGxheWVyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgd2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcblxuICAgICAgICByZW1vdmVDZWxscygpXG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheVdpbm5lciA9IChwbGF5ZXJOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXItY29udGFpbmVyJylcbiAgICAgICAgd2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHdpbm5lck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLW1lc3NhZ2UnKVxuICAgICAgICB3aW5uZXJNZXNzYWdlLnRleHRDb250ZW50ID0gYCR7cGxheWVyTmFtZX0gd2lucyFgXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZFZzUGxheWVyLFxuICAgICAgICBsb2FkVnNDb21wdXRlcixcbiAgICAgICAgZGlzcGxheUJvYXJkcyxcbiAgICAgICAgZGlzcGxheVNoaXBzLFxuICAgICAgICByZXNldEJvYXJkLFxuICAgICAgICBwbGFjZVJhbmRvbWx5LFxuICAgICAgICBjaGFuZ2VQbGF5ZXIsXG4gICAgICAgIGNoZWNrU2hpcHNQbGFjZWQsXG4gICAgICAgIGdldFNoaXBDb29yZGluYXRlcyxcbiAgICAgICAgbmV4dFBsYXllclBsYWNlbWVudCxcbiAgICAgICAgZGlzcGxheVdpbm5lcixcbiAgICAgICAgcmVzZXRHYW1lLFxuICAgICAgICBkaXNwbGF5Qm90aEJvYXJkcyxcbiAgICAgICAgcGxhY2VDb21wdXRlclNoaXBzLFxuICAgICAgICB2c1BsYXllckRpc3BsYXlCb3RoQm9hcmRzXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET007IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5LmZyb20oe2xlbmd0aDogMTAgfSkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5zaGlwcyA9IHt9O1xuICB9XG5cbiAgYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoc2hpcE5hbWUsIHNoaXBMZW5ndGgpO1xuICAgIHRoaXMuc2hpcHNbc2hpcE5hbWVdID0gbmV3U2hpcDtcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKGNvb3JkaW5hdGUgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGU7XG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IG5ld1NoaXA7XG4gICAgfSlcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoIXRoaXMuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmJvYXJkW3Jvd11bY29sXTtcbiAgICAgIHNoaXAuZ2V0SGl0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnZXRTaGlwcygpIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLnNoaXBzKTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBjb25zdCBhbGxTaGlwcyA9IHRoaXMuZ2V0U2hpcHMoKTtcbiAgICByZXR1cm4gYWxsU2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLnN1bmspO1xuICB9XG5cbiAgcmVzZXRCb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKCkgPT4gQXJyYXkuZnJvbSh7bGVuZ3RoOiAxMCB9KS5maWxsKG51bGwpKTtcbiAgICB0aGlzLnNoaXBzID0ge307XG4gIH1cbn0iLCJpbXBvcnQgRE9NIGZyb20gXCIuL0RPTS5qc1wiXG5pbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyRmFjdG9yeS5qc1wiXG5cbmNvbnN0IHZzUGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ1BsYXllciAxJylcbiAgICBjb25zdCBwbGF5ZXJUd28gPSBuZXcgUGxheWVyKCdQbGF5ZXIgMicpXG4gICAgcGxheWVyT25lLnNldEVuZW15Qm9hcmQocGxheWVyVHdvLmdldEJvYXJkKCkpXG4gICAgcGxheWVyVHdvLnNldEVuZW15Qm9hcmQocGxheWVyT25lLmdldEJvYXJkKCkpO1xuXG4gICAgY29uc3QgZG9tID0gRE9NKCk7XG4gICAgZG9tLmxvYWRWc1BsYXllcigpO1xuICAgIGRvbS5kaXNwbGF5Qm9hcmRzKCk7XG4gICAgZG9tLmRpc3BsYXlTaGlwcygpXG5cbiAgICBjb25zdCBuZXh0UGxheWVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLm5leHQtcGxheWVyJylcbiAgICBuZXh0UGxheWVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAoIWRvbS5jaGVja1NoaXBzUGxhY2VkKCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5zaGlwJyk7XG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwTmFtZSA9IHNoaXAuaWQ7XG4gICAgICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gcGFyc2VJbnQoc2hpcC5kYXRhc2V0Lmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBkb20uZ2V0U2hpcENvb3JkaW5hdGVzKHNoaXAsIFtwYXJzZUludChzaGlwLmRhdGFzZXQucm93KSwgcGFyc2VJbnQoc2hpcC5kYXRhc2V0LmNvbCldKTtcbiAgICAgICAgICAgIHBsYXllck9uZS5hZGRTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBzaGlwQ29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgc2hpcC5yZW1vdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgZG9tLm5leHRQbGF5ZXJQbGFjZW1lbnQoKVxuICAgIH0pXG5cbiAgICBjb25zdCBzdGFydEdhbWVWc1BsYXllciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFkb20uY2hlY2tTaGlwc1BsYWNlZCgpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuc2hpcCcpO1xuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcE5hbWUgPSBzaGlwLmlkO1xuICAgICAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHBhcnNlSW50KHNoaXAuZGF0YXNldC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gZG9tLmdldFNoaXBDb29yZGluYXRlcyhzaGlwLCBbcGFyc2VJbnQoc2hpcC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KHNoaXAuZGF0YXNldC5jb2wpXSk7XG4gICAgICAgICAgICBwbGF5ZXJUd28uYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgc2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIHNoaXAucmVtb3ZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sbGVyLWNvbnRhaW5lcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICAgICAgY29uc3QgcGxheWVyT25lQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLW9uZSAuY2VsbCcpO1xuICAgICAgICBjb25zdCBwbGF5ZXJUd29DZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdHdvIC5jZWxsJyk7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtY29udGFpbmVyJylcbiAgICAgICAgYWxsU2hpcENvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJykpXG4gICAgICAgIHBsYXllck9uZS50dXJuID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyT25lQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5ZXJUd29BY3Rpb24pKVxuICAgICAgICBwbGF5ZXJUd29DZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXllck9uZUFjdGlvbikpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnN0YXJ0LWdhbWUnKVxuICAgIHN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZVZzUGxheWVyKVxuXG5cblxuICAgIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgICAgIGlmIChwbGF5ZXJPbmUudHVybikge1xuICAgICAgICAgICAgcGxheWVyT25lLnR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllclR3by50dXJuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsYXllck9uZS50dXJuID0gdHJ1ZTtcbiAgICAgICAgICAgIHBsYXllclR3by50dXJuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJBY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlUGxheWVyID0gcGxheWVyT25lLnR1cm4gPyBwbGF5ZXJPbmUgOiBwbGF5ZXJUd287XG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSB8fCBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykpIHJldHVybjtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KSwgcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sKV1cbiAgICAgICAgY29uc3QgaXNIaXQgPSBhY3RpdmVQbGF5ZXIucGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgaWYgKGlzSGl0KSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGl0JylcbiAgICAgICAgICAgIGNvbnN0IGlzR2FtZU92ZXIgPSBhY3RpdmVQbGF5ZXIuY2hlY2tHYW1lT3ZlcigpO1xuICAgICAgICAgICAgaWYgKGlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVQbGF5ZXIudHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5V2lubmVyKGFjdGl2ZVBsYXllci5uYW1lKTtcbiAgICAgICAgICAgICAgICBkb20udnNQbGF5ZXJEaXNwbGF5Qm90aEJvYXJkcygpXG4gICAgICAgICAgICAgICAgcGxheWVyT25lLnJlc2V0KClcbiAgICAgICAgICAgICAgICBwbGF5ZXJUd28ucmVzZXQoKVxuICAgICAgICAgICAgICAgIHN0YXJ0R2FtZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZVZzUGxheWVyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFpc0hpdCkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxuICAgICAgICAgICAgY2hhbmdlVHVybigpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkb20uY2hhbmdlUGxheWVyKClcbiAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJPbmVBY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFwbGF5ZXJPbmUudHVybikgcmV0dXJuO1xuICAgICAgICBwbGF5ZXJBY3Rpb24oZXZlbnQpXG4gICAgfVxuXG4gICAgY29uc3QgcGxheWVyVHdvQWN0aW9uID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghcGxheWVyVHdvLnR1cm4pIHJldHVybjtcbiAgICAgICAgcGxheWVyQWN0aW9uKGV2ZW50KVxuICAgIH1cblxuXG59XG5cbmNvbnN0IHZzQ29tcHV0ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcignUGxheWVyJylcbiAgICBjb25zdCBjb21wdXRlciA9IG5ldyBDb21wdXRlcignQ29tcHV0ZXInKVxuICAgIHBsYXllci5zZXRFbmVteUJvYXJkKGNvbXB1dGVyLmdldEJvYXJkKCkpXG4gICAgY29tcHV0ZXIuc2V0RW5lbXlCb2FyZChwbGF5ZXIuZ2V0Qm9hcmQoKSlcblxuICAgIGNvbnN0IGRvbSA9IERPTSgpO1xuICAgIGRvbS5sb2FkVnNDb21wdXRlcigpO1xuICAgIGRvbS5kaXNwbGF5Qm9hcmRzKCk7XG4gICAgZG9tLmRpc3BsYXlTaGlwcygpXG5cbiAgICBjb25zdCBwbGFjZUNvbXB1dGVyU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGRvbS5wbGFjZUNvbXB1dGVyU2hpcHMoKVxuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLnNoaXAnKTtcbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBOYW1lID0gc2hpcC5pZDtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBwYXJzZUludChzaGlwLmRhdGFzZXQubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IGRvbS5nZXRTaGlwQ29vcmRpbmF0ZXMoc2hpcCwgW3BhcnNlSW50KHNoaXAuZGF0YXNldC5yb3cpLCBwYXJzZUludChzaGlwLmRhdGFzZXQuY29sKV0pO1xuICAgICAgICAgICAgY29tcHV0ZXIuYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgc2hpcENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIHNoaXAucmVtb3ZlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRHYW1lVnNQbGF5ZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICghZG9tLmNoZWNrU2hpcHNQbGFjZWQoKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLnNoaXAnKTtcbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBOYW1lID0gc2hpcC5pZDtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBwYXJzZUludChzaGlwLmRhdGFzZXQubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb29yZGluYXRlcyA9IGRvbS5nZXRTaGlwQ29vcmRpbmF0ZXMoc2hpcCwgW3BhcnNlSW50KHNoaXAuZGF0YXNldC5yb3cpLCBwYXJzZUludChzaGlwLmRhdGFzZXQuY29sKV0pO1xuICAgICAgICAgICAgcGxheWVyLmFkZFNoaXAoc2hpcE5hbWUsIHNoaXBMZW5ndGgsIHNoaXBDb29yZGluYXRlcyk7XG4gICAgICAgICAgICBzaGlwLnJlbW92ZSgpO1xuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbGxlci1jb250YWluZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLXR3byAuY2VsbCcpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLmFjdGl2ZScpLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIHBsYXllci50dXJuID0gdHJ1ZTtcbiAgICAgICAgY29tcHV0ZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXllckFjdGlvbikpXG4gICAgICAgIHBsYWNlQ29tcHV0ZXJTaGlwcygpXG4gICAgICAgIGRvbS5kaXNwbGF5Qm90aEJvYXJkcygpXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnN0YXJ0LWdhbWUnKVxuICAgIHN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZVZzUGxheWVyKVxuXG4gICAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHtcbiAgICAgICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICAgICAgICBwbGF5ZXIudHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgY29tcHV0ZXIudHVybiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGF5ZXIudHVybiA9IHRydWU7XG4gICAgICAgICAgICBjb21wdXRlci50dXJuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjb21wdXRlckFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFjb21wdXRlci50dXJuKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGlzSGl0ID0gY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2tzKCk7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb21wdXRlci5nZXRMYXN0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXItb25lLmJvYXJkIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYClcbiAgICAgICAgaWYgKGlzSGl0KSB7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgY29uc3QgaXNHYW1lT3ZlciA9IGNvbXB1dGVyLmNoZWNrR2FtZU92ZXIoKTtcbiAgICAgICAgICAgIGlmIChpc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXIudHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5V2lubmVyKGNvbXB1dGVyLm5hbWUpXG4gICAgICAgICAgICAgICAgcGxheWVyLnJlc2V0KClcbiAgICAgICAgICAgICAgICBjb21wdXRlci5yZXNldCgpXG4gICAgICAgICAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lVnNQbGF5ZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzSGl0KSB7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxuICAgICAgICB9XG4gICAgICAgIGNoYW5nZVR1cm4oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJBY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFwbGF5ZXIudHVybikgcmV0dXJuO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGl0JykgfHwgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW3BhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbCldXG4gICAgICAgIGNvbnN0IGlzSGl0ID0gcGxheWVyLnBsYXllckF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICAgIGlmIChpc0hpdCkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG4gICAgICAgICAgICBjb25zdCBpc0dhbWVPdmVyID0gcGxheWVyLmNoZWNrR2FtZU92ZXIoKTtcbiAgICAgICAgICAgIGlmIChpc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLnR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheVdpbm5lcihwbGF5ZXIubmFtZSk7XG4gICAgICAgICAgICAgICAgcGxheWVyLnJlc2V0KClcbiAgICAgICAgICAgICAgICBjb21wdXRlci5yZXNldCgpXG4gICAgICAgICAgICAgICAgc3RhcnRHYW1lQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lVnNQbGF5ZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzSGl0KSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWlzcycpXG4gICAgICAgIH1cbiAgICAgICAgY2hhbmdlVHVybigpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29tcHV0ZXJBY3Rpb24oKVxuICAgICAgICB9LCAxMDAwKVxuICAgIH1cblxuXG59XG5cbmNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IGRvbSA9IERPTSgpO1xuICAgIGNvbnN0IHJlc2V0Qm9hcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucmVzZXQtYm9hcmQnKVxuICAgIHJlc2V0Qm9hcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb20ucmVzZXRCb2FyZClcblxuICAgIGNvbnN0IHJhbmRvbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5yYW5kb21pemUnKVxuICAgIHJhbmRvbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvbS5wbGFjZVJhbmRvbWx5KVxuXG4gICAgY29uc3QgcGxheUFnYWluQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXktYWdhaW4nKVxuICAgIHBsYXlBZ2FpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvbS5yZXNldEdhbWUpXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudnMtQ1BVJykpIHtcbiAgICAgICAgICAgIHZzQ29tcHV0ZXIoKVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudnMtcGxheWVyJykpIHtcbiAgICAgICAgICAgIHZzUGxheWVyKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbnBsYXlHYW1lKClcbiIsImltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZEZhY3RvcnkuanNcIjtcblxuZXhwb3J0IHsgUGxheWVyLCBDb21wdXRlciB9XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB0aGlzLmVuZW15Qm9hcmQgPSBudWxsO1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgc2V0RW5lbXlCb2FyZChlbmVteUJvYXJkKSB7XG4gICAgdGhpcy5lbmVteUJvYXJkID0gZW5lbXlCb2FyZDtcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICB9XG4gIFxuICBhZGRTaGlwKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBjb29yZGluYXRlcykge1xuICAgIHRoaXMuYm9hcmQuYWRkU2hpcChzaGlwTmFtZSwgc2hpcExlbmd0aCwgY29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgcGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGNoZWNrR2FtZU92ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5lbXlCb2FyZC5hbGxTaGlwc1N1bmsoKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuYm9hcmQucmVzZXRCb2FyZCgpO1xuICB9XG59XG5cbmNsYXNzIENvbXB1dGVyIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpXG4gICAgdGhpcy5hbGxBdHRhY2tzRG9uZSA9IFtdO1xuICAgIHRoaXMuYXR0YWNrSGl0ID0gZmFsc2U7XG4gICAgdGhpcy5hbGxIaXRBdHRhY2tzID0gW107XG4gICAgdGhpcy5uZXh0QXR0YWNrID0gW107XG4gIH1cblxuICBpc0F0dGFja0FscmVhZHlEb25lKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuXG4gICAgZm9yIChsZXQgYXR0YWNrIG9mIHRoaXMuYWxsQXR0YWNrc0RvbmUpIHtcbiAgICAgIGlmIChhdHRhY2tbMF0gPT09IHJvdyAmJiBhdHRhY2tbMV0gPT09IGNvbCkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgIHdoaWxlICh0aGlzLmlzQXR0YWNrQWxyZWFkeURvbmUoW3JvdywgY29sXSkpIHtcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgfVxuXG4gIGNvbXB1dGVyQXR0YWNrcygpIHtcbiAgICBpZiAoIXRoaXMuYXR0YWNrSGl0IHx8ICF0aGlzLm5leHRBdHRhY2subGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2V0QXR0YWNrU3RhdHVzKClcbiAgICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5yYW5kb21Db21wdXRlckF0dGFjaygpO1xuICAgICAgaWYgKGlzSGl0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVySGl0cygpXG4gICAgICB9IGVsc2UgaWYgKCFpc0hpdCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmF0dGFja0hpdCAmJiB0aGlzLm5leHRBdHRhY2subGVuZ3RoKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFjay5zaGlmdCgpO1xuICAgICAgdGhpcy5hbGxBdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKVxuICAgICAgY29uc3QgaXNIaXQgPSB0aGlzLmVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICBpZiAoaXNIaXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcHV0ZXJIaXRzKClcbiAgICAgIH0gZWxzZSBpZiAoIWlzSGl0ICYmICF0aGlzLm5leHRBdHRhY2subGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVzZXRBdHRhY2tTdGF0dXMoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmFuZG9tQ29tcHV0ZXJBdHRhY2soKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLnJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5hbGxBdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gdGhpcy5lbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgY29tcHV0ZXJIaXRzKCkge1xuICAgIHRoaXMuYXR0YWNrSGl0ID0gdHJ1ZTtcbiAgICB0aGlzLmFsbEhpdEF0dGFja3MucHVzaCh0aGlzLmFsbEF0dGFja3NEb25lLmF0KC0xKSk7XG4gICAgY29uc3QgbGFzdEhpdCA9IHRoaXMuYWxsSGl0QXR0YWNrcy5hdCgtMSk7XG4gICAgY29uc3QgbW92ZXMgPSBbWzEsIDBdLCBbLTEsIDBdLCBbMCwgMV0sIFswLCAtMV1dO1xuICAgIG1vdmVzLmZvckVhY2gobW92ZSA9PiB7XG4gICAgICBjb25zdCBuZXdSb3cgPSBtb3ZlWzBdICsgbGFzdEhpdFswXTtcbiAgICAgIGNvbnN0IG5ld0NvbCA9IG1vdmVbMV0gKyBsYXN0SGl0WzFdO1xuICAgICAgaWYgKHRoaXMuaXNBdHRhY2tBbHJlYWR5RG9uZShbbmV3Um93LCBuZXdDb2xdKSB8fCAobmV3Um93IDwgMCB8fCBuZXdDb2wgPCAwIHx8IG5ld1JvdyA+IDkgfHwgbmV3Q29sID4gOSkpIHJldHVybjtcbiAgICAgIHRoaXMubmV4dEF0dGFjay5wdXNoKFtuZXdSb3csIG5ld0NvbF0pO1xuICAgIH0pXG5cbiAgICBpZiAodGhpcy5hbGxIaXRBdHRhY2tzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzSGl0ID0gdGhpcy5hbGxIaXRBdHRhY2tzLmF0KC0yKTtcbiAgICAgIGlmIChsYXN0SGl0WzBdID09PSBwcmV2aW91c0hpdFswXSkge1xuICAgICAgICB0aGlzLm5leHRBdHRhY2sgPSB0aGlzLm5leHRBdHRhY2suZmlsdGVyKG1vdmUgPT4gbW92ZVswXSA9PT0gbGFzdEhpdFswXSk7XG4gICAgICB9IGVsc2UgaWYgKGxhc3RIaXRbMV0gPT09IHByZXZpb3VzSGl0WzFdKSB7XG4gICAgICAgIHRoaXMubmV4dEF0dGFjayA9IHRoaXMubmV4dEF0dGFjay5maWx0ZXIobW92ZSA9PiBtb3ZlWzFdID09PSBsYXN0SGl0WzFdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXNldEF0dGFja1N0YXR1cygpIHtcbiAgICB0aGlzLmF0dGFja0hpdCA9IGZhbHNlO1xuICAgIHRoaXMuYWxsSGl0QXR0YWNrcyA9IFtdO1xuICAgIHRoaXMubmV4dEF0dGFjayA9IFtdO1xuICB9XG5cbiAgZ2V0TGFzdENvb3JkaW5hdGVzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbEF0dGFja3NEb25lLmF0KC0xKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMucG9zaXRpb24gPSBbXTtcbiAgICB0aGlzLnRvdGFsSGl0cyA9IDA7XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gIH1cblxuICBnZXRIaXQoKSB7XG4gICAgdGhpcy50b3RhbEhpdHMgKz0gMTtcbiAgICB0aGlzLmlzU3VuaygpO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHRoaXMuc3VuayA9IHRoaXMudG90YWxIaXRzID49IHRoaXMubGVuZ3RoO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=