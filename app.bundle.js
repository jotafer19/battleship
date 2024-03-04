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
    const winnerContainer = document.querySelector('.winner-container');
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
    document.querySelector('.winner-container').classList.toggle('inactive')
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
        start,
    }
}

playGame().start()

const playVSPlayer = () => {
    const playerOne = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_2__["default"]('playerOne');
    const playerTwo = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_2__["default"]('playerTwo');

    const game = (0,_gameController_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const dom = (0,_DOM_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

    const vsPlayerGame = () => {
        const vsPlayerButton = document.querySelector('.mode.vs-player');
        vsPlayerButton.addEventListener('click', () => {
            document.querySelector('.mode-container').classList.toggle('inactive');
            document.querySelector('.game.vs-player').classList.toggle('inactive');
        })
    }
}

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
    this.hitCoordinates = [];
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
      if (this.lastHitCoordinate[0] === this.hitCoordinates.at(-2)[0]) {
        this.nextAttackCoordinates = this.nextAttackCoordinates.filter(move => move[0] === this.lastHitCoordinate[0]);
      } else if (this.lastHitCoordinate[1] === this.hitCoordinates.at(-2)[1]) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3SWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zaGlwRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAocGxheWVyLCBjb21wdXRlcikgPT4ge1xuICBjb25zdCBzaGlwcyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnY2FycmllcicsXG4gICAgICBsZW5ndGg6IDUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnYmF0dGxlc2hpcCcsXG4gICAgICBsZW5ndGg6IDQsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZGVzdHJveWVyJyxcbiAgICAgIGxlbmd0aDogMyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdzdWJtYXJpbmUnLFxuICAgICAgbGVuZ3RoOiAyLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3BhdHJvbCcsXG4gICAgICBsZW5ndGg6IDIsXG4gICAgfVxuICBdXG5cbiAgY29uc3QgZGlzcGxheUJvYXJkcyA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLmJvYXJkXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyLmJvYXJkXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwbGF5ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgICBwbGF5ZXJDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgcGxheWVyQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHBsYXllckNlbGwpO1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgY29tcHV0ZXJDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgY29tcHV0ZXJDZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjb21wdXRlckNlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBtb3VzZU92ZXJDZWxsID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCFzaGlwcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBzaGlwID0gc2hpcHNbMF07XG4gICAgY29uc3QgW3JvdywgY29sXSA9IFtwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5yb3cpLCBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5jb2wpXTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlyZWN0aW9uJykudmFsdWU7XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSA+IDkpIHJldHVybjtcbiAgICAgICAgY29uc3Qgc3R5bGVDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7aX1cIl1gKTtcbiAgICAgICAgc3R5bGVDZWxsLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktc2hpcCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSA+IDkpIHJldHVybjtcbiAgICAgICAgY29uc3Qgc3R5bGVDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7aX1cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgICAgc3R5bGVDZWxsLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktc2hpcCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1vdXNlT3V0Q2VsbCA9ICgpID0+IHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kaXNwbGF5LXNoaXAnKTtcbiAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LXNoaXAnKVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBjbGlja0NlbGwgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXNoaXBzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHNoaXAgPSBzaGlwc1swXTtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5yb3cpLCBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5jb2wpXTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlyZWN0aW9uJykudmFsdWU7XG4gICAgY29uc3Qgc2hpcFBsYWNlZCA9IHBsYXllci5ib2FyZC5wbGFjZVNoaXBzKHNoaXAubmFtZSwgY29vcmRpbmF0ZXMsIGRpcmVjdGlvbik7XG4gICAgaWYgKCFzaGlwUGxhY2VkKSByZXR1cm47XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlzcGxheS1zaGlwJyk7XG4gICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5LXNoaXAnKVxuICAgIH0pXG4gICAgc2hpcHMuc2hpZnQoKTtcbiAgfVxuXG4gIGNvbnN0IGNoYW5nZURpcmVjdGlvbiA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT09IFwicm93XCIpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gXCJjb2xcIjtcbiAgICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcImNvbFwiKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IFwicm93XCI7XG4gICAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xuICAgIH1cbn1cblxuY29uc3QgcGxhY2VtZW50SW5mb3JtYXRpb24gPSAoc2hpcCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcC1uYW1lJyk7XG4gIGlmICghc2hpcCkge1xuICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiQWxsIHNoaXBzIHBsYWNlZCFcIlxuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7c2hpcC5uYW1lfS5gXG4gIH1cbn1cblxuICBjb25zdCBkaXNwbGF5UGxheWVyU2hpcHMgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBQb3NpdGlvbnMgPSBbXTtcbiAgICBcbiAgICBPYmplY3QudmFsdWVzKHBsYXllci5ib2FyZC5zaGlwcykuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIHNoaXBQb3NpdGlvbnMgPSBzaGlwUG9zaXRpb25zLmNvbmNhdChzaGlwLnBvc2l0aW9uKTtcbiAgICB9KVxuXG4gICAgc2hpcFBvc2l0aW9ucy5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgZGlzcGxheUhpdCA9ICgpID0+IHtcbiAgICAvLyBjaGFuZ2Ugd2l0aCBhbiBldmVudCB0YXJnZXRcbiAgICBpZiAocGxheWVyLnR1cm4pIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBwbGF5ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb21wdXRlciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9IGVsc2UgaWYgKGNvbXB1dGVyLnR1cm4pIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb21wdXRlci5hdHRhY2tzRG9uZS5hdCgtMSk7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBkaXNwbGF5TWlzcyA9ICgpID0+IHtcbiAgICBpZiAocGxheWVyLnR1cm4pIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBwbGF5ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb21wdXRlciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfSBlbHNlIGlmIChjb21wdXRlci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29tcHV0ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlXaW5uZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2lubmVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5lci1jb250YWluZXInKTtcbiAgICBjb25zdCB3aW5uZXJNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5lciAubWVzc2FnZScpXG4gICAgd2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICB3aW5uZXJNZXNzYWdlLnRleHRDb250ZW50ID0gXCJZb3Ugd2luIVwiO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIudHVybikge1xuICAgICAgd2lubmVyTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXIgd2lucyFcIlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsZWFuUGxheWVyQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsU2hpcFRpbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKTtcbiAgICBhbGxTaGlwVGlsZXMuZm9yRWFjaCh0aWxlID0+IHtcbiAgICAgIHRpbGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgIH0pXG4gIH1cblxuICBjb25zdCByZXNldEludGVyZmFjZSA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZS1jb250YWluZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLnZzLUNQVScpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tcGxhY2VtZW50JykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItY29udGFpbmVyJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLWNvbnRhaW5lcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJylcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLmJvYXJkJykucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLmJvYXJkJykucmVwbGFjZUNoaWxkcmVuKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRpc3BsYXlCb2FyZHMsXG4gICAgZGlzcGxheVBsYXllclNoaXBzLFxuICAgIG1vdXNlT3ZlckNlbGwsXG4gICAgbW91c2VPdXRDZWxsLFxuICAgIGNsaWNrQ2VsbCxcbiAgICBjaGFuZ2VEaXJlY3Rpb24sXG4gICAgZGlzcGxheUhpdCxcbiAgICBkaXNwbGF5TWlzcyxcbiAgICBkaXNwbGF5V2lubmVyLFxuICAgIGNsZWFuUGxheWVyQm9hcmQsXG4gICAgcmVzZXRJbnRlcmZhY2VcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERPTTsiLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwRmFjdG9yeS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5zaGlwcyA9IHtcbiAgICAgIGNhcnJpZXI6IG5ldyBTaGlwKFwiY2FycmllclwiLCA1KSxcbiAgICAgIGJhdHRsZXNoaXA6IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KSxcbiAgICAgIGRlc3Ryb3llcjogbmV3IFNoaXAoXCJkZXN0cm95ZXJcIiwgMyksXG4gICAgICBzdWJtYXJpbmU6IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsIDIpLFxuICAgICAgcGF0cm9sOiBuZXcgU2hpcChcInBhdHJvbFwiLCAyKSxcbiAgICB9O1xuICB9XG5cbiAgcGxhY2VTaGlwcyhzaGlwTmFtZSwgY29vcmRpbmF0ZXMsIGRpcmVjdGlvbikge1xuICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBOYW1lXTtcblxuICAgIGlmICghdGhpcy5zaGlwUG9zaXRpb24oc2hpcCwgY29vcmRpbmF0ZXMsIGRpcmVjdGlvbikpIHJldHVybiBmYWxzZTtcblxuICAgIHRoaXMucGxhY2VTaGlwVGlsZXMoc2hpcCk7XG4gICAgdGhpcy5wbGFjZVdhdGVyVGlsZXMoc2hpcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKHRoaXMuYm9hcmRbcm93XVtjb2xdID09PSBcIlhcIiB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXSA9PT0gXCJPXCIpIHJldHVybiBmYWxzZTtcblxuICAgIGlmICghdGhpcy5ib2FyZFtyb3ddW2NvbF0gfHwgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IFwid2F0ZXJcIikge1xuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBcIk9cIjtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1t0aGlzLmJvYXJkW3Jvd11bY29sXV07XG4gICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICBzaGlwLmdldEhpdCgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuc2hpcHMpLmV2ZXJ5KHNoaXAgPT4gc2hpcC5zdW5rKTtcbiAgfVxuXG4gIHNoaXBQb3NpdGlvbihzaGlwLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSB7XG4gICAgY29uc3QgcG9zc2libGVQb3NpdGlvbnMgPSBbXTtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSAncm93Jykge1xuICAgICAgZm9yIChsZXQgaSA9IGNvbDsgaSA8IGNvbCArIHNoaXAubGVuZ3RoOyBpKyspIHBvc3NpYmxlUG9zaXRpb25zLnB1c2goW3JvdywgaV0pO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnY29sJykge1xuICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdyArIHNoaXAubGVuZ3RoOyBpKyspIHBvc3NpYmxlUG9zaXRpb25zLnB1c2goW2ksIGNvbF0pO1xuICAgIH1cblxuICAgIHNoaXAucG9zaXRpb24gPSBwb3NzaWJsZVBvc2l0aW9ucztcbiAgICByZXR1cm4gcG9zc2libGVQb3NpdGlvbnMuZXZlcnkocG9zaXRpb24gPT4gdGhpcy5pc1ZhbGlkKHBvc2l0aW9uKSk7XG4gIH1cblxuICBpc1ZhbGlkKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKChyb3cgPCAwIHx8IGNvbCA8IDAgfHwgcm93ID4gOSB8fCBjb2wgPiA5KSB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwbGFjZVNoaXBUaWxlcyhzaGlwKSB7XG4gICAgc2hpcC5wb3NpdGlvbi5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gc2hpcC5uYW1lO1xuICAgIH0pXG4gIH1cblxuICBwbGFjZVdhdGVyVGlsZXMoc2hpcCkge1xuICAgIGNvbnN0IHBvc3NpYmxlV2F0ZXJUaWxlcyA9IFtdO1xuXG4gICAgc2hpcC5wb3NpdGlvbi5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICAgIGZvciAobGV0IGkgPSByb3cgLSAxOyBpIDw9IHJvdyArIDE7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gY29sIC0gMTsgaiA8PSBjb2wgKyAxOyBqKyspIHtcbiAgICAgICAgICBpZiAoKGkgIT09IHJvdyB8fCBqICE9PSBjb2wpICYmIChpID49IDAgJiYgaiA+PSAwICYmIGkgPCAxMCAmJiBqIDwgMTApKSBwb3NzaWJsZVdhdGVyVGlsZXMucHVzaChbaSwgal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHBvc3NpYmxlV2F0ZXJUaWxlcy5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICAgIGlmICghdGhpcy5ib2FyZFtyb3ddW2NvbF0pIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gXCJ3YXRlclwiO1xuICAgIH0pXG4gIH1cblxuICBwcmludEJvYXJkKCkge1xuICAgIHRoaXMuYm9hcmQuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyb3cpO1xuICAgIH0pO1xuICB9XG59XG4iLCJjb25zdCBnYW1lQ29udHJvbGxlciA9IChwbGF5ZXIsIGNvbXB1dGVyKSA9PiB7XG5cbiAgY29uc3QgcGxhY2VQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgICBwbGF5ZXIucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlQ29tcHV0ZXJTaGlwcyA9ICgpID0+IHtcbiAgICBjb21wdXRlci5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tBbGxTaGlwc1BsYWNlZCA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwcyA9IE9iamVjdC52YWx1ZXMocGxheWVyLmJvYXJkLnNoaXBzKTtcblxuICAgIHJldHVybiBzaGlwcy5zb21lKHNoaXAgPT4gc2hpcC5wb3NpdGlvbi5sZW5ndGggIT09IDApXG4gIH1cblxuICBjb25zdCBmaXJzdFR1cm4gPSAoKSA9PiB7XG4gICAgcGxheWVyLnR1cm4gPSB0cnVlO1xuICAgIGNvbXB1dGVyLnR1cm4gPSBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNoYW5nZVR1cm5zID0gKCkgPT4ge1xuICAgIHBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgY29tcHV0ZXIuY2hhbmdlVHVybigpO1xuICB9XG5cbiAgY29uc3QgZ2V0Q2xpY2tlZENlbGwgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdylcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbCk7XG4gICAgICBcbiAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICB9O1xuXG4gIGNvbnN0IGlzSGl0ID0gKGF0dGFjaykgPT4ge1xuICAgIHJldHVybiBhdHRhY2s7XG4gIH1cblxuICBjb25zdCBjaGVja1dpbm5lciA9ICgpID0+IHtcbiAgICByZXR1cm4gcGxheWVyLnR1cm4gPyBjb21wdXRlci5ib2FyZC5hbGxTaGlwc1N1bmsoKSA6IHBsYXllci5ib2FyZC5hbGxTaGlwc1N1bmsoKTtcbiAgfVxuXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4ge1xuICAgIHBsYXllci50dXJuID0gZmFsc2U7XG4gICAgY29tcHV0ZXIudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHsgXG4gICAgcGxhY2VQbGF5ZXJTaGlwcyxcbiAgICBwbGFjZUNvbXB1dGVyU2hpcHMsXG4gICAgY2hlY2tBbGxTaGlwc1BsYWNlZCxcbiAgICBmaXJzdFR1cm4sXG4gICAgY2hhbmdlVHVybnMsXG4gICAgZ2V0Q2xpY2tlZENlbGwsXG4gICAgaXNIaXQsXG4gICAgY2hlY2tXaW5uZXIsXG4gICAgZ2FtZU92ZXJcbiAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlclxuIiwiaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2dhbWVDb250cm9sbGVyLmpzXCI7XG5pbXBvcnQgRE9NIGZyb20gXCIuL0RPTS5qc1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoJ3BsYXllcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcignY29tcHV0ZXInKTtcblxuICAgIGNvbnN0IGdhbWUgPSBnYW1lQ29udHJvbGxlcihwbGF5ZXIsIGNvbXB1dGVyKTtcbiAgICBjb25zdCBkb20gPSBET00ocGxheWVyLCBjb21wdXRlcik7XG5cbiAgICBjb25zdCBoYW5kbGVQbGF5ZXJBdHRhY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFwbGF5ZXIudHVybikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW2V2ZW50LnRhcmdldC5kYXRhc2V0LnJvdywgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sXTtcbiAgICAgICAgaWYgKCFwbGF5ZXIuY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykpIHJldHVybjtcblxuICAgICAgICBjb25zdCBhdHRhY2sgPSBwbGF5ZXIucGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzLCBjb21wdXRlci5ib2FyZCk7XG5cbiAgICAgICAgKGdhbWUuaXNIaXQoYXR0YWNrKSkgPyBkb20uZGlzcGxheUhpdCgpIDogZG9tLmRpc3BsYXlNaXNzKCk7XG5cbiAgICAgICAgaWYgKGdhbWUuY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICAgICAgZG9tLmRpc3BsYXlXaW5uZXIoKVxuICAgICAgICAgICAgZ2FtZS5nYW1lT3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZS5jaGFuZ2VUdXJucygpO1xuICAgICAgICAgICAgc2V0VGltZW91dChoYW5kbGVDUFVBdHRhY2ssIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVDUFVBdHRhY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICghY29tcHV0ZXIudHVybikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGF0dGFjayA9IGNvbXB1dGVyLmNvbXB1dGVyQXR0YWNrKHBsYXllci5ib2FyZCk7XG5cbiAgICAgICAgKGdhbWUuaXNIaXQoYXR0YWNrKSkgPyBkb20uZGlzcGxheUhpdCgpIDogZG9tLmRpc3BsYXlNaXNzKCk7XG5cbiAgICAgICAgaWYgKGdhbWUuY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICAgICAgZG9tLmRpc3BsYXlXaW5uZXIoKVxuICAgICAgICAgICAgZ2FtZS5nYW1lT3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZS5jaGFuZ2VUdXJucygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWRkTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21wdXRlckNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXB1dGVyIC5jZWxsJyk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGF5ZXJBdHRhY2spKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VEaXJlY3Rpb25IYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uZGlyZWN0aW9uJyk7XG4gICAgICAgIGRpcmVjdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvbS5jaGFuZ2VEaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnJhbmRvbScpO1xuICAgICAgICByYW5kb21CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ2FtZS5jaGVja0FsbFNoaXBzUGxhY2VkKCkpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIucmVzZXRQbGF5ZXIoKVxuICAgICAgICAgICAgICAgIGRvbS5jbGVhblBsYXllckJvYXJkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXllci5yYW5kb21TaGlwUGxhY2VtZW50KClcbiAgICAgICAgICAgIGRvbS5kaXNwbGF5UGxheWVyU2hpcHMoKVxuXG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIgLmNlbGwnKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBkb20ubW91c2VPdmVyQ2VsbCk7XG4gICAgICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGRvbS5tb3VzZU91dENlbGwpO1xuICAgICAgICAgICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb20uY2xpY2tDZWxsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwUGxhY2VtZW50SGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyIC5jZWxsJylcbiAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGRvbS5tb3VzZU92ZXJDZWxsKTtcbiAgICBcbiAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZG9tLm1vdXNlT3V0Q2VsbCk7XG4gICAgXG4gICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvbS5jbGlja0NlbGwpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcHNQbGFjZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgIGRvbS5kaXNwbGF5Qm9hcmRzKCk7XG4gICAgICAgIHNoaXBQbGFjZW1lbnRIYW5kbGVyKClcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KClcbiAgICAgICAgY2hhbmdlRGlyZWN0aW9uSGFuZGxlcigpO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGdhbWUucGxhY2VDb21wdXRlclNoaXBzKCk7XG4gICAgICAgIGdhbWUuZmlyc3RUdXJuKClcbiAgICAgICAgYWRkTGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdnNDUFVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZS52cy1DUFUnKTtcbiAgICAgICAgdnNDUFVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZS1jb250YWluZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUudnMtQ1BVJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgIHNoaXBzUGxhY2VtZW50KClcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXktZ2FtZScpO1xuICAgICAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChnYW1lLmNoZWNrQWxsU2hpcHNQbGFjZWQoKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBsYWNlbWVudCcpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLWNvbnRhaW5lcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgaW5pdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgcGxheUFnYWluQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnBsYXktYWdhaW4nKTtcbiAgICAgICAgcGxheUFnYWluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyLnJlc2V0UGxheWVyKCk7XG4gICAgICAgICAgICBjb21wdXRlci5yZXNldFBsYXllcigpO1xuICAgICAgICAgICAgZG9tLnJlc2V0SW50ZXJmYWNlKClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4geyBcbiAgICAgICAgc3RhcnQsXG4gICAgfVxufVxuXG5wbGF5R2FtZSgpLnN0YXJ0KClcblxuY29uc3QgcGxheVZTUGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ3BsYXllck9uZScpO1xuICAgIGNvbnN0IHBsYXllclR3byA9IG5ldyBQbGF5ZXIoJ3BsYXllclR3bycpO1xuXG4gICAgY29uc3QgZ2FtZSA9IGdhbWVDb250cm9sbGVyKCk7XG4gICAgY29uc3QgZG9tID0gRE9NKCk7XG5cbiAgICBjb25zdCB2c1BsYXllckdhbWUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZzUGxheWVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGUudnMtcGxheWVyJyk7XG4gICAgICAgIHZzUGxheWVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGUtY29udGFpbmVyJykuY2xhc3NMaXN0LnRvZ2dsZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLnZzLXBsYXllcicpLmNsYXNzTGlzdC50b2dnbGUoJ2luYWN0aXZlJyk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsImltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZEZhY3RvcnkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIHRoaXMuYXR0YWNrc0RvbmUgPSBbXTtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RBdHRhY2tIaXQgPSBmYWxzZTtcbiAgICB0aGlzLmhpdENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZSA9IG51bGw7XG4gICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgfVxuXG4gIHBsYXllckF0dGFjayhjb29yZGluYXRlcywgY29tcHV0ZXJCb2FyZCkge1xuICAgIGlmICghdGhpcy5jaGVja0Nvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSkgcmV0dXJuO1xuICAgIHRoaXMuYXR0YWNrc0RvbmUucHVzaChjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH1cblxuICBjb21wdXRlckF0dGFjayhwbGF5ZXJCb2FyZCkge1xuICAgIGlmICghdGhpcy5sYXN0QXR0YWNrSGl0IHx8ICF0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRBdHRhY2tTdGF0dXMoKTtcbiAgICAgIGNvbnN0IGF0dGFjayA9IHRoaXMucmFuZG9tQ29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpO1xuICAgICAgaWYgKGF0dGFjaykgcmV0dXJuIHRoaXMuY29tcHV0ZXJBdHRhY2tIaXRzKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxhc3RBdHRhY2tIaXQgJiYgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLnNoaWZ0KCk7XG4gICAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgYXR0YWNrID0gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICBpZiAoYXR0YWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVyQXR0YWNrSGl0cygpO1xuICAgICAgfSBlbHNlIGlmICghYXR0YWNrICYmICF0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZXNldEF0dGFja1N0YXR1cygpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldEF0dGFja1N0YXR1cygpIHtcbiAgICB0aGlzLmxhc3RBdHRhY2tIaXQgPSBmYWxzZTtcbiAgICB0aGlzLmhpdENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZSA9IG51bGw7XG4gICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgfVxuXG4gIHJhbmRvbVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBPYmplY3QudmFsdWVzKHRoaXMuYm9hcmQuc2hpcHMpO1xuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBjb25zdCBwbGFjZW1lbnQgPSB0aGlzLnJhbmRvbVBsYWNlbWVudENvb3JkaW5hdGVzKHNoaXApO1xuICAgICAgY29uc29sZS5sb2cocGxhY2VtZW50KVxuICAgICAgcmV0dXJuIHRoaXMuYm9hcmQucGxhY2VTaGlwcyhzaGlwLm5hbWUsIHBsYWNlbWVudC5jb29yZGluYXRlcywgcGxhY2VtZW50LmRpcmVjdGlvbik7XG4gICAgfSlcbiAgfVxuXG4gIHJlbW92ZVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBPYmplY3QudmFsdWVzKHRoaXMuYm9hcmQuc2hpcHMpO1xuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBzaGlwLnBvc2l0aW9uID0gW107XG4gICAgfSlcbiAgfVxuXG4gIHJhbmRvbVBsYWNlbWVudENvb3JkaW5hdGVzKHNoaXApIHtcbiAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMucmFuZG9tRGlyZWN0aW9uKClcblxuICAgIHdoaWxlIChyb3cgKyBzaGlwLmxlbmd0aCA+IDEwIHx8IGNvbCArIHNoaXAubGVuZ3RoID4gMTAgfHwgIXRoaXMuYm9hcmQuc2hpcFBvc2l0aW9uKHNoaXAsIFtyb3csIGNvbF0sIGRpcmVjdGlvbikpIHtcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGRpcmVjdGlvbiA9IHRoaXMucmFuZG9tRGlyZWN0aW9uKClcbiAgICB9XG5cbiAgICByZXR1cm4gIHsgY29vcmRpbmF0ZXM6IFtyb3csIGNvbF0sIGRpcmVjdGlvbjogZGlyZWN0aW9uIH1cbiAgfVxuXG4gIHJhbmRvbUNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLnJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5hdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH1cblxuICBjb21wdXRlckF0dGFja0hpdHMoKSB7XG4gICAgdGhpcy5sYXN0QXR0YWNrSGl0ID0gdHJ1ZTtcbiAgICB0aGlzLmhpdENvb3JkaW5hdGVzLnB1c2godGhpcy5hdHRhY2tzRG9uZS5hdCgtMSkpO1xuICAgIHRoaXMubGFzdEhpdENvb3JkaW5hdGUgPSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0xKTtcbiAgICBjb25zdCBtb3ZlcyA9IFtbMSwgMF0sIFstMSwgMF0sIFswLCAxXSwgWzAsIC0xXV07XG4gICAgbW92ZXMuZm9yRWFjaChtb3ZlID0+IHtcbiAgICAgIGNvbnN0IG5ld1JvdyA9IG1vdmVbMF0gKyB0aGlzLmxhc3RIaXRDb29yZGluYXRlWzBdO1xuICAgICAgY29uc3QgbmV3Q29sID0gbW92ZVsxXSArIHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMV07XG4gICAgICBpZiAoIXRoaXMuY2hlY2tDb29yZGluYXRlcyhbbmV3Um93LCBuZXdDb2xdKSB8fCAobmV3Um93IDwgMCB8fCBuZXdDb2wgPCAwIHx8IG5ld1JvdyA+IDkgfHwgbmV3Q29sID4gOSkpIHJldHVybjtcbiAgICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW25ld1JvdywgbmV3Q29sXSk7XG4gICAgfSlcblxuICAgIGlmICh0aGlzLmhpdENvb3JkaW5hdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICh0aGlzLmxhc3RIaXRDb29yZGluYXRlWzBdID09PSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0yKVswXSkge1xuICAgICAgICB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLmZpbHRlcihtb3ZlID0+IG1vdmVbMF0gPT09IHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMF0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhc3RIaXRDb29yZGluYXRlWzFdID09PSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0yKVsxXSkge1xuICAgICAgICB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLmZpbHRlcihtb3ZlID0+IG1vdmVbMV0gPT09IHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNoYW5nZVR1cm4oKSB7XG4gICAgdGhpcy50dXJuID8gdGhpcy50dXJuID0gZmFsc2UgOiB0aGlzLnR1cm4gPSB0cnVlO1xuICB9XG5cbiAgcmFuZG9tQ29vcmRpbmF0ZXMoKSB7XG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgd2hpbGUgKCF0aGlzLmNoZWNrQ29vcmRpbmF0ZXMoW3JvdywgY29sXSkpIHtcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgfVxuXG4gIGNoZWNrQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLmF0dGFja3NEb25lKSB7XG4gICAgICBpZiAoZWxlbWVudFswXSA9PT0gcm93ICYmIGVsZW1lbnRbMV0gPT09IGNvbCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJhbmRvbURpcmVjdGlvbigpIHtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBbJ3JvdycsICdjb2wnXTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGRpcmVjdGlvbi5sZW5ndGgpO1xuICAgIHJldHVybiBkaXJlY3Rpb25bcG9zaXRpb25dO1xuICB9XG5cbiAgcmVzZXRQbGF5ZXIoKSB7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIHRoaXMuYXR0YWNrc0RvbmUgPSBbXTtcbiAgICB0aGlzLmxhc3RBdHRhY2tIaXQgPSBmYWxzZTtcbiAgICB0aGlzLmhpdENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZSA9IG51bGw7XG4gICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMucG9zaXRpb24gPSBbXTtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0SGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIHRoaXMuaXNTdW5rKCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgdGhpcy5zdW5rID0gdGhpcy5oaXRzID49IHRoaXMubGVuZ3RoO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=