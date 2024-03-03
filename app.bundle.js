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
const DOM = (player, computer) => {
  const ships = [
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
    }
  ]

  const displayBoards = () => {
    const playerBoard = document.querySelector(".player.board");
    const computerBoard = document.querySelector(".computer.board");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const playerCell = document.createElement("div");
        playerCell.classList.add("cell");
        playerCell.dataset.row = i;
        playerCell.dataset.col = j;
        playerBoard.appendChild(playerCell);

        const computerCell = document.createElement("div");
        computerCell.classList.add("cell");
        computerCell.dataset.row = i;
        computerCell.dataset.col = j;
        computerBoard.appendChild(computerCell);
      }
    }
  };

  const mouseOverCell = (event) => {
    if (!ships.length) return;
    const ship = ships[0];
    const [row, col] = [parseInt(event.target.dataset.row), parseInt(event.target.dataset.col)];
    const direction = document.querySelector('.direction').value;

    if (direction === "row") {
      for (let i = col; i < col + ship.length; i++) {
        if (i > 9) return;
        const styleCell = document.querySelector(`.player .cell[data-row="${row}"][data-col="${i}"]`);
        styleCell.classList.add('display-ship');
      }
    } else if (direction === "col") {
      for (let i = row; i < row + ship.length; i++) {
        if (i > 9) return;
        const styleCell = document.querySelector(`.player .cell[data-row="${i}"][data-col="${col}"]`);
        styleCell.classList.add('display-ship');
      }
    }
  }

  const mouseOutCell = () => {
    const cells = document.querySelectorAll('.display-ship');
    cells.forEach(cell => {
      cell.classList.remove('display-ship')
    })
  }

  const clickCell = (event) => {
    if (!ships.length) return;
    const ship = ships[0];
    const coordinates = [parseInt(event.target.dataset.row), parseInt(event.target.dataset.col)];
    const direction = document.querySelector('.direction').value;
    const shipPlaced = player.board.placeShips(ship.name, coordinates, direction);
    if (!shipPlaced) return;
    const cells = document.querySelectorAll('.display-ship');
    cells.forEach(cell => {
      cell.classList.add('ship');
      cell.classList.remove('display-ship')
    })
    ships.shift();
  }

  const changeDirection = (event) => {
    if (event.target.value === "row") {
        event.target.value = "col";
        event.target.textContent = "Vertical";
    } else if (event.target.value === "col") {
        event.target.value = "row";
        event.target.textContent = "Horizontal";
    }
}

const placementInformation = (ship) => {
  const container = document.querySelector('.ship-name');
  if (!ship) {
    container.textContent = "All ships placed!"
  } else {
    container.textContent = `Place your ${ship.name}.`
  }
}

  const displayPlayerShips = () => {
    let shipPositions = [];
    
    Object.values(player.board.ships).forEach(ship => {
      shipPositions = shipPositions.concat(ship.position);
    })

    shipPositions.forEach(coordinates => {
      const [row, col] = coordinates;
      const cell = document.querySelector(`.player .cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add('ship');
    })
  }

  const displayHit = () => {
    // change with an event target
    if (player.turn) {
      const [row, col] = player.attacksDone.at(-1);
      const cell = document.querySelector(`.computer .cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add('hit');
    } else if (computer.turn) {
      const [row, col] = computer.attacksDone.at(-1);
      const cell = document.querySelector(`.player .cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add('hit');
    }
  }

  const displayMiss = () => {
    if (player.turn) {
      const [row, col] = player.attacksDone.at(-1);
      const cell = document.querySelector(`.computer .cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add('miss');
    } else if (computer.turn) {
      const [row, col] = computer.attacksDone.at(-1);
      const cell = document.querySelector(`.player .cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add('miss');
    }
  }

  const displayWinner = () => {
    const winnerContainer = document.querySelector('.winner');
    const winnerMessage = document.querySelector('.winner .message')
    winnerContainer.classList.toggle('inactive');
    if (player.turn) {
      winnerMessage.textContent = "You win!";
    } else if (computer.turn) {
      winnerMessage.textContent = "Computer wins!"
    }
  }

  const cleanPlayerBoard = () => {
    const allShipTiles = document.querySelectorAll('.ship');
    allShipTiles.forEach(tile => {
      tile.classList.remove('ship');
    })
  }

  const resetInterface = () => {
    document.querySelector('.mode-container').classList.toggle('inactive');
    document.querySelector('.game.vs-CPU').classList.toggle('inactive');
    document.querySelector('.info-placement').classList.toggle('inactive');
    document.querySelector('.computer-container').classList.toggle('inactive');
    document.querySelector('.winner').classList.toggle('inactive')
    document.querySelector('.player.board').replaceChildren();
    document.querySelector('.computer.board').replaceChildren();
  }

  return {
    displayBoards,
    displayPlayerShips,
    mouseOverCell,
    mouseOutCell,
    clickCell,
    changeDirection,
    displayHit,
    displayMiss,
    displayWinner,
    cleanPlayerBoard,
    resetInterface
  };
};

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
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = {
      carrier: new _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]("carrier", 5),
      battleship: new _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]("battleship", 4),
      destroyer: new _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]("destroyer", 3),
      submarine: new _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]("submarine", 2),
      patrol: new _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]("patrol", 2),
    };
  }

  placeShips(shipName, coordinates, direction) {
    const ship = this.ships[shipName];

    if (!this.shipPosition(ship, coordinates, direction)) return false;

    this.placeShipTiles(ship);
    this.placeWaterTiles(ship);
    return true;
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;

    if (this.board[row][col] === "X" || this.board[row][col] === "O") return false;

    if (!this.board[row][col] || this.board[row][col] === "water") {
      this.board[row][col] = "O";
      return false;
    }

    const ship = this.ships[this.board[row][col]];
    this.board[row][col] = "X";
    ship.getHit();
    return true;
  }

  allShipsSunk() {
    return Object.values(this.ships).every(ship => ship.sunk);
  }

  shipPosition(ship, coordinates, direction) {
    const possiblePositions = [];
    const [row, col] = coordinates;

    if (direction === 'row') {
      for (let i = col; i < col + ship.length; i++) possiblePositions.push([row, i]);
    } else if (direction === 'col') {
      for (let i = row; i < row + ship.length; i++) possiblePositions.push([i, col]);
    }

    ship.position = possiblePositions;
    return possiblePositions.every(position => this.isValid(position));
  }

  isValid(coordinates) {
    const [row, col] = coordinates;

    if ((row < 0 || col < 0 || row > 9 || col > 9) || this.board[row][col]) return false;

    return true;
  }

  placeShipTiles(ship) {
    ship.position.forEach(coordinates => {
      const [row, col] = coordinates;
      this.board[row][col] = ship.name;
    })
  }

  placeWaterTiles(ship) {
    const possibleWaterTiles = [];

    ship.position.forEach(coordinates => {
      const [row, col] = coordinates;
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if ((i !== row || j !== col) && (i >= 0 && j >= 0 && i < 10 && j < 10)) possibleWaterTiles.push([i, j]);
        }
      }
    })

    possibleWaterTiles.forEach(coordinates => {
      const [row, col] = coordinates;
      if (!this.board[row][col]) this.board[row][col] = "water";
    })
  }

  printBoard() {
    this.board.forEach((row) => {
      console.log(row);
    });
  }
}


/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const gameController = (player, computer) => {

  const placePlayerShips = () => {
    player.randomShipPlacement();
  };

  const placeComputerShips = () => {
    computer.randomShipPlacement();
  };

  const checkAllShipsPlaced = () => {
    const ships = Object.values(player.board.ships);

    return ships.some(ship => ship.position.length !== 0)
  }

  const firstTurn = () => {
    player.turn = true;
    computer.turn = false;
  }

  const changeTurns = () => {
    player.changeTurn();
    computer.changeTurn();
  }

  const getClickedCell = (event) => {
      const row = parseInt(event.target.dataset.row)
      const col = parseInt(event.target.dataset.col);
      
      return [row, col];
  };

  const isHit = (attack) => {
    return attack;
  }

  const checkWinner = () => {
    return player.turn ? computer.board.allShipsSunk() : player.board.allShipsSunk();
  }

  const gameOver = () => {
    player.turn = false;
    computer.turn = false;
  }

  return { 
    placePlayerShips,
    placeComputerShips,
    checkAllShipsPlaced,
    firstTurn,
    changeTurns,
    getClickedCell,
    isHit,
    checkWinner,
    gameOver
   };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameController);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController.js */ "./src/gameController.js");
/* harmony import */ var _DOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM.js */ "./src/DOM.js");
/* harmony import */ var _playerFactory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerFactory.js */ "./src/playerFactory.js");




const playGame = () => {
    const player = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_2__["default"]('player');
    const computer = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_2__["default"]('computer');

    const game = (0,_gameController_js__WEBPACK_IMPORTED_MODULE_0__["default"])(player, computer);
    const dom = (0,_DOM_js__WEBPACK_IMPORTED_MODULE_1__["default"])(player, computer);

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
    this.attacksDone = [];
    this.turn = false;
    this.lastAttackHit = false;
    this.hitCoordinates = [];
    this.lastHitCoordinate = null;
    this.nextAttackCoordinates = [];
  }

  playerAttack(coordinates, computerBoard) {
    if (!this.checkCoordinates(coordinates)) return;
    this.attacksDone.push(coordinates);
    return computerBoard.receiveAttack(coordinates);
  }

  computerAttack(playerBoard) {
    if (!this.lastAttackHit || !this.nextAttackCoordinates.length) {
      this.resetAttackStatus();
      const attack = this.randomComputerAttack(playerBoard);
      if (attack) return this.computerAttackHits();
    } else if (this.lastAttackHit && this.nextAttackCoordinates.length) {
      const coordinates = this.nextAttackCoordinates.shift();
      this.attacksDone.push(coordinates);
      const attack = playerBoard.receiveAttack(coordinates);
      if (attack) {
        return this.computerAttackHits();
      } else if (!attack && !this.nextAttackCoordinates.length) {
        this.resetAttackStatus()
        return false;
      }
    }
  }

  resetAttackStatus() {
    this.lastAttackHit = false;
    this.lastHitCoordinate = null;
    this.nextAttackCoordinates = [];
  }

  randomShipPlacement() {
    const ships = Object.values(this.board.ships);
    ships.forEach(ship => {
      const placement = this.randomPlacementCoordinates(ship);
      console.log(placement)
      return this.board.placeShips(ship.name, placement.coordinates, placement.direction);
    })
  }

  removeShipPlacement() {
    const ships = Object.values(this.board.ships);
    ships.forEach(ship => {
      ship.position = [];
    })
  }

  randomPlacementCoordinates(ship) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let direction = this.randomDirection()

    while (row + ship.length > 10 || col + ship.length > 10 || !this.board.shipPosition(ship, [row, col], direction)) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      direction = this.randomDirection()
    }

    return  { coordinates: [row, col], direction: direction }
  }

  randomComputerAttack(playerBoard) {
    const coordinates = this.randomCoordinates();
    this.attacksDone.push(coordinates);
    return playerBoard.receiveAttack(coordinates);
  }

  computerAttackHits() {
    this.lastAttackHit = true;
    this.hitCoordinates.push(this.attacksDone.at(-1));
    this.lastHitCoordinate = this.hitCoordinates.at(-1);
    const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    moves.forEach(move => {
      const newRow = move[0] + this.lastHitCoordinate[0];
      const newCol = move[1] + this.lastHitCoordinate[1];
      if (!this.checkCoordinates([newRow, newCol]) || (newRow < 0 || newCol < 0 || newRow > 9 || newCol > 9)) return;
      this.nextAttackCoordinates.push([newRow, newCol]);
    })

    if (this.hitCoordinates.length > 1) {
      if (this.lastHitCoordinate[0] === this.hitCoordinates.at(-2)[0] &&
      this.lastHitCoordinate[1] - this.hitCoordinates.at(-2)[1] <= 1) {
        this.nextAttackCoordinates = this.nextAttackCoordinates.filter(move => move[0] === this.lastHitCoordinate[0]);
      } else if (this.lastHitCoordinate[1] === this.hitCoordinates.at(-2)[1] &&
      this.lastHitCoordinate[0] - this.hitCoordinates.at(-2)[0] <= 1) {
        this.nextAttackCoordinates = this.nextAttackCoordinates.filter(move => move[1] === this.lastHitCoordinate[1]);
      }
    }
    return true;
  }

  changeTurn() {
    this.turn ? this.turn = false : this.turn = true;
  }

  randomCoordinates() {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (!this.checkCoordinates([row, col])) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }

    return [row, col];
  }

  checkCoordinates(coordinates) {
    const [row, col] = coordinates;
    for (let element of this.attacksDone) {
      if (element[0] === row && element[1] === col) return false;
    }
    return true;
  }

  randomDirection() {
    const direction = ['row', 'col'];
    const position = Math.floor(Math.random() * direction.length);
    return direction[position];
  }

  resetPlayer() {
    this.board = new _boardFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.attacksDone = [];
    this.lastAttackHit = false;
    this.hitCoordinates = [];
    this.lastHitCoordinate = null;
    this.nextAttackCoordinates = [];
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
    this.hits = 0;
    this.sunk = false;
  }

  getHit() {
    this.hits += 1;
    this.isSunk();
  }

  isSunk() {
    this.sunk = this.hits >= this.length;
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSXNDOztBQUV2QjtBQUNmO0FBQ0E7QUFDQSxxQkFBcUIsd0RBQUs7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsd0RBQUs7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDOUllO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2JvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc2hpcEZhY3RvcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRE9NID0gKHBsYXllciwgY29tcHV0ZXIpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXG4gICAge1xuICAgICAgbmFtZTogJ2NhcnJpZXInLFxuICAgICAgbGVuZ3RoOiA1LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgbGVuZ3RoOiA0LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2Rlc3Ryb3llcicsXG4gICAgICBsZW5ndGg6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnc3VibWFyaW5lJyxcbiAgICAgIGxlbmd0aDogMixcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdwYXRyb2wnLFxuICAgICAgbGVuZ3RoOiAyLFxuICAgIH1cbiAgXVxuXG4gIGNvbnN0IGRpc3BsYXlCb2FyZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci5ib2FyZFwiKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci5ib2FyZFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBwbGF5ZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGxheWVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgcGxheWVyQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIHBsYXllckNlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChwbGF5ZXJDZWxsKTtcblxuICAgICAgICBjb25zdCBjb21wdXRlckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb21wdXRlckNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJDZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbW91c2VPdmVyQ2VsbCA9IChldmVudCkgPT4ge1xuICAgIGlmICghc2hpcHMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3Qgc2hpcCA9IHNoaXBzWzBdO1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBbcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KSwgcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sKV07XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpcmVjdGlvbicpLnZhbHVlO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgZm9yIChsZXQgaSA9IGNvbDsgaSA8IGNvbCArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPiA5KSByZXR1cm47XG4gICAgICAgIGNvbnN0IHN0eWxlQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2l9XCJdYCk7XG4gICAgICAgIHN0eWxlQ2VsbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LXNoaXAnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdyArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPiA5KSByZXR1cm47XG4gICAgICAgIGNvbnN0IHN0eWxlQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke2l9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICAgIHN0eWxlQ2VsbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LXNoaXAnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBtb3VzZU91dENlbGwgPSAoKSA9PiB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlzcGxheS1zaGlwJyk7XG4gICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1zaGlwJylcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgY2xpY2tDZWxsID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCFzaGlwcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBzaGlwID0gc2hpcHNbMF07XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KSwgcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sKV07XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpcmVjdGlvbicpLnZhbHVlO1xuICAgIGNvbnN0IHNoaXBQbGFjZWQgPSBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwcyhzaGlwLm5hbWUsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb24pO1xuICAgIGlmICghc2hpcFBsYWNlZCkgcmV0dXJuO1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpc3BsYXktc2hpcCcpO1xuICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1zaGlwJylcbiAgICB9KVxuICAgIHNoaXBzLnNoaWZ0KCk7XG4gIH1cblxuICBjb25zdCBjaGFuZ2VEaXJlY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcInJvd1wiKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IFwiY29sXCI7XG4gICAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9IFwiVmVydGljYWxcIjtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gXCJjb2xcIikge1xuICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSBcInJvd1wiO1xuICAgICAgICBldmVudC50YXJnZXQudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWxcIjtcbiAgICB9XG59XG5cbmNvbnN0IHBsYWNlbWVudEluZm9ybWF0aW9uID0gKHNoaXApID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAtbmFtZScpO1xuICBpZiAoIXNoaXApIHtcbiAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIkFsbCBzaGlwcyBwbGFjZWQhXCJcbiAgfSBlbHNlIHtcbiAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3NoaXAubmFtZX0uYFxuICB9XG59XG5cbiAgY29uc3QgZGlzcGxheVBsYXllclNoaXBzID0gKCkgPT4ge1xuICAgIGxldCBzaGlwUG9zaXRpb25zID0gW107XG4gICAgXG4gICAgT2JqZWN0LnZhbHVlcyhwbGF5ZXIuYm9hcmQuc2hpcHMpLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBzaGlwUG9zaXRpb25zID0gc2hpcFBvc2l0aW9ucy5jb25jYXQoc2hpcC5wb3NpdGlvbik7XG4gICAgfSlcblxuICAgIHNoaXBQb3NpdGlvbnMuZm9yRWFjaChjb29yZGluYXRlcyA9PiB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlIaXQgPSAoKSA9PiB7XG4gICAgLy8gY2hhbmdlIHdpdGggYW4gZXZlbnQgdGFyZ2V0XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gcGxheWVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29tcHV0ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfSBlbHNlIGlmIChjb21wdXRlci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29tcHV0ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGlzcGxheU1pc3MgPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gcGxheWVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29tcHV0ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIudHVybikge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvbXB1dGVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBkaXNwbGF5V2lubmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXInKTtcbiAgICBjb25zdCB3aW5uZXJNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5lciAubWVzc2FnZScpXG4gICAgd2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICB3aW5uZXJNZXNzYWdlLnRleHRDb250ZW50ID0gXCJZb3Ugd2luIVwiO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIudHVybikge1xuICAgICAgd2lubmVyTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXIgd2lucyFcIlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsZWFuUGxheWVyQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsU2hpcFRpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKTtcbiAgICBhbGxTaGlwVGlsZXMuZm9yRWFjaCh0aWxlID0+IHtcbiAgICAgIHRpbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgIH0pXG4gIH1cblxuICBjb25zdCByZXNldEludGVyZmFjZSA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZS1jb250YWluZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLnZzLUNQVScpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tcGxhY2VtZW50JykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItY29udGFpbmVyJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIuYm9hcmQnKS5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXIuYm9hcmQnKS5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGxheUJvYXJkcyxcbiAgICBkaXNwbGF5UGxheWVyU2hpcHMsXG4gICAgbW91c2VPdmVyQ2VsbCxcbiAgICBtb3VzZU91dENlbGwsXG4gICAgY2xpY2tDZWxsLFxuICAgIGNoYW5nZURpcmVjdGlvbixcbiAgICBkaXNwbGF5SGl0LFxuICAgIGRpc3BsYXlNaXNzLFxuICAgIGRpc3BsYXlXaW5uZXIsXG4gICAgY2xlYW5QbGF5ZXJCb2FyZCxcbiAgICByZXNldEludGVyZmFjZVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRE9NOyIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBGYWN0b3J5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLnNoaXBzID0ge1xuICAgICAgY2FycmllcjogbmV3IFNoaXAoXCJjYXJyaWVyXCIsIDUpLFxuICAgICAgYmF0dGxlc2hpcDogbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsIDQpLFxuICAgICAgZGVzdHJveWVyOiBuZXcgU2hpcChcImRlc3Ryb3llclwiLCAzKSxcbiAgICAgIHN1Ym1hcmluZTogbmV3IFNoaXAoXCJzdWJtYXJpbmVcIiwgMiksXG4gICAgICBwYXRyb2w6IG5ldyBTaGlwKFwicGF0cm9sXCIsIDIpLFxuICAgIH07XG4gIH1cblxuICBwbGFjZVNoaXBzKHNoaXBOYW1lLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSB7XG4gICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcE5hbWVdO1xuXG4gICAgaWYgKCF0aGlzLnNoaXBQb3NpdGlvbihzaGlwLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5wbGFjZVNoaXBUaWxlcyhzaGlwKTtcbiAgICB0aGlzLnBsYWNlV2F0ZXJUaWxlcyhzaGlwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAodGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IFwiWFwiIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdID09PSBcIk9cIikgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLmJvYXJkW3Jvd11bY29sXSB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IFwiT1wiO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3RoaXMuYm9hcmRbcm93XVtjb2xdXTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IFwiWFwiO1xuICAgIHNoaXAuZ2V0SGl0KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5zaGlwcykuZXZlcnkoc2hpcCA9PiBzaGlwLnN1bmspO1xuICB9XG5cbiAgc2hpcFBvc2l0aW9uKHNoaXAsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBwb3NzaWJsZVBvc2l0aW9ucyA9IFtdO1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcblxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdyb3cnKSB7XG4gICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sICsgc2hpcC5sZW5ndGg7IGkrKykgcG9zc2libGVQb3NpdGlvbnMucHVzaChbcm93LCBpXSk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdjb2wnKSB7XG4gICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgc2hpcC5sZW5ndGg7IGkrKykgcG9zc2libGVQb3NpdGlvbnMucHVzaChbaSwgY29sXSk7XG4gICAgfVxuXG4gICAgc2hpcC5wb3NpdGlvbiA9IHBvc3NpYmxlUG9zaXRpb25zO1xuICAgIHJldHVybiBwb3NzaWJsZVBvc2l0aW9ucy5ldmVyeShwb3NpdGlvbiA9PiB0aGlzLmlzVmFsaWQocG9zaXRpb24pKTtcbiAgfVxuXG4gIGlzVmFsaWQoY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoKHJvdyA8IDAgfHwgY29sIDwgMCB8fCByb3cgPiA5IHx8IGNvbCA+IDkpIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcFRpbGVzKHNoaXApIHtcbiAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBzaGlwLm5hbWU7XG4gICAgfSlcbiAgfVxuXG4gIHBsYWNlV2F0ZXJUaWxlcyhzaGlwKSB7XG4gICAgY29uc3QgcG9zc2libGVXYXRlclRpbGVzID0gW107XG5cbiAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgZm9yIChsZXQgaSA9IHJvdyAtIDE7IGkgPD0gcm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBjb2wgLSAxOyBqIDw9IGNvbCArIDE7IGorKykge1xuICAgICAgICAgIGlmICgoaSAhPT0gcm93IHx8IGogIT09IGNvbCkgJiYgKGkgPj0gMCAmJiBqID49IDAgJiYgaSA8IDEwICYmIGogPCAxMCkpIHBvc3NpYmxlV2F0ZXJUaWxlcy5wdXNoKFtpLCBqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcG9zc2libGVXYXRlclRpbGVzLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgaWYgKCF0aGlzLmJvYXJkW3Jvd11bY29sXSkgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBcIndhdGVyXCI7XG4gICAgfSlcbiAgfVxuXG4gIHByaW50Qm9hcmQoKSB7XG4gICAgdGhpcy5ib2FyZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImNvbnN0IGdhbWVDb250cm9sbGVyID0gKHBsYXllciwgY29tcHV0ZXIpID0+IHtcblxuICBjb25zdCBwbGFjZVBsYXllclNoaXBzID0gKCkgPT4ge1xuICAgIHBsYXllci5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VDb21wdXRlclNoaXBzID0gKCkgPT4ge1xuICAgIGNvbXB1dGVyLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgfTtcblxuICBjb25zdCBjaGVja0FsbFNoaXBzUGxhY2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBzID0gT2JqZWN0LnZhbHVlcyhwbGF5ZXIuYm9hcmQuc2hpcHMpO1xuXG4gICAgcmV0dXJuIHNoaXBzLnNvbWUoc2hpcCA9PiBzaGlwLnBvc2l0aW9uLmxlbmd0aCAhPT0gMClcbiAgfVxuXG4gIGNvbnN0IGZpcnN0VHVybiA9ICgpID0+IHtcbiAgICBwbGF5ZXIudHVybiA9IHRydWU7XG4gICAgY29tcHV0ZXIudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgY29uc3QgY2hhbmdlVHVybnMgPSAoKSA9PiB7XG4gICAgcGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICBjb21wdXRlci5jaGFuZ2VUdXJuKCk7XG4gIH1cblxuICBjb25zdCBnZXRDbGlja2VkQ2VsbCA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KVxuICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gIH07XG5cbiAgY29uc3QgaXNIaXQgPSAoYXR0YWNrKSA9PiB7XG4gICAgcmV0dXJuIGF0dGFjaztcbiAgfVxuXG4gIGNvbnN0IGNoZWNrV2lubmVyID0gKCkgPT4ge1xuICAgIHJldHVybiBwbGF5ZXIudHVybiA/IGNvbXB1dGVyLmJvYXJkLmFsbFNoaXBzU3VuaygpIDogcGxheWVyLmJvYXJkLmFsbFNoaXBzU3VuaygpO1xuICB9XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XG4gICAgcGxheWVyLnR1cm4gPSBmYWxzZTtcbiAgICBjb21wdXRlci50dXJuID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geyBcbiAgICBwbGFjZVBsYXllclNoaXBzLFxuICAgIHBsYWNlQ29tcHV0ZXJTaGlwcyxcbiAgICBjaGVja0FsbFNoaXBzUGxhY2VkLFxuICAgIGZpcnN0VHVybixcbiAgICBjaGFuZ2VUdXJucyxcbiAgICBnZXRDbGlja2VkQ2VsbCxcbiAgICBpc0hpdCxcbiAgICBjaGVja1dpbm5lcixcbiAgICBnYW1lT3ZlclxuICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyXG4iLCJpbXBvcnQgZ2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vZ2FtZUNvbnRyb2xsZXIuanNcIjtcbmltcG9ydCBET00gZnJvbSBcIi4vRE9NLmpzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllckZhY3RvcnkuanNcIjtcblxuY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigncGxheWVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdjb21wdXRlcicpO1xuXG4gICAgY29uc3QgZ2FtZSA9IGdhbWVDb250cm9sbGVyKHBsYXllciwgY29tcHV0ZXIpO1xuICAgIGNvbnN0IGRvbSA9IERPTShwbGF5ZXIsIGNvbXB1dGVyKTtcblxuICAgIGNvbnN0IGhhbmRsZVBsYXllckF0dGFjayA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXBsYXllci50dXJuKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93LCBldmVudC50YXJnZXQuZGF0YXNldC5jb2xdO1xuICAgICAgICBpZiAoIXBsYXllci5jaGVja0Nvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGF0dGFjayA9IHBsYXllci5wbGF5ZXJBdHRhY2soY29vcmRpbmF0ZXMsIGNvbXB1dGVyLmJvYXJkKTtcblxuICAgICAgICAoZ2FtZS5pc0hpdChhdHRhY2spKSA/IGRvbS5kaXNwbGF5SGl0KCkgOiBkb20uZGlzcGxheU1pc3MoKTtcblxuICAgICAgICBpZiAoZ2FtZS5jaGVja1dpbm5lcigpKSB7XG4gICAgICAgICAgICBkb20uZGlzcGxheVdpbm5lcigpXG4gICAgICAgICAgICBnYW1lLmdhbWVPdmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lLmNoYW5nZVR1cm5zKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGhhbmRsZUNQVUF0dGFjaywgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZUNQVUF0dGFjayA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFjb21wdXRlci50dXJuKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgYXR0YWNrID0gY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2socGxheWVyLmJvYXJkKTtcblxuICAgICAgICAoZ2FtZS5pc0hpdChhdHRhY2spKSA/IGRvbS5kaXNwbGF5SGl0KCkgOiBkb20uZGlzcGxheU1pc3MoKTtcblxuICAgICAgICBpZiAoZ2FtZS5jaGVja1dpbm5lcigpKSB7XG4gICAgICAgICAgICBkb20uZGlzcGxheVdpbm5lcigpXG4gICAgICAgICAgICBnYW1lLmdhbWVPdmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lLmNoYW5nZVR1cm5zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhZGRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcHV0ZXIgLmNlbGwnKTtcbiAgICAgICAgY29tcHV0ZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVBsYXllckF0dGFjaykpO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZURpcmVjdGlvbkhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5kaXJlY3Rpb24nKTtcbiAgICAgICAgZGlyZWN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9tLmNoYW5nZURpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgY29uc3QgcmFuZG9tUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucmFuZG9tJyk7XG4gICAgICAgIHJhbmRvbUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChnYW1lLmNoZWNrQWxsU2hpcHNQbGFjZWQoKSkge1xuICAgICAgICAgICAgICAgIHBsYXllci5yZXNldFBsYXllcigpXG4gICAgICAgICAgICAgICAgZG9tLmNsZWFuUGxheWVyQm9hcmQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWVyLnJhbmRvbVNoaXBQbGFjZW1lbnQoKVxuICAgICAgICAgICAgZG9tLmRpc3BsYXlQbGF5ZXJTaGlwcygpXG5cbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllciAuY2VsbCcpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGRvbS5tb3VzZU92ZXJDZWxsKTtcbiAgICAgICAgICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZG9tLm1vdXNlT3V0Q2VsbCk7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGRvbS5jbGlja0NlbGwpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBQbGFjZW1lbnRIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIgLmNlbGwnKVxuICAgICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZG9tLm1vdXNlT3ZlckNlbGwpO1xuICAgIFxuICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBkb20ubW91c2VPdXRDZWxsKTtcbiAgICBcbiAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9tLmNsaWNrQ2VsbClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwc1BsYWNlbWVudCA9ICgpID0+IHtcbiAgICAgICAgZG9tLmRpc3BsYXlCb2FyZHMoKTtcbiAgICAgICAgc2hpcFBsYWNlbWVudEhhbmRsZXIoKVxuICAgICAgICByYW5kb21QbGFjZW1lbnQoKVxuICAgICAgICBjaGFuZ2VEaXJlY3Rpb25IYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgZ2FtZS5wbGFjZUNvbXB1dGVyU2hpcHMoKTtcbiAgICAgICAgZ2FtZS5maXJzdFR1cm4oKVxuICAgICAgICBhZGRMaXN0ZW5lcnMoKVxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB2c0NQVUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlLnZzLUNQVScpO1xuICAgICAgICB2c0NQVUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS52cy1DUFUnKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgc2hpcHNQbGFjZW1lbnQoKVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheS1nYW1lJyk7XG4gICAgICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGdhbWUuY2hlY2tBbGxTaGlwc1BsYWNlZCgpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tcGxhY2VtZW50JykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItY29udGFpbmVyJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBpbml0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBwbGF5QWdhaW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucGxheS1hZ2FpbicpO1xuICAgICAgICBwbGF5QWdhaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXIucmVzZXRQbGF5ZXIoKTtcbiAgICAgICAgICAgIGNvbXB1dGVyLnJlc2V0UGxheWVyKCk7XG4gICAgICAgICAgICBkb20ucmVzZXRJbnRlcmZhY2UoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7IFxuICAgICAgICBzdGFydFxuICAgIH1cbn1cblxucGxheUdhbWUoKS5zdGFydCgpXG5cbiIsImltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZEZhY3RvcnkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIHRoaXMuYXR0YWNrc0RvbmUgPSBbXTtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RBdHRhY2tIaXQgPSBmYWxzZTtcbiAgICB0aGlzLmhpdENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZSA9IG51bGw7XG4gICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgfVxuXG4gIHBsYXllckF0dGFjayhjb29yZGluYXRlcywgY29tcHV0ZXJCb2FyZCkge1xuICAgIGlmICghdGhpcy5jaGVja0Nvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSkgcmV0dXJuO1xuICAgIHRoaXMuYXR0YWNrc0RvbmUucHVzaChjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH1cblxuICBjb21wdXRlckF0dGFjayhwbGF5ZXJCb2FyZCkge1xuICAgIGlmICghdGhpcy5sYXN0QXR0YWNrSGl0IHx8ICF0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRBdHRhY2tTdGF0dXMoKTtcbiAgICAgIGNvbnN0IGF0dGFjayA9IHRoaXMucmFuZG9tQ29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpO1xuICAgICAgaWYgKGF0dGFjaykgcmV0dXJuIHRoaXMuY29tcHV0ZXJBdHRhY2tIaXRzKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxhc3RBdHRhY2tIaXQgJiYgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLnNoaWZ0KCk7XG4gICAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgYXR0YWNrID0gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICBpZiAoYXR0YWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVyQXR0YWNrSGl0cygpO1xuICAgICAgfSBlbHNlIGlmICghYXR0YWNrICYmICF0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZXNldEF0dGFja1N0YXR1cygpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldEF0dGFja1N0YXR1cygpIHtcbiAgICB0aGlzLmxhc3RBdHRhY2tIaXQgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RIaXRDb29yZGluYXRlID0gbnVsbDtcbiAgICB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcyA9IFtdO1xuICB9XG5cbiAgcmFuZG9tU2hpcFBsYWNlbWVudCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IE9iamVjdC52YWx1ZXModGhpcy5ib2FyZC5zaGlwcyk7XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHRoaXMucmFuZG9tUGxhY2VtZW50Q29vcmRpbmF0ZXMoc2hpcCk7XG4gICAgICBjb25zb2xlLmxvZyhwbGFjZW1lbnQpXG4gICAgICByZXR1cm4gdGhpcy5ib2FyZC5wbGFjZVNoaXBzKHNoaXAubmFtZSwgcGxhY2VtZW50LmNvb3JkaW5hdGVzLCBwbGFjZW1lbnQuZGlyZWN0aW9uKTtcbiAgICB9KVxuICB9XG5cbiAgcmVtb3ZlU2hpcFBsYWNlbWVudCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IE9iamVjdC52YWx1ZXModGhpcy5ib2FyZC5zaGlwcyk7XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIHNoaXAucG9zaXRpb24gPSBbXTtcbiAgICB9KVxuICB9XG5cbiAgcmFuZG9tUGxhY2VtZW50Q29vcmRpbmF0ZXMoc2hpcCkge1xuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgZGlyZWN0aW9uID0gdGhpcy5yYW5kb21EaXJlY3Rpb24oKVxuXG4gICAgd2hpbGUgKHJvdyArIHNoaXAubGVuZ3RoID4gMTAgfHwgY29sICsgc2hpcC5sZW5ndGggPiAxMCB8fCAhdGhpcy5ib2FyZC5zaGlwUG9zaXRpb24oc2hpcCwgW3JvdywgY29sXSwgZGlyZWN0aW9uKSkge1xuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgZGlyZWN0aW9uID0gdGhpcy5yYW5kb21EaXJlY3Rpb24oKVxuICAgIH1cblxuICAgIHJldHVybiAgeyBjb29yZGluYXRlczogW3JvdywgY29sXSwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfVxuICB9XG5cbiAgcmFuZG9tQ29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMucmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGNvbXB1dGVyQXR0YWNrSGl0cygpIHtcbiAgICB0aGlzLmxhc3RBdHRhY2tIaXQgPSB0cnVlO1xuICAgIHRoaXMuaGl0Q29vcmRpbmF0ZXMucHVzaCh0aGlzLmF0dGFja3NEb25lLmF0KC0xKSk7XG4gICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZSA9IHRoaXMuaGl0Q29vcmRpbmF0ZXMuYXQoLTEpO1xuICAgIGNvbnN0IG1vdmVzID0gW1sxLCAwXSwgWy0xLCAwXSwgWzAsIDFdLCBbMCwgLTFdXTtcbiAgICBtb3Zlcy5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgY29uc3QgbmV3Um93ID0gbW92ZVswXSArIHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMF07XG4gICAgICBjb25zdCBuZXdDb2wgPSBtb3ZlWzFdICsgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZVsxXTtcbiAgICAgIGlmICghdGhpcy5jaGVja0Nvb3JkaW5hdGVzKFtuZXdSb3csIG5ld0NvbF0pIHx8IChuZXdSb3cgPCAwIHx8IG5ld0NvbCA8IDAgfHwgbmV3Um93ID4gOSB8fCBuZXdDb2wgPiA5KSkgcmV0dXJuO1xuICAgICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMucHVzaChbbmV3Um93LCBuZXdDb2xdKTtcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMuaGl0Q29vcmRpbmF0ZXMubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMF0gPT09IHRoaXMuaGl0Q29vcmRpbmF0ZXMuYXQoLTIpWzBdICYmXG4gICAgICB0aGlzLmxhc3RIaXRDb29yZGluYXRlWzFdIC0gdGhpcy5oaXRDb29yZGluYXRlcy5hdCgtMilbMV0gPD0gMSkge1xuICAgICAgICB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLmZpbHRlcihtb3ZlID0+IG1vdmVbMF0gPT09IHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMF0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhc3RIaXRDb29yZGluYXRlWzFdID09PSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0yKVsxXSAmJlxuICAgICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZVswXSAtIHRoaXMuaGl0Q29vcmRpbmF0ZXMuYXQoLTIpWzBdIDw9IDEpIHtcbiAgICAgICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5maWx0ZXIobW92ZSA9PiBtb3ZlWzFdID09PSB0aGlzLmxhc3RIaXRDb29yZGluYXRlWzFdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjaGFuZ2VUdXJuKCkge1xuICAgIHRoaXMudHVybiA/IHRoaXMudHVybiA9IGZhbHNlIDogdGhpcy50dXJuID0gdHJ1ZTtcbiAgfVxuXG4gIHJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgIHdoaWxlICghdGhpcy5jaGVja0Nvb3JkaW5hdGVzKFtyb3csIGNvbF0pKSB7XG4gICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyb3csIGNvbF07XG4gIH1cblxuICBjaGVja0Nvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdGhpcy5hdHRhY2tzRG9uZSkge1xuICAgICAgaWYgKGVsZW1lbnRbMF0gPT09IHJvdyAmJiBlbGVtZW50WzFdID09PSBjb2wpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByYW5kb21EaXJlY3Rpb24oKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gWydyb3cnLCAnY29sJ107XG4gICAgY29uc3QgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBkaXJlY3Rpb24ubGVuZ3RoKTtcbiAgICByZXR1cm4gZGlyZWN0aW9uW3Bvc2l0aW9uXTtcbiAgfVxuXG4gIHJlc2V0UGxheWVyKCkge1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB0aGlzLmF0dGFja3NEb25lID0gW107XG4gICAgdGhpcy5sYXN0QXR0YWNrSGl0ID0gZmFsc2U7XG4gICAgdGhpcy5oaXRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMubGFzdEhpdENvb3JkaW5hdGUgPSBudWxsO1xuICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzID0gW107XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnBvc2l0aW9uID0gW107XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgfVxuXG4gIGdldEhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICB0aGlzLmlzU3VuaygpO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHRoaXMuc3VuayA9IHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9