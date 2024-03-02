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

  const shipPlacement = () => {
    const ships = [
      {
        name: "carrier",
        length: 5,
      },
      {
        name: "battleship",
        length: 4,
      },
      {
        name: "destroyer",
        length: 3,
      },
      {
        name: "submarine",
        length: 2,
      },
      {
        name: "patrolBoat",
        length: 2,
      },
    ]

    const cells = document.querySelectorAll('.player .cell')
    cells.forEach(cell => {
      cell.addEventListener('mouseover', (event) => {
        if (!ships.length) return;
        mouseOverCell(event, ships);
      });

      cell.addEventListener('mouseout', () => {
        if (!ships.length) return;
        mouseOutCell();
      });

      cell.addEventListener('click', (event) => {
        if (!ships.length) return;
        clickCell(event, ships);
        placementInformation(ships[0])
      })
    })
  }

  const mouseOverCell = (event, ships) => {
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

  const clickCell = (event, ships) => {
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
    shipPlacement,
    changeDirection,
    displayHit,
    displayMiss,
    displayWinner,
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
      patrolBoat: new _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]("patrolBoat", 2),
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

    return ships.every(ship => ship.position.length !== 0)
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

    const removeListeners = () => {
        const computerCells = document.querySelectorAll('.computer .cell');
        computerCells.forEach(cell => cell.removeEventListener('click', handlePlayerAttack));
    }

    const shipsPlacementHandler = () => {
        const directionButton = document.querySelector('button.direction');
        directionButton.addEventListener('click', dom.changeDirection);

        const randomButton = document.querySelector('button.random');
        randomButton.addEventListener('click', () => {
            const shipsAlreadyPlaced = document.querySelectorAll('.ship');
            if (shipsAlreadyPlaced.length !== 0) {
                shipsAlreadyPlaced.forEach(ship => {
                    ship.classList.remove('ship')
                })
                player.removeShipPlacement()
            }
            player.randomShipPlacement();
            dom.displayPlayerShips()
        })
    }

    const shipsPlacement = () => {
        dom.displayBoards();
        dom.shipPlacement()
        shipsPlacementHandler();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkhzQzs7QUFFdkI7QUFDZjtBQUNBO0FBQ0EscUJBQXFCLHdEQUFLO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQix3REFBSztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3SWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zaGlwRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAocGxheWVyLCBjb21wdXRlcikgPT4ge1xuXG4gIGNvbnN0IGRpc3BsYXlCb2FyZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci5ib2FyZFwiKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci5ib2FyZFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBwbGF5ZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGxheWVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgcGxheWVyQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIHBsYXllckNlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChwbGF5ZXJDZWxsKTtcblxuICAgICAgICBjb25zdCBjb21wdXRlckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb21wdXRlckNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJDZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2hpcFBsYWNlbWVudCA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJjYXJyaWVyXCIsXG4gICAgICAgIGxlbmd0aDogNSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiYmF0dGxlc2hpcFwiLFxuICAgICAgICBsZW5ndGg6IDQsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcImRlc3Ryb3llclwiLFxuICAgICAgICBsZW5ndGg6IDMsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcInN1Ym1hcmluZVwiLFxuICAgICAgICBsZW5ndGg6IDIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcInBhdHJvbEJvYXRcIixcbiAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgfSxcbiAgICBdXG5cbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIgLmNlbGwnKVxuICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXNoaXBzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBtb3VzZU92ZXJDZWxsKGV2ZW50LCBzaGlwcyk7XG4gICAgICB9KTtcblxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgaWYgKCFzaGlwcy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgbW91c2VPdXRDZWxsKCk7XG4gICAgICB9KTtcblxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXNoaXBzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBjbGlja0NlbGwoZXZlbnQsIHNoaXBzKTtcbiAgICAgICAgcGxhY2VtZW50SW5mb3JtYXRpb24oc2hpcHNbMF0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBtb3VzZU92ZXJDZWxsID0gKGV2ZW50LCBzaGlwcykgPT4ge1xuICAgIGNvbnN0IHNoaXAgPSBzaGlwc1swXTtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gW3BhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbCldO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXJlY3Rpb24nKS52YWx1ZTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSBjb2w7IGkgPCBjb2wgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpID4gOSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzdHlsZUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtpfVwiXWApO1xuICAgICAgICBzdHlsZUNlbGwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1zaGlwJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY29sXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPCByb3cgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpID4gOSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBzdHlsZUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyIC5jZWxsW2RhdGEtcm93PVwiJHtpfVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgICBzdHlsZUNlbGwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1zaGlwJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbW91c2VPdXRDZWxsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpc3BsYXktc2hpcCcpO1xuICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXktc2hpcCcpXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGNsaWNrQ2VsbCA9IChldmVudCwgc2hpcHMpID0+IHtcbiAgICBjb25zdCBzaGlwID0gc2hpcHNbMF07XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KSwgcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sKV07XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpcmVjdGlvbicpLnZhbHVlO1xuICAgIGNvbnN0IHNoaXBQbGFjZWQgPSBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwcyhzaGlwLm5hbWUsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb24pO1xuICAgIGlmICghc2hpcFBsYWNlZCkgcmV0dXJuO1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRpc3BsYXktc2hpcCcpO1xuICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheS1zaGlwJylcbiAgICB9KVxuICAgIHNoaXBzLnNoaWZ0KCk7XG4gIH1cblxuICBjb25zdCBjaGFuZ2VEaXJlY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcInJvd1wiKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IFwiY29sXCI7XG4gICAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9IFwiVmVydGljYWxcIjtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gXCJjb2xcIikge1xuICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSBcInJvd1wiO1xuICAgICAgICBldmVudC50YXJnZXQudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWxcIjtcbiAgICB9XG59XG5cbmNvbnN0IHBsYWNlbWVudEluZm9ybWF0aW9uID0gKHNoaXApID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAtbmFtZScpO1xuICBpZiAoIXNoaXApIHtcbiAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIkFsbCBzaGlwcyBwbGFjZWQhXCJcbiAgfSBlbHNlIHtcbiAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3NoaXAubmFtZX0uYFxuICB9XG59XG5cbiAgY29uc3QgZGlzcGxheVBsYXllclNoaXBzID0gKCkgPT4ge1xuICAgIGxldCBzaGlwUG9zaXRpb25zID0gW107XG4gICAgXG4gICAgT2JqZWN0LnZhbHVlcyhwbGF5ZXIuYm9hcmQuc2hpcHMpLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBzaGlwUG9zaXRpb25zID0gc2hpcFBvc2l0aW9ucy5jb25jYXQoc2hpcC5wb3NpdGlvbik7XG4gICAgfSlcblxuICAgIHNoaXBQb3NpdGlvbnMuZm9yRWFjaChjb29yZGluYXRlcyA9PiB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlIaXQgPSAoKSA9PiB7XG4gICAgLy8gY2hhbmdlIHdpdGggYW4gZXZlbnQgdGFyZ2V0XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gcGxheWVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29tcHV0ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfSBlbHNlIGlmIChjb21wdXRlci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29tcHV0ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGlzcGxheU1pc3MgPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gcGxheWVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29tcHV0ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIudHVybikge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvbXB1dGVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBkaXNwbGF5V2lubmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXInKTtcbiAgICBjb25zdCB3aW5uZXJNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5lciAubWVzc2FnZScpXG4gICAgd2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICB3aW5uZXJNZXNzYWdlLnRleHRDb250ZW50ID0gXCJZb3Ugd2luIVwiO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIudHVybikge1xuICAgICAgd2lubmVyTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXIgd2lucyFcIlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlc2V0SW50ZXJmYWNlID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUudnMtQ1BVJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1wbGFjZW1lbnQnKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1jb250YWluZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci5ib2FyZCcpLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci5ib2FyZCcpLnJlcGxhY2VDaGlsZHJlbigpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwbGF5Qm9hcmRzLFxuICAgIGRpc3BsYXlQbGF5ZXJTaGlwcyxcbiAgICBzaGlwUGxhY2VtZW50LFxuICAgIGNoYW5nZURpcmVjdGlvbixcbiAgICBkaXNwbGF5SGl0LFxuICAgIGRpc3BsYXlNaXNzLFxuICAgIGRpc3BsYXlXaW5uZXIsXG4gICAgcmVzZXRJbnRlcmZhY2VcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERPTTsiLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwRmFjdG9yeS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5zaGlwcyA9IHtcbiAgICAgIGNhcnJpZXI6IG5ldyBTaGlwKFwiY2FycmllclwiLCA1KSxcbiAgICAgIGJhdHRsZXNoaXA6IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KSxcbiAgICAgIGRlc3Ryb3llcjogbmV3IFNoaXAoXCJkZXN0cm95ZXJcIiwgMyksXG4gICAgICBzdWJtYXJpbmU6IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsIDIpLFxuICAgICAgcGF0cm9sQm9hdDogbmV3IFNoaXAoXCJwYXRyb2xCb2F0XCIsIDIpLFxuICAgIH07XG4gIH1cblxuICBwbGFjZVNoaXBzKHNoaXBOYW1lLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSB7XG4gICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcE5hbWVdO1xuXG4gICAgaWYgKCF0aGlzLnNoaXBQb3NpdGlvbihzaGlwLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5wbGFjZVNoaXBUaWxlcyhzaGlwKTtcbiAgICB0aGlzLnBsYWNlV2F0ZXJUaWxlcyhzaGlwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAodGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IFwiWFwiIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdID09PSBcIk9cIikgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLmJvYXJkW3Jvd11bY29sXSB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IFwiT1wiO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3RoaXMuYm9hcmRbcm93XVtjb2xdXTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IFwiWFwiO1xuICAgIHNoaXAuZ2V0SGl0KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5zaGlwcykuZXZlcnkoc2hpcCA9PiBzaGlwLnN1bmspO1xuICB9XG5cbiAgc2hpcFBvc2l0aW9uKHNoaXAsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBwb3NzaWJsZVBvc2l0aW9ucyA9IFtdO1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcblxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdyb3cnKSB7XG4gICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sICsgc2hpcC5sZW5ndGg7IGkrKykgcG9zc2libGVQb3NpdGlvbnMucHVzaChbcm93LCBpXSk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdjb2wnKSB7XG4gICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgc2hpcC5sZW5ndGg7IGkrKykgcG9zc2libGVQb3NpdGlvbnMucHVzaChbaSwgY29sXSk7XG4gICAgfVxuXG4gICAgc2hpcC5wb3NpdGlvbiA9IHBvc3NpYmxlUG9zaXRpb25zO1xuICAgIHJldHVybiBwb3NzaWJsZVBvc2l0aW9ucy5ldmVyeShwb3NpdGlvbiA9PiB0aGlzLmlzVmFsaWQocG9zaXRpb24pKTtcbiAgfVxuXG4gIGlzVmFsaWQoY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoKHJvdyA8IDAgfHwgY29sIDwgMCB8fCByb3cgPiA5IHx8IGNvbCA+IDkpIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcFRpbGVzKHNoaXApIHtcbiAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBzaGlwLm5hbWU7XG4gICAgfSlcbiAgfVxuXG4gIHBsYWNlV2F0ZXJUaWxlcyhzaGlwKSB7XG4gICAgY29uc3QgcG9zc2libGVXYXRlclRpbGVzID0gW107XG5cbiAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgZm9yIChsZXQgaSA9IHJvdyAtIDE7IGkgPD0gcm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBjb2wgLSAxOyBqIDw9IGNvbCArIDE7IGorKykge1xuICAgICAgICAgIGlmICgoaSAhPT0gcm93IHx8IGogIT09IGNvbCkgJiYgKGkgPj0gMCAmJiBqID49IDAgJiYgaSA8IDEwICYmIGogPCAxMCkpIHBvc3NpYmxlV2F0ZXJUaWxlcy5wdXNoKFtpLCBqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcG9zc2libGVXYXRlclRpbGVzLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgaWYgKCF0aGlzLmJvYXJkW3Jvd11bY29sXSkgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBcIndhdGVyXCI7XG4gICAgfSlcbiAgfVxuXG4gIHByaW50Qm9hcmQoKSB7XG4gICAgdGhpcy5ib2FyZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImNvbnN0IGdhbWVDb250cm9sbGVyID0gKHBsYXllciwgY29tcHV0ZXIpID0+IHtcblxuICBjb25zdCBwbGFjZVBsYXllclNoaXBzID0gKCkgPT4ge1xuICAgIHBsYXllci5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VDb21wdXRlclNoaXBzID0gKCkgPT4ge1xuICAgIGNvbXB1dGVyLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgfTtcblxuICBjb25zdCBjaGVja0FsbFNoaXBzUGxhY2VkID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBzID0gT2JqZWN0LnZhbHVlcyhwbGF5ZXIuYm9hcmQuc2hpcHMpO1xuXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5wb3NpdGlvbi5sZW5ndGggIT09IDApXG4gIH1cblxuICBjb25zdCBmaXJzdFR1cm4gPSAoKSA9PiB7XG4gICAgcGxheWVyLnR1cm4gPSB0cnVlO1xuICAgIGNvbXB1dGVyLnR1cm4gPSBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNoYW5nZVR1cm5zID0gKCkgPT4ge1xuICAgIHBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgY29tcHV0ZXIuY2hhbmdlVHVybigpO1xuICB9XG5cbiAgY29uc3QgZ2V0Q2xpY2tlZENlbGwgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdylcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbCk7XG4gICAgICBcbiAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICB9O1xuXG4gIGNvbnN0IGlzSGl0ID0gKGF0dGFjaykgPT4ge1xuICAgIHJldHVybiBhdHRhY2s7XG4gIH1cblxuICBjb25zdCBjaGVja1dpbm5lciA9ICgpID0+IHtcbiAgICByZXR1cm4gcGxheWVyLnR1cm4gPyBjb21wdXRlci5ib2FyZC5hbGxTaGlwc1N1bmsoKSA6IHBsYXllci5ib2FyZC5hbGxTaGlwc1N1bmsoKTtcbiAgfVxuXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4ge1xuICAgIHBsYXllci50dXJuID0gZmFsc2U7XG4gICAgY29tcHV0ZXIudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHsgXG4gICAgcGxhY2VQbGF5ZXJTaGlwcyxcbiAgICBwbGFjZUNvbXB1dGVyU2hpcHMsXG4gICAgY2hlY2tBbGxTaGlwc1BsYWNlZCxcbiAgICBmaXJzdFR1cm4sXG4gICAgY2hhbmdlVHVybnMsXG4gICAgZ2V0Q2xpY2tlZENlbGwsXG4gICAgaXNIaXQsXG4gICAgY2hlY2tXaW5uZXIsXG4gICAgZ2FtZU92ZXJcbiAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlclxuIiwiaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2dhbWVDb250cm9sbGVyLmpzXCI7XG5pbXBvcnQgRE9NIGZyb20gXCIuL0RPTS5qc1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoJ3BsYXllcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcignY29tcHV0ZXInKTtcblxuICAgIGNvbnN0IGdhbWUgPSBnYW1lQ29udHJvbGxlcihwbGF5ZXIsIGNvbXB1dGVyKTtcbiAgICBjb25zdCBkb20gPSBET00ocGxheWVyLCBjb21wdXRlcik7XG5cbiAgICBjb25zdCBoYW5kbGVQbGF5ZXJBdHRhY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFwbGF5ZXIudHVybikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW2V2ZW50LnRhcmdldC5kYXRhc2V0LnJvdywgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sXTtcbiAgICAgICAgaWYgKCFwbGF5ZXIuY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykpIHJldHVybjtcblxuICAgICAgICBjb25zdCBhdHRhY2sgPSBwbGF5ZXIucGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzLCBjb21wdXRlci5ib2FyZCk7XG5cbiAgICAgICAgKGdhbWUuaXNIaXQoYXR0YWNrKSkgPyBkb20uZGlzcGxheUhpdCgpIDogZG9tLmRpc3BsYXlNaXNzKCk7XG5cbiAgICAgICAgaWYgKGdhbWUuY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICAgICAgZG9tLmRpc3BsYXlXaW5uZXIoKVxuICAgICAgICAgICAgZ2FtZS5nYW1lT3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZS5jaGFuZ2VUdXJucygpO1xuICAgICAgICAgICAgc2V0VGltZW91dChoYW5kbGVDUFVBdHRhY2ssIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVDUFVBdHRhY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICghY29tcHV0ZXIudHVybikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGF0dGFjayA9IGNvbXB1dGVyLmNvbXB1dGVyQXR0YWNrKHBsYXllci5ib2FyZCk7XG5cbiAgICAgICAgKGdhbWUuaXNIaXQoYXR0YWNrKSkgPyBkb20uZGlzcGxheUhpdCgpIDogZG9tLmRpc3BsYXlNaXNzKCk7XG5cbiAgICAgICAgaWYgKGdhbWUuY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICAgICAgZG9tLmRpc3BsYXlXaW5uZXIoKVxuICAgICAgICAgICAgZ2FtZS5nYW1lT3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZS5jaGFuZ2VUdXJucygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWRkTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21wdXRlckNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXB1dGVyIC5jZWxsJyk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGF5ZXJBdHRhY2spKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcHV0ZXIgLmNlbGwnKTtcbiAgICAgICAgY29tcHV0ZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVBsYXllckF0dGFjaykpO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXBzUGxhY2VtZW50SGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmRpcmVjdGlvbicpO1xuICAgICAgICBkaXJlY3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb20uY2hhbmdlRGlyZWN0aW9uKTtcblxuICAgICAgICBjb25zdCByYW5kb21CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24ucmFuZG9tJyk7XG4gICAgICAgIHJhbmRvbUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzQWxyZWFkeVBsYWNlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwJyk7XG4gICAgICAgICAgICBpZiAoc2hpcHNBbHJlYWR5UGxhY2VkLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHNoaXBzQWxyZWFkeVBsYWNlZC5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcGxheWVyLnJlbW92ZVNoaXBQbGFjZW1lbnQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWVyLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgICAgICAgICAgIGRvbS5kaXNwbGF5UGxheWVyU2hpcHMoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBzUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgICAgICBkb20uZGlzcGxheUJvYXJkcygpO1xuICAgICAgICBkb20uc2hpcFBsYWNlbWVudCgpXG4gICAgICAgIHNoaXBzUGxhY2VtZW50SGFuZGxlcigpO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGdhbWUucGxhY2VDb21wdXRlclNoaXBzKCk7XG4gICAgICAgIGdhbWUuZmlyc3RUdXJuKClcbiAgICAgICAgYWRkTGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdnNDUFVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZS52cy1DUFUnKTtcbiAgICAgICAgdnNDUFVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZS1jb250YWluZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUudnMtQ1BVJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgIHNoaXBzUGxhY2VtZW50KClcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXktZ2FtZScpO1xuICAgICAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChnYW1lLmNoZWNrQWxsU2hpcHNQbGFjZWQoKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBsYWNlbWVudCcpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLWNvbnRhaW5lcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgaW5pdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgcGxheUFnYWluQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXktYWdhaW4nKTtcbiAgICAgICAgcGxheUFnYWluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyLnJlc2V0UGxheWVyKCk7XG4gICAgICAgICAgICBjb21wdXRlci5yZXNldFBsYXllcigpO1xuICAgICAgICAgICAgZG9tLnJlc2V0SW50ZXJmYWNlKClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4geyBcbiAgICAgICAgc3RhcnRcbiAgICB9XG59XG5cbnBsYXlHYW1lKCkuc3RhcnQoKVxuXG4iLCJpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRGYWN0b3J5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB0aGlzLmF0dGFja3NEb25lID0gW107XG4gICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0QXR0YWNrSGl0ID0gZmFsc2U7XG4gICAgdGhpcy5oaXRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMubGFzdEhpdENvb3JkaW5hdGUgPSBudWxsO1xuICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzID0gW107XG4gIH1cblxuICBwbGF5ZXJBdHRhY2soY29vcmRpbmF0ZXMsIGNvbXB1dGVyQm9hcmQpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykpIHJldHVybjtcbiAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgY29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpIHtcbiAgICBpZiAoIXRoaXMubGFzdEF0dGFja0hpdCB8fCAhdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2V0QXR0YWNrU3RhdHVzKCk7XG4gICAgICBjb25zdCBhdHRhY2sgPSB0aGlzLnJhbmRvbUNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkKTtcbiAgICAgIGlmIChhdHRhY2spIHJldHVybiB0aGlzLmNvbXB1dGVyQXR0YWNrSGl0cygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0QXR0YWNrSGl0ICYmIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5zaGlmdCgpO1xuICAgICAgdGhpcy5hdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgIGNvbnN0IGF0dGFjayA9IHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgaWYgKGF0dGFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wdXRlckF0dGFja0hpdHMoKTtcbiAgICAgIH0gZWxzZSBpZiAoIWF0dGFjayAmJiAhdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVzZXRBdHRhY2tTdGF0dXMoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXRBdHRhY2tTdGF0dXMoKSB7XG4gICAgdGhpcy5sYXN0QXR0YWNrSGl0ID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZSA9IG51bGw7XG4gICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgfVxuXG4gIHJhbmRvbVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBPYmplY3QudmFsdWVzKHRoaXMuYm9hcmQuc2hpcHMpO1xuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBjb25zdCBwbGFjZW1lbnQgPSB0aGlzLnJhbmRvbVBsYWNlbWVudENvb3JkaW5hdGVzKHNoaXApO1xuICAgICAgcmV0dXJuIHRoaXMuYm9hcmQucGxhY2VTaGlwcyhzaGlwLm5hbWUsIHBsYWNlbWVudC5jb29yZGluYXRlcywgcGxhY2VtZW50LmRpcmVjdGlvbik7XG4gICAgfSlcbiAgfVxuXG4gIHJlbW92ZVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBPYmplY3QudmFsdWVzKHRoaXMuYm9hcmQuc2hpcHMpO1xuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBzaGlwLnBvc2l0aW9uID0gW107XG4gICAgfSlcbiAgfVxuXG4gIHJhbmRvbVBsYWNlbWVudENvb3JkaW5hdGVzKHNoaXApIHtcbiAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMucmFuZG9tRGlyZWN0aW9uKClcblxuICAgIHdoaWxlIChyb3cgKyBzaGlwLmxlbmd0aCA+IDEwIHx8IGNvbCArIHNoaXAubGVuZ3RoID4gMTAgfHwgIXRoaXMuYm9hcmQuc2hpcFBvc2l0aW9uKHNoaXAsIFtyb3csIGNvbF0sIGRpcmVjdGlvbikpIHtcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGRpcmVjdGlvbiA9IHRoaXMucmFuZG9tRGlyZWN0aW9uKClcbiAgICB9XG5cbiAgICByZXR1cm4gIHsgY29vcmRpbmF0ZXM6IFtyb3csIGNvbF0sIGRpcmVjdGlvbjogZGlyZWN0aW9uIH1cbiAgfVxuXG4gIHJhbmRvbUNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLnJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5hdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH1cblxuICBjb21wdXRlckF0dGFja0hpdHMoKSB7XG4gICAgdGhpcy5sYXN0QXR0YWNrSGl0ID0gdHJ1ZTtcbiAgICB0aGlzLmhpdENvb3JkaW5hdGVzLnB1c2godGhpcy5hdHRhY2tzRG9uZS5hdCgtMSkpO1xuICAgIHRoaXMubGFzdEhpdENvb3JkaW5hdGUgPSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0xKTtcbiAgICBjb25zdCBtb3ZlcyA9IFtbMSwgMF0sIFstMSwgMF0sIFswLCAxXSwgWzAsIC0xXV07XG4gICAgbW92ZXMuZm9yRWFjaChtb3ZlID0+IHtcbiAgICAgIGNvbnN0IG5ld1JvdyA9IG1vdmVbMF0gKyB0aGlzLmxhc3RIaXRDb29yZGluYXRlWzBdO1xuICAgICAgY29uc3QgbmV3Q29sID0gbW92ZVsxXSArIHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMV07XG4gICAgICBpZiAoIXRoaXMuY2hlY2tDb29yZGluYXRlcyhbbmV3Um93LCBuZXdDb2xdKSB8fCAobmV3Um93IDwgMCB8fCBuZXdDb2wgPCAwIHx8IG5ld1JvdyA+IDkgfHwgbmV3Q29sID4gOSkpIHJldHVybjtcbiAgICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW25ld1JvdywgbmV3Q29sXSk7XG4gICAgfSlcblxuICAgIGlmICh0aGlzLmhpdENvb3JkaW5hdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICh0aGlzLmxhc3RIaXRDb29yZGluYXRlWzBdID09PSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0yKVswXSAmJlxuICAgICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZVsxXSAtIHRoaXMuaGl0Q29vcmRpbmF0ZXMuYXQoLTIpWzFdIDw9IDEpIHtcbiAgICAgICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5maWx0ZXIobW92ZSA9PiBtb3ZlWzBdID09PSB0aGlzLmxhc3RIaXRDb29yZGluYXRlWzBdKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0SGl0Q29vcmRpbmF0ZVsxXSA9PT0gdGhpcy5oaXRDb29yZGluYXRlcy5hdCgtMilbMV0gJiZcbiAgICAgIHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMF0gLSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0yKVswXSA8PSAxKSB7XG4gICAgICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzID0gdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMuZmlsdGVyKG1vdmUgPT4gbW92ZVsxXSA9PT0gdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZVsxXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2hhbmdlVHVybigpIHtcbiAgICB0aGlzLnR1cm4gPyB0aGlzLnR1cm4gPSBmYWxzZSA6IHRoaXMudHVybiA9IHRydWU7XG4gIH1cblxuICByYW5kb21Db29yZGluYXRlcygpIHtcbiAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICB3aGlsZSAoIXRoaXMuY2hlY2tDb29yZGluYXRlcyhbcm93LCBjb2xdKSkge1xuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cblxuICAgIHJldHVybiBbcm93LCBjb2xdO1xuICB9XG5cbiAgY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuYXR0YWNrc0RvbmUpIHtcbiAgICAgIGlmIChlbGVtZW50WzBdID09PSByb3cgJiYgZWxlbWVudFsxXSA9PT0gY29sKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmFuZG9tRGlyZWN0aW9uKCkge1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IFsncm93JywgJ2NvbCddO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZGlyZWN0aW9uLmxlbmd0aCk7XG4gICAgcmV0dXJuIGRpcmVjdGlvbltwb3NpdGlvbl07XG4gIH1cblxuICByZXNldFBsYXllcigpIHtcbiAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gICAgdGhpcy5hdHRhY2tzRG9uZSA9IFtdO1xuICAgIHRoaXMubGFzdEF0dGFja0hpdCA9IGZhbHNlO1xuICAgIHRoaXMuaGl0Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLmxhc3RIaXRDb29yZGluYXRlID0gbnVsbDtcbiAgICB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcyA9IFtdO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5wb3NpdGlvbiA9IFtdO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gIH1cblxuICBnZXRIaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgdGhpcy5pc1N1bmsoKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICB0aGlzLnN1bmsgPSB0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==