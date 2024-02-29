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
  const playerBoard = player.board;
  const computerBoard = computer.board;

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

  const displayPlayerShips = () => {
    let shipPositions = [];
    
    Object.values(playerBoard.ships).forEach(ship => {
      shipPositions = shipPositions.concat(ship.position);
    })

    shipPositions.forEach(coordinates => {
      const [row, col] = coordinates;
      const cell = document.querySelector(`.player .cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add('ship');
    })
  }

  const displayHit = () => {
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

  return {
    displayBoards,
    displayPlayerShips,
    displayHit,
    displayMiss
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
      patrolBoat: new _shipFactory_js__WEBPACK_IMPORTED_MODULE_0__["default"]("patrolBoat", 1),
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
  const playerBoard = player.board;
  const computerBoard = computer.board;

  const placePlayerShips = () => {
    player.randomShipPlacement();
  };

  const placeComputerShips = () => {
    computer.randomShipPlacement();
  };

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
    return player.turn ? computerBoard.allShipsSunk() : playerBoard.allShipsSunk();
  }

  const gameOver = () => {
    player.turn = false;
    computer.turn = false;
  }

  return { 
    placePlayerShips,
    placeComputerShips,
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
    const playerBoard = player.board;
    const computer = new _playerFactory_js__WEBPACK_IMPORTED_MODULE_2__["default"]('computer');
    const computerBoard = computer.board;

    const game = (0,_gameController_js__WEBPACK_IMPORTED_MODULE_0__["default"])(player, computer);
    const dom = (0,_DOM_js__WEBPACK_IMPORTED_MODULE_1__["default"])(player, computer);

    const handlePlayerAttack = () => {
        if (!player.turn) return;

        const coordinates = [event.target.dataset.row, event.target.dataset.col];
        if (!player.checkCoordinates(coordinates)) return;

        const attack = player.playerAttack(coordinates, computerBoard);

        (game.isHit(attack)) ? dom.displayHit() : dom.displayMiss();

        if (game.checkWinner()) {
            game.gameOver();
        } else {
            game.changeTurns();
            setTimeout(handleCPUAttack, 500);
        }
    }

    const handleCPUAttack = () => {
        if (!computer.turn) return;

        const attack = computer.computerAttack(playerBoard);

        (game.isHit(attack)) ? dom.displayHit() : dom.displayMiss();

        if (game.checkWinner()) {
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

    const init = () => {
        dom.displayBoards();
        game.placeComputerShips();
        game.placePlayerShips();
        dom.displayPlayerShips()
        game.firstTurn()
        addListeners()
    }

    return { init }
}

playGame().init()

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
    this.lastHitCoordinate;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxxQkFBcUIsd0RBQUs7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzSGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zaGlwRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAocGxheWVyLCBjb21wdXRlcikgPT4ge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllci5ib2FyZDtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyLmJvYXJkO1xuXG4gIGNvbnN0IGRpc3BsYXlCb2FyZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci5ib2FyZFwiKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci5ib2FyZFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBwbGF5ZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGxheWVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgcGxheWVyQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIHBsYXllckNlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChwbGF5ZXJDZWxsKTtcblxuICAgICAgICBjb25zdCBjb21wdXRlckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb21wdXRlckNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJDZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBsYXllclNoaXBzID0gKCkgPT4ge1xuICAgIGxldCBzaGlwUG9zaXRpb25zID0gW107XG4gICAgXG4gICAgT2JqZWN0LnZhbHVlcyhwbGF5ZXJCb2FyZC5zaGlwcykuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIHNoaXBQb3NpdGlvbnMgPSBzaGlwUG9zaXRpb25zLmNvbmNhdChzaGlwLnBvc2l0aW9uKTtcbiAgICB9KVxuXG4gICAgc2hpcFBvc2l0aW9ucy5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgZGlzcGxheUhpdCA9ICgpID0+IHtcbiAgICBpZiAocGxheWVyLnR1cm4pIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBwbGF5ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb21wdXRlciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9IGVsc2UgaWYgKGNvbXB1dGVyLnR1cm4pIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb21wdXRlci5hdHRhY2tzRG9uZS5hdCgtMSk7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBkaXNwbGF5TWlzcyA9ICgpID0+IHtcbiAgICBpZiAocGxheWVyLnR1cm4pIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBwbGF5ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb21wdXRlciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfSBlbHNlIGlmIChjb21wdXRlci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29tcHV0ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGxheUJvYXJkcyxcbiAgICBkaXNwbGF5UGxheWVyU2hpcHMsXG4gICAgZGlzcGxheUhpdCxcbiAgICBkaXNwbGF5TWlzc1xuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRE9NOyIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBGYWN0b3J5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLnNoaXBzID0ge1xuICAgICAgY2FycmllcjogbmV3IFNoaXAoXCJjYXJyaWVyXCIsIDUpLFxuICAgICAgYmF0dGxlc2hpcDogbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsIDQpLFxuICAgICAgZGVzdHJveWVyOiBuZXcgU2hpcChcImRlc3Ryb3llclwiLCAzKSxcbiAgICAgIHN1Ym1hcmluZTogbmV3IFNoaXAoXCJzdWJtYXJpbmVcIiwgMiksXG4gICAgICBwYXRyb2xCb2F0OiBuZXcgU2hpcChcInBhdHJvbEJvYXRcIiwgMSksXG4gICAgfTtcbiAgfVxuXG4gIHBsYWNlU2hpcHMoc2hpcE5hbWUsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tzaGlwTmFtZV07XG5cbiAgICBpZiAoIXRoaXMuc2hpcFBvc2l0aW9uKHNoaXAsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb24pKSByZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLnBsYWNlU2hpcFRpbGVzKHNoaXApO1xuICAgIHRoaXMucGxhY2VXYXRlclRpbGVzKHNoaXApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcblxuICAgIGlmICh0aGlzLmJvYXJkW3Jvd11bY29sXSA9PT0gXCJYXCIgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IFwiT1wiKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIXRoaXMuYm9hcmRbcm93XVtjb2xdIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdID09PSBcIndhdGVyXCIpIHtcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gXCJPXCI7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbdGhpcy5ib2FyZFtyb3ddW2NvbF1dO1xuICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgc2hpcC5nZXRIaXQoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLnNoaXBzKS5ldmVyeShzaGlwID0+IHNoaXAuc3Vuayk7XG4gIH1cblxuICBzaGlwUG9zaXRpb24oc2hpcCwgY29vcmRpbmF0ZXMsIGRpcmVjdGlvbikge1xuICAgIGNvbnN0IHBvc3NpYmxlUG9zaXRpb25zID0gW107XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3JvdycpIHtcbiAgICAgIGZvciAobGV0IGkgPSBjb2w7IGkgPCBjb2wgKyBzaGlwLmxlbmd0aDsgaSsrKSBwb3NzaWJsZVBvc2l0aW9ucy5wdXNoKFtyb3csIGldKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2NvbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPCByb3cgKyBzaGlwLmxlbmd0aDsgaSsrKSBwb3NzaWJsZVBvc2l0aW9ucy5wdXNoKFtpLCBjb2xdKTtcbiAgICB9XG5cbiAgICBzaGlwLnBvc2l0aW9uID0gcG9zc2libGVQb3NpdGlvbnM7XG4gICAgcmV0dXJuIHBvc3NpYmxlUG9zaXRpb25zLmV2ZXJ5KHBvc2l0aW9uID0+IHRoaXMuaXNWYWxpZChwb3NpdGlvbikpO1xuICB9XG5cbiAgaXNWYWxpZChjb29yZGluYXRlcykge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcblxuICAgIGlmICgocm93IDwgMCB8fCBjb2wgPCAwIHx8IHJvdyA+IDkgfHwgY29sID4gOSkgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbF0pIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcGxhY2VTaGlwVGlsZXMoc2hpcCkge1xuICAgIHNoaXAucG9zaXRpb24uZm9yRWFjaChjb29yZGluYXRlcyA9PiB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IHNoaXAubmFtZTtcbiAgICB9KVxuICB9XG5cbiAgcGxhY2VXYXRlclRpbGVzKHNoaXApIHtcbiAgICBjb25zdCBwb3NzaWJsZVdhdGVyVGlsZXMgPSBbXTtcblxuICAgIHNoaXAucG9zaXRpb24uZm9yRWFjaChjb29yZGluYXRlcyA9PiB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gcm93IC0gMTsgaSA8PSByb3cgKyAxOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGNvbCAtIDE7IGogPD0gY29sICsgMTsgaisrKSB7XG4gICAgICAgICAgaWYgKChpICE9PSByb3cgfHwgaiAhPT0gY29sKSAmJiAoaSA+PSAwICYmIGogPj0gMCAmJiBpIDwgMTAgJiYgaiA8IDEwKSkgcG9zc2libGVXYXRlclRpbGVzLnB1c2goW2ksIGpdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBwb3NzaWJsZVdhdGVyVGlsZXMuZm9yRWFjaChjb29yZGluYXRlcyA9PiB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG4gICAgICBpZiAoIXRoaXMuYm9hcmRbcm93XVtjb2xdKSB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IFwid2F0ZXJcIjtcbiAgICB9KVxuICB9XG5cbiAgcHJpbnRCb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocm93KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAocGxheWVyLCBjb21wdXRlcikgPT4ge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllci5ib2FyZDtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyLmJvYXJkO1xuXG4gIGNvbnN0IHBsYWNlUGxheWVyU2hpcHMgPSAoKSA9PiB7XG4gICAgcGxheWVyLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZUNvbXB1dGVyU2hpcHMgPSAoKSA9PiB7XG4gICAgY29tcHV0ZXIucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICB9O1xuXG4gIGNvbnN0IGZpcnN0VHVybiA9ICgpID0+IHtcbiAgICBwbGF5ZXIudHVybiA9IHRydWU7XG4gICAgY29tcHV0ZXIudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgY29uc3QgY2hhbmdlVHVybnMgPSAoKSA9PiB7XG4gICAgcGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICBjb21wdXRlci5jaGFuZ2VUdXJuKCk7XG4gIH1cblxuICBjb25zdCBnZXRDbGlja2VkQ2VsbCA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KVxuICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gIH07XG5cbiAgY29uc3QgaXNIaXQgPSAoYXR0YWNrKSA9PiB7XG4gICAgcmV0dXJuIGF0dGFjaztcbiAgfVxuXG4gIGNvbnN0IGNoZWNrV2lubmVyID0gKCkgPT4ge1xuICAgIHJldHVybiBwbGF5ZXIudHVybiA/IGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkgOiBwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKTtcbiAgfVxuXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4ge1xuICAgIHBsYXllci50dXJuID0gZmFsc2U7XG4gICAgY29tcHV0ZXIudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHsgXG4gICAgcGxhY2VQbGF5ZXJTaGlwcyxcbiAgICBwbGFjZUNvbXB1dGVyU2hpcHMsXG4gICAgZmlyc3RUdXJuLFxuICAgIGNoYW5nZVR1cm5zLFxuICAgIGdldENsaWNrZWRDZWxsLFxuICAgIGlzSGl0LFxuICAgIGNoZWNrV2lubmVyLFxuICAgIGdhbWVPdmVyXG4gICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUNvbnRyb2xsZXJcbiIsImltcG9ydCBnYW1lQ29udHJvbGxlciBmcm9tIFwiLi9nYW1lQ29udHJvbGxlci5qc1wiO1xuaW1wb3J0IERPTSBmcm9tIFwiLi9ET00uanNcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyRmFjdG9yeS5qc1wiO1xuXG5jb25zdCBwbGF5R2FtZSA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdwbGF5ZXInKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllci5ib2FyZDtcbiAgICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoJ2NvbXB1dGVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNvbXB1dGVyLmJvYXJkO1xuXG4gICAgY29uc3QgZ2FtZSA9IGdhbWVDb250cm9sbGVyKHBsYXllciwgY29tcHV0ZXIpO1xuICAgIGNvbnN0IGRvbSA9IERPTShwbGF5ZXIsIGNvbXB1dGVyKTtcblxuICAgIGNvbnN0IGhhbmRsZVBsYXllckF0dGFjayA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFwbGF5ZXIudHVybikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW2V2ZW50LnRhcmdldC5kYXRhc2V0LnJvdywgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sXTtcbiAgICAgICAgaWYgKCFwbGF5ZXIuY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykpIHJldHVybjtcblxuICAgICAgICBjb25zdCBhdHRhY2sgPSBwbGF5ZXIucGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzLCBjb21wdXRlckJvYXJkKTtcblxuICAgICAgICAoZ2FtZS5pc0hpdChhdHRhY2spKSA/IGRvbS5kaXNwbGF5SGl0KCkgOiBkb20uZGlzcGxheU1pc3MoKTtcblxuICAgICAgICBpZiAoZ2FtZS5jaGVja1dpbm5lcigpKSB7XG4gICAgICAgICAgICBnYW1lLmdhbWVPdmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lLmNoYW5nZVR1cm5zKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGhhbmRsZUNQVUF0dGFjaywgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZUNQVUF0dGFjayA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFjb21wdXRlci50dXJuKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgYXR0YWNrID0gY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpO1xuXG4gICAgICAgIChnYW1lLmlzSGl0KGF0dGFjaykpID8gZG9tLmRpc3BsYXlIaXQoKSA6IGRvbS5kaXNwbGF5TWlzcygpO1xuXG4gICAgICAgIGlmIChnYW1lLmNoZWNrV2lubmVyKCkpIHtcbiAgICAgICAgICAgIGdhbWUuZ2FtZU92ZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdhbWUuY2hhbmdlVHVybnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFkZExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wdXRlciAuY2VsbCcpO1xuICAgICAgICBjb21wdXRlckNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUGxheWVyQXR0YWNrKSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21wdXRlckNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXB1dGVyIC5jZWxsJyk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGF5ZXJBdHRhY2spKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICBkb20uZGlzcGxheUJvYXJkcygpO1xuICAgICAgICBnYW1lLnBsYWNlQ29tcHV0ZXJTaGlwcygpO1xuICAgICAgICBnYW1lLnBsYWNlUGxheWVyU2hpcHMoKTtcbiAgICAgICAgZG9tLmRpc3BsYXlQbGF5ZXJTaGlwcygpXG4gICAgICAgIGdhbWUuZmlyc3RUdXJuKClcbiAgICAgICAgYWRkTGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICByZXR1cm4geyBpbml0IH1cbn1cblxucGxheUdhbWUoKS5pbml0KCkiLCJpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRGYWN0b3J5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB0aGlzLmF0dGFja3NEb25lID0gW107XG4gICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0QXR0YWNrSGl0ID0gZmFsc2U7XG4gICAgdGhpcy5oaXRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMubGFzdEhpdENvb3JkaW5hdGU7XG4gICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgfVxuXG4gIHBsYXllckF0dGFjayhjb29yZGluYXRlcywgY29tcHV0ZXJCb2FyZCkge1xuICAgIGlmICghdGhpcy5jaGVja0Nvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKSkgcmV0dXJuO1xuICAgIHRoaXMuYXR0YWNrc0RvbmUucHVzaChjb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGNvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH1cblxuICBjb21wdXRlckF0dGFjayhwbGF5ZXJCb2FyZCkge1xuICAgIGlmICghdGhpcy5sYXN0QXR0YWNrSGl0IHx8ICF0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRBdHRhY2tTdGF0dXMoKTtcbiAgICAgIGNvbnN0IGF0dGFjayA9IHRoaXMucmFuZG9tQ29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpO1xuICAgICAgaWYgKGF0dGFjaykgcmV0dXJuIHRoaXMuY29tcHV0ZXJBdHRhY2tIaXRzKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxhc3RBdHRhY2tIaXQgJiYgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLnNoaWZ0KCk7XG4gICAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgY29uc3QgYXR0YWNrID0gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gICAgICBpZiAoYXR0YWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVyQXR0YWNrSGl0cygpO1xuICAgICAgfSBlbHNlIGlmICghYXR0YWNrICYmICF0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZXNldEF0dGFja1N0YXR1cygpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldEF0dGFja1N0YXR1cygpIHtcbiAgICB0aGlzLmxhc3RBdHRhY2tIaXQgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RIaXRDb29yZGluYXRlID0gbnVsbDtcbiAgICB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcyA9IFtdO1xuICB9XG5cbiAgcmFuZG9tU2hpcFBsYWNlbWVudCgpIHtcbiAgICBjb25zdCBzaGlwcyA9IE9iamVjdC52YWx1ZXModGhpcy5ib2FyZC5zaGlwcyk7XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHRoaXMucmFuZG9tUGxhY2VtZW50Q29vcmRpbmF0ZXMoc2hpcCk7XG4gICAgICByZXR1cm4gdGhpcy5ib2FyZC5wbGFjZVNoaXBzKHNoaXAubmFtZSwgcGxhY2VtZW50LmNvb3JkaW5hdGVzLCBwbGFjZW1lbnQuZGlyZWN0aW9uKTtcbiAgICB9KVxuICB9XG5cbiAgcmFuZG9tUGxhY2VtZW50Q29vcmRpbmF0ZXMoc2hpcCkge1xuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgZGlyZWN0aW9uID0gdGhpcy5yYW5kb21EaXJlY3Rpb24oKVxuXG4gICAgd2hpbGUgKHJvdyArIHNoaXAubGVuZ3RoID4gMTAgfHwgY29sICsgc2hpcC5sZW5ndGggPiAxMCB8fCAhdGhpcy5ib2FyZC5zaGlwUG9zaXRpb24oc2hpcCwgW3JvdywgY29sXSwgZGlyZWN0aW9uKSkge1xuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgZGlyZWN0aW9uID0gdGhpcy5yYW5kb21EaXJlY3Rpb24oKVxuICAgIH1cblxuICAgIHJldHVybiAgeyBjb29yZGluYXRlczogW3JvdywgY29sXSwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfVxuICB9XG5cbiAgcmFuZG9tQ29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMucmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGNvbXB1dGVyQXR0YWNrSGl0cygpIHtcbiAgICB0aGlzLmxhc3RBdHRhY2tIaXQgPSB0cnVlO1xuICAgIHRoaXMuaGl0Q29vcmRpbmF0ZXMucHVzaCh0aGlzLmF0dGFja3NEb25lLmF0KC0xKSk7XG4gICAgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZSA9IHRoaXMuaGl0Q29vcmRpbmF0ZXMuYXQoLTEpO1xuICAgIGNvbnN0IG1vdmVzID0gW1sxLCAwXSwgWy0xLCAwXSwgWzAsIDFdLCBbMCwgLTFdXTtcbiAgICBtb3Zlcy5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgY29uc3QgbmV3Um93ID0gbW92ZVswXSArIHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMF07XG4gICAgICBjb25zdCBuZXdDb2wgPSBtb3ZlWzFdICsgdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZVsxXTtcbiAgICAgIGlmICghdGhpcy5jaGVja0Nvb3JkaW5hdGVzKFtuZXdSb3csIG5ld0NvbF0pIHx8IChuZXdSb3cgPCAwIHx8IG5ld0NvbCA8IDAgfHwgbmV3Um93ID4gOSB8fCBuZXdDb2wgPiA5KSkgcmV0dXJuO1xuICAgICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMucHVzaChbbmV3Um93LCBuZXdDb2xdKTtcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMuaGl0Q29vcmRpbmF0ZXMubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMF0gPT09IHRoaXMuaGl0Q29vcmRpbmF0ZXMuYXQoLTIpWzBdKSB7XG4gICAgICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzID0gdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMuZmlsdGVyKG1vdmUgPT4gbW92ZVswXSA9PT0gdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZVswXSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMV0gPT09IHRoaXMuaGl0Q29vcmRpbmF0ZXMuYXQoLTIpWzFdKSB7XG4gICAgICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzID0gdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMuZmlsdGVyKG1vdmUgPT4gbW92ZVsxXSA9PT0gdGhpcy5sYXN0SGl0Q29vcmRpbmF0ZVsxXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2hhbmdlVHVybigpIHtcbiAgICB0aGlzLnR1cm4gPyB0aGlzLnR1cm4gPSBmYWxzZSA6IHRoaXMudHVybiA9IHRydWU7XG4gIH1cblxuICByYW5kb21Db29yZGluYXRlcygpIHtcbiAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICB3aGlsZSAoIXRoaXMuY2hlY2tDb29yZGluYXRlcyhbcm93LCBjb2xdKSkge1xuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cblxuICAgIHJldHVybiBbcm93LCBjb2xdO1xuICB9XG5cbiAgY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuYXR0YWNrc0RvbmUpIHtcbiAgICAgIGlmIChlbGVtZW50WzBdID09PSByb3cgJiYgZWxlbWVudFsxXSA9PT0gY29sKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmFuZG9tRGlyZWN0aW9uKCkge1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IFsncm93JywgJ2NvbCddO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZGlyZWN0aW9uLmxlbmd0aCk7XG4gICAgcmV0dXJuIGRpcmVjdGlvbltwb3NpdGlvbl07XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnBvc2l0aW9uID0gW107XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgfVxuXG4gIGdldEhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICB0aGlzLmlzU3VuaygpO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHRoaXMuc3VuayA9IHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9