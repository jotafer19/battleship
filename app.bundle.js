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
    playerBoard.placeShips("carrier", [0, 0], 'row');
    playerBoard.placeShips("battleship", [9, 3], 'row');
    playerBoard.placeShips("destroyer", [4, 7], 'row');
    playerBoard.placeShips("submarine", [2, 1], 'row');
    playerBoard.placeShips("patrolBoat", [8, 0], 'row');
  };

  const placeComputerShips = () => {
    computerBoard.placeShips("carrier", [7, 3], 'row');
    computerBoard.placeShips("battleship", [2, 0], 'row');
    computerBoard.placeShips("destroyer", [0, 1], 'row');
    computerBoard.placeShips("submarine", [3, 7], 'row');
    computerBoard.placeShips("patrolBoat", [5, 0], 'row');
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

    const handlePlayerAttack = (event) => {
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
      const attack = this.randomComputerAttack(playerBoard);
      if (attack) return this.computerAttackHits();
    } else if (this.lastAttackHit && this.nextAttackCoordinates.length) {
      const coordinates = this.nextAttackCoordinates.shift();
      this.attacksDone.push(coordinates);
      const attack = playerBoard.receiveAttack(coordinates);
      if (attack) {
        return this.computerAttackHits();
      } else if (!attack && !this.nextAttackCoordinates.length) {
        this.lastAttackHit = false;
        this.lastHitCoordinate = null;
        this.nextAttackCoordinates = [];
        return false;
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVzQzs7QUFFdkI7QUFDZjtBQUNBO0FBQ0EscUJBQXFCLHdEQUFLO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVGZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9ib2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9nYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvcGxheWVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3NoaXBGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERPTSA9IChwbGF5ZXIsIGNvbXB1dGVyKSA9PiB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gcGxheWVyLmJvYXJkO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIuYm9hcmQ7XG5cbiAgY29uc3QgZGlzcGxheUJvYXJkcyA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLmJvYXJkXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyLmJvYXJkXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHBsYXllckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwbGF5ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgICBwbGF5ZXJDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgcGxheWVyQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHBsYXllckNlbGwpO1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgY29tcHV0ZXJDZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgY29tcHV0ZXJDZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjb21wdXRlckNlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UGxheWVyU2hpcHMgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBQb3NpdGlvbnMgPSBbXTtcbiAgICBcbiAgICBPYmplY3QudmFsdWVzKHBsYXllckJvYXJkLnNoaXBzKS5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgc2hpcFBvc2l0aW9ucyA9IHNoaXBQb3NpdGlvbnMuY29uY2F0KHNoaXAucG9zaXRpb24pO1xuICAgIH0pXG5cbiAgICBzaGlwUG9zaXRpb25zLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgIH0pXG4gIH1cblxuICBjb25zdCBkaXNwbGF5SGl0ID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXIudHVybikge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IHBsYXllci5hdHRhY2tzRG9uZS5hdCgtMSk7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbXB1dGVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIudHVybikge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvbXB1dGVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlNaXNzID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXIudHVybikge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IHBsYXllci5hdHRhY2tzRG9uZS5hdCgtMSk7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbXB1dGVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9IGVsc2UgaWYgKGNvbXB1dGVyLnR1cm4pIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb21wdXRlci5hdHRhY2tzRG9uZS5hdCgtMSk7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwbGF5Qm9hcmRzLFxuICAgIGRpc3BsYXlQbGF5ZXJTaGlwcyxcbiAgICBkaXNwbGF5SGl0LFxuICAgIGRpc3BsYXlNaXNzXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBET007IiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcEZhY3RvcnkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICAgIHRoaXMuc2hpcHMgPSB7XG4gICAgICBjYXJyaWVyOiBuZXcgU2hpcChcImNhcnJpZXJcIiwgNSksXG4gICAgICBiYXR0bGVzaGlwOiBuZXcgU2hpcChcImJhdHRsZXNoaXBcIiwgNCksXG4gICAgICBkZXN0cm95ZXI6IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsIDMpLFxuICAgICAgc3VibWFyaW5lOiBuZXcgU2hpcChcInN1Ym1hcmluZVwiLCAyKSxcbiAgICAgIHBhdHJvbEJvYXQ6IG5ldyBTaGlwKFwicGF0cm9sQm9hdFwiLCAxKSxcbiAgICB9O1xuICB9XG5cbiAgcGxhY2VTaGlwcyhzaGlwTmFtZSwgY29vcmRpbmF0ZXMsIGRpcmVjdGlvbikge1xuICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBOYW1lXTtcblxuICAgIGlmICghdGhpcy5zaGlwUG9zaXRpb24oc2hpcCwgY29vcmRpbmF0ZXMsIGRpcmVjdGlvbikpIHJldHVybiBmYWxzZTtcblxuICAgIHRoaXMucGxhY2VTaGlwVGlsZXMoc2hpcCk7XG4gICAgdGhpcy5wbGFjZVdhdGVyVGlsZXMoc2hpcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKHRoaXMuYm9hcmRbcm93XVtjb2xdID09PSBcIlhcIiB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXSA9PT0gXCJPXCIpIHJldHVybiBmYWxzZTtcblxuICAgIGlmICghdGhpcy5ib2FyZFtyb3ddW2NvbF0gfHwgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IFwid2F0ZXJcIikge1xuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBcIk9cIjtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1t0aGlzLmJvYXJkW3Jvd11bY29sXV07XG4gICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICBzaGlwLmdldEhpdCgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuc2hpcHMpLmV2ZXJ5KHNoaXAgPT4gc2hpcC5zdW5rKTtcbiAgfVxuXG4gIHNoaXBQb3NpdGlvbihzaGlwLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSB7XG4gICAgY29uc3QgcG9zc2libGVQb3NpdGlvbnMgPSBbXTtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSAncm93Jykge1xuICAgICAgZm9yIChsZXQgaSA9IGNvbDsgaSA8IGNvbCArIHNoaXAubGVuZ3RoOyBpKyspIHBvc3NpYmxlUG9zaXRpb25zLnB1c2goW3JvdywgaV0pO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnY29sJykge1xuICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdyArIHNoaXAubGVuZ3RoOyBpKyspIHBvc3NpYmxlUG9zaXRpb25zLnB1c2goW2ksIGNvbF0pO1xuICAgIH1cblxuICAgIHNoaXAucG9zaXRpb24gPSBwb3NzaWJsZVBvc2l0aW9ucztcbiAgICByZXR1cm4gcG9zc2libGVQb3NpdGlvbnMuZXZlcnkocG9zaXRpb24gPT4gdGhpcy5pc1ZhbGlkKHBvc2l0aW9uKSk7XG4gIH1cblxuICBpc1ZhbGlkKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKChyb3cgPCAwIHx8IGNvbCA8IDAgfHwgcm93ID4gOSB8fCBjb2wgPiA5KSB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwbGFjZVNoaXBUaWxlcyhzaGlwKSB7XG4gICAgc2hpcC5wb3NpdGlvbi5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gc2hpcC5uYW1lO1xuICAgIH0pXG4gIH1cblxuICBwbGFjZVdhdGVyVGlsZXMoc2hpcCkge1xuICAgIGNvbnN0IHBvc3NpYmxlV2F0ZXJUaWxlcyA9IFtdO1xuXG4gICAgc2hpcC5wb3NpdGlvbi5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICAgIGZvciAobGV0IGkgPSByb3cgLSAxOyBpIDw9IHJvdyArIDE7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gY29sIC0gMTsgaiA8PSBjb2wgKyAxOyBqKyspIHtcbiAgICAgICAgICBpZiAoKGkgIT09IHJvdyB8fCBqICE9PSBjb2wpICYmIChpID49IDAgJiYgaiA+PSAwICYmIGkgPCAxMCAmJiBqIDwgMTApKSBwb3NzaWJsZVdhdGVyVGlsZXMucHVzaChbaSwgal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHBvc3NpYmxlV2F0ZXJUaWxlcy5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcbiAgICAgIGlmICghdGhpcy5ib2FyZFtyb3ddW2NvbF0pIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gXCJ3YXRlclwiO1xuICAgIH0pXG4gIH1cblxuICBwcmludEJvYXJkKCkge1xuICAgIHRoaXMuYm9hcmQuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyb3cpO1xuICAgIH0pO1xuICB9XG59XG4iLCJjb25zdCBnYW1lQ29udHJvbGxlciA9IChwbGF5ZXIsIGNvbXB1dGVyKSA9PiB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gcGxheWVyLmJvYXJkO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIuYm9hcmQ7XG5cbiAgY29uc3QgcGxhY2VQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKFwiY2FycmllclwiLCBbMCwgMF0sICdyb3cnKTtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKFwiYmF0dGxlc2hpcFwiLCBbOSwgM10sICdyb3cnKTtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKFwiZGVzdHJveWVyXCIsIFs0LCA3XSwgJ3JvdycpO1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcHMoXCJzdWJtYXJpbmVcIiwgWzIsIDFdLCAncm93Jyk7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwcyhcInBhdHJvbEJvYXRcIiwgWzgsIDBdLCAncm93Jyk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VDb21wdXRlclNoaXBzID0gKCkgPT4ge1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwcyhcImNhcnJpZXJcIiwgWzcsIDNdLCAncm93Jyk7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXBzKFwiYmF0dGxlc2hpcFwiLCBbMiwgMF0sICdyb3cnKTtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcHMoXCJkZXN0cm95ZXJcIiwgWzAsIDFdLCAncm93Jyk7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXBzKFwic3VibWFyaW5lXCIsIFszLCA3XSwgJ3JvdycpO1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwcyhcInBhdHJvbEJvYXRcIiwgWzUsIDBdLCAncm93Jyk7XG4gIH07XG5cbiAgY29uc3QgZmlyc3RUdXJuID0gKCkgPT4ge1xuICAgIHBsYXllci50dXJuID0gdHJ1ZTtcbiAgICBjb21wdXRlci50dXJuID0gZmFsc2U7XG4gIH1cblxuICBjb25zdCBjaGFuZ2VUdXJucyA9ICgpID0+IHtcbiAgICBwbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgIGNvbXB1dGVyLmNoYW5nZVR1cm4oKTtcbiAgfVxuXG4gIGNvbnN0IGdldENsaWNrZWRDZWxsID0gKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByb3cgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5yb3cpXG4gICAgICBjb25zdCBjb2wgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5jb2wpO1xuICAgICAgXG4gICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgfTtcblxuICBjb25zdCBpc0hpdCA9IChhdHRhY2spID0+IHtcbiAgICByZXR1cm4gYXR0YWNrO1xuICB9XG5cbiAgY29uc3QgY2hlY2tXaW5uZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHBsYXllci50dXJuID8gY29tcHV0ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSA6IHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpO1xuICB9XG5cbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XG4gICAgcGxheWVyLnR1cm4gPSBmYWxzZTtcbiAgICBjb21wdXRlci50dXJuID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geyBcbiAgICBwbGFjZVBsYXllclNoaXBzLFxuICAgIHBsYWNlQ29tcHV0ZXJTaGlwcyxcbiAgICBmaXJzdFR1cm4sXG4gICAgY2hhbmdlVHVybnMsXG4gICAgZ2V0Q2xpY2tlZENlbGwsXG4gICAgaXNIaXQsXG4gICAgY2hlY2tXaW5uZXIsXG4gICAgZ2FtZU92ZXJcbiAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQ29udHJvbGxlclxuIiwiaW1wb3J0IGdhbWVDb250cm9sbGVyIGZyb20gXCIuL2dhbWVDb250cm9sbGVyLmpzXCI7XG5pbXBvcnQgRE9NIGZyb20gXCIuL0RPTS5qc1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJGYWN0b3J5LmpzXCI7XG5cbmNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoJ3BsYXllcicpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gcGxheWVyLmJvYXJkO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcignY29tcHV0ZXInKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIuYm9hcmQ7XG5cbiAgICBjb25zdCBnYW1lID0gZ2FtZUNvbnRyb2xsZXIocGxheWVyLCBjb21wdXRlcik7XG4gICAgY29uc3QgZG9tID0gRE9NKHBsYXllciwgY29tcHV0ZXIpO1xuXG4gICAgY29uc3QgaGFuZGxlUGxheWVyQXR0YWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghcGxheWVyLnR1cm4pIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtldmVudC50YXJnZXQuZGF0YXNldC5yb3csIGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbF07XG4gICAgICAgIGlmICghcGxheWVyLmNoZWNrQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgYXR0YWNrID0gcGxheWVyLnBsYXllckF0dGFjayhjb29yZGluYXRlcywgY29tcHV0ZXJCb2FyZCk7XG5cbiAgICAgICAgKGdhbWUuaXNIaXQoYXR0YWNrKSkgPyBkb20uZGlzcGxheUhpdCgpIDogZG9tLmRpc3BsYXlNaXNzKCk7XG5cbiAgICAgICAgaWYgKGdhbWUuY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICAgICAgZ2FtZS5nYW1lT3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZS5jaGFuZ2VUdXJucygpO1xuICAgICAgICAgICAgc2V0VGltZW91dChoYW5kbGVDUFVBdHRhY2ssIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVDUFVBdHRhY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICghY29tcHV0ZXIudHVybikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGF0dGFjayA9IGNvbXB1dGVyLmNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkKTtcblxuICAgICAgICAoZ2FtZS5pc0hpdChhdHRhY2spKSA/IGRvbS5kaXNwbGF5SGl0KCkgOiBkb20uZGlzcGxheU1pc3MoKTtcblxuICAgICAgICBpZiAoZ2FtZS5jaGVja1dpbm5lcigpKSB7XG4gICAgICAgICAgICBnYW1lLmdhbWVPdmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lLmNoYW5nZVR1cm5zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhZGRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcHV0ZXIgLmNlbGwnKTtcbiAgICAgICAgY29tcHV0ZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVBsYXllckF0dGFjaykpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZUxpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wdXRlciAuY2VsbCcpO1xuICAgICAgICBjb21wdXRlckNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUGxheWVyQXR0YWNrKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgZG9tLmRpc3BsYXlCb2FyZHMoKTtcbiAgICAgICAgZ2FtZS5wbGFjZUNvbXB1dGVyU2hpcHMoKTtcbiAgICAgICAgZ2FtZS5wbGFjZVBsYXllclNoaXBzKCk7XG4gICAgICAgIGRvbS5kaXNwbGF5UGxheWVyU2hpcHMoKVxuICAgICAgICBnYW1lLmZpcnN0VHVybigpXG4gICAgICAgIGFkZExpc3RlbmVycygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgaW5pdCB9XG59XG5cbnBsYXlHYW1lKCkuaW5pdCgpIiwiaW1wb3J0IEJvYXJkIGZyb20gXCIuL2JvYXJkRmFjdG9yeS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gICAgdGhpcy5hdHRhY2tzRG9uZSA9IFtdO1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgIHRoaXMubGFzdEF0dGFja0hpdCA9IGZhbHNlO1xuICAgIHRoaXMuaGl0Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLmxhc3RIaXRDb29yZGluYXRlO1xuICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzID0gW107XG4gIH1cblxuICBwbGF5ZXJBdHRhY2soY29vcmRpbmF0ZXMsIGNvbXB1dGVyQm9hcmQpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykpIHJldHVybjtcbiAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgY29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpIHtcbiAgICBpZiAoIXRoaXMubGFzdEF0dGFja0hpdCB8fCAhdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdHRhY2sgPSB0aGlzLnJhbmRvbUNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkKTtcbiAgICAgIGlmIChhdHRhY2spIHJldHVybiB0aGlzLmNvbXB1dGVyQXR0YWNrSGl0cygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0QXR0YWNrSGl0ICYmIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcy5zaGlmdCgpO1xuICAgICAgdGhpcy5hdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgIGNvbnN0IGF0dGFjayA9IHBsYXllckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgaWYgKGF0dGFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wdXRlckF0dGFja0hpdHMoKTtcbiAgICAgIH0gZWxzZSBpZiAoIWF0dGFjayAmJiAhdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGFzdEF0dGFja0hpdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhc3RIaXRDb29yZGluYXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0QXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJhbmRvbUNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLnJhbmRvbUNvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5hdHRhY2tzRG9uZS5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gcGxheWVyQm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH1cblxuICBjb21wdXRlckF0dGFja0hpdHMoKSB7XG4gICAgdGhpcy5sYXN0QXR0YWNrSGl0ID0gdHJ1ZTtcbiAgICB0aGlzLmhpdENvb3JkaW5hdGVzLnB1c2godGhpcy5hdHRhY2tzRG9uZS5hdCgtMSkpO1xuICAgIHRoaXMubGFzdEhpdENvb3JkaW5hdGUgPSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0xKTtcbiAgICBjb25zdCBtb3ZlcyA9IFtbMSwgMF0sIFstMSwgMF0sIFswLCAxXSwgWzAsIC0xXV07XG4gICAgbW92ZXMuZm9yRWFjaChtb3ZlID0+IHtcbiAgICAgIGNvbnN0IG5ld1JvdyA9IG1vdmVbMF0gKyB0aGlzLmxhc3RIaXRDb29yZGluYXRlWzBdO1xuICAgICAgY29uc3QgbmV3Q29sID0gbW92ZVsxXSArIHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMV07XG4gICAgICBpZiAoIXRoaXMuY2hlY2tDb29yZGluYXRlcyhbbmV3Um93LCBuZXdDb2xdKSB8fCAobmV3Um93IDwgMCB8fCBuZXdDb2wgPCAwIHx8IG5ld1JvdyA+IDkgfHwgbmV3Q29sID4gOSkpIHJldHVybjtcbiAgICAgIHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW25ld1JvdywgbmV3Q29sXSk7XG4gICAgfSlcblxuICAgIGlmICh0aGlzLmhpdENvb3JkaW5hdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICh0aGlzLmxhc3RIaXRDb29yZGluYXRlWzBdID09PSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0yKVswXSkge1xuICAgICAgICB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLmZpbHRlcihtb3ZlID0+IG1vdmVbMF0gPT09IHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMF0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhc3RIaXRDb29yZGluYXRlWzFdID09PSB0aGlzLmhpdENvb3JkaW5hdGVzLmF0KC0yKVsxXSkge1xuICAgICAgICB0aGlzLm5leHRBdHRhY2tDb29yZGluYXRlcyA9IHRoaXMubmV4dEF0dGFja0Nvb3JkaW5hdGVzLmZpbHRlcihtb3ZlID0+IG1vdmVbMV0gPT09IHRoaXMubGFzdEhpdENvb3JkaW5hdGVbMV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNoYW5nZVR1cm4oKSB7XG4gICAgdGhpcy50dXJuID8gdGhpcy50dXJuID0gZmFsc2UgOiB0aGlzLnR1cm4gPSB0cnVlO1xuICB9XG5cbiAgcmFuZG9tQ29vcmRpbmF0ZXMoKSB7XG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgd2hpbGUgKCF0aGlzLmNoZWNrQ29vcmRpbmF0ZXMoW3JvdywgY29sXSkpIHtcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgfVxuXG4gIGNoZWNrQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuYXR0YWNrc0RvbmUpIHtcbiAgICAgIGlmIChlbGVtZW50WzBdID09PSByb3cgJiYgZWxlbWVudFsxXSA9PT0gY29sKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnBvc2l0aW9uID0gW107XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgfVxuXG4gIGdldEhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICB0aGlzLmlzU3VuaygpO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHRoaXMuc3VuayA9IHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9