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
  }

  playerAttack(coordinates, computerBoard) {
    if (!this.checkCoordinates(coordinates)) return;
    this.attacksDone.push(coordinates);
    return computerBoard.receiveAttack(coordinates);
  }

  computerAttack(playerBoard) {
    const coordinates = this.randomCoordinates();
    this.attacksDone.push(coordinates);
    return playerBoard.receiveAttack(coordinates);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVzQzs7QUFFdkI7QUFDZjtBQUNBO0FBQ0EscUJBQXFCLHdEQUFLO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0NlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2JvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc2hpcEZhY3RvcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRE9NID0gKHBsYXllciwgY29tcHV0ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlci5ib2FyZDtcblxuICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIuYm9hcmRcIik7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXIuYm9hcmRcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgcGxheWVyQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBsYXllckNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgIHBsYXllckNlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICBwbGF5ZXJDZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQocGxheWVyQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgY29tcHV0ZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29tcHV0ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgICBjb21wdXRlckNlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICBjb21wdXRlckNlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICBjb21wdXRlckJvYXJkLmFwcGVuZENoaWxkKGNvbXB1dGVyQ2VsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcFBvc2l0aW9ucyA9IFtdO1xuICAgIFxuICAgIE9iamVjdC52YWx1ZXMocGxheWVyQm9hcmQuc2hpcHMpLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBzaGlwUG9zaXRpb25zID0gc2hpcFBvc2l0aW9ucy5jb25jYXQoc2hpcC5wb3NpdGlvbik7XG4gICAgfSlcblxuICAgIHNoaXBQb3NpdGlvbnMuZm9yRWFjaChjb29yZGluYXRlcyA9PiB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sfVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlIaXQgPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gcGxheWVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29tcHV0ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfSBlbHNlIGlmIChjb21wdXRlci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gY29tcHV0ZXIuYXR0YWNrc0RvbmUuYXQoLTEpO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGlzcGxheU1pc3MgPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gcGxheWVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29tcHV0ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbH1cIl1gKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIudHVybikge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvbXB1dGVyLmF0dGFja3NEb25lLmF0KC0xKTtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyIC5jZWxsW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRpc3BsYXlCb2FyZHMsXG4gICAgZGlzcGxheVBsYXllclNoaXBzLFxuICAgIGRpc3BsYXlIaXQsXG4gICAgZGlzcGxheU1pc3NcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERPTTsiLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwRmFjdG9yeS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5zaGlwcyA9IHtcbiAgICAgIGNhcnJpZXI6IG5ldyBTaGlwKFwiY2FycmllclwiLCA1KSxcbiAgICAgIGJhdHRsZXNoaXA6IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0KSxcbiAgICAgIGRlc3Ryb3llcjogbmV3IFNoaXAoXCJkZXN0cm95ZXJcIiwgMyksXG4gICAgICBzdWJtYXJpbmU6IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsIDIpLFxuICAgICAgcGF0cm9sQm9hdDogbmV3IFNoaXAoXCJwYXRyb2xCb2F0XCIsIDEpLFxuICAgIH07XG4gIH1cblxuICBwbGFjZVNoaXBzKHNoaXBOYW1lLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSB7XG4gICAgY29uc3Qgc2hpcCA9IHRoaXMuc2hpcHNbc2hpcE5hbWVdO1xuXG4gICAgaWYgKCF0aGlzLnNoaXBQb3NpdGlvbihzaGlwLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5wbGFjZVNoaXBUaWxlcyhzaGlwKTtcbiAgICB0aGlzLnBsYWNlV2F0ZXJUaWxlcyhzaGlwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAodGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IFwiWFwiIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdID09PSBcIk9cIikgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLmJvYXJkW3Jvd11bY29sXSB8fCB0aGlzLmJvYXJkW3Jvd11bY29sXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IFwiT1wiO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3RoaXMuYm9hcmRbcm93XVtjb2xdXTtcbiAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IFwiWFwiO1xuICAgIHNoaXAuZ2V0SGl0KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5zaGlwcykuZXZlcnkoc2hpcCA9PiBzaGlwLnN1bmspO1xuICB9XG5cbiAgc2hpcFBvc2l0aW9uKHNoaXAsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBwb3NzaWJsZVBvc2l0aW9ucyA9IFtdO1xuICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlcztcblxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdyb3cnKSB7XG4gICAgICBmb3IgKGxldCBpID0gY29sOyBpIDwgY29sICsgc2hpcC5sZW5ndGg7IGkrKykgcG9zc2libGVQb3NpdGlvbnMucHVzaChbcm93LCBpXSk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdjb2wnKSB7XG4gICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgc2hpcC5sZW5ndGg7IGkrKykgcG9zc2libGVQb3NpdGlvbnMucHVzaChbaSwgY29sXSk7XG4gICAgfVxuXG4gICAgc2hpcC5wb3NpdGlvbiA9IHBvc3NpYmxlUG9zaXRpb25zO1xuICAgIHJldHVybiBwb3NzaWJsZVBvc2l0aW9ucy5ldmVyeShwb3NpdGlvbiA9PiB0aGlzLmlzVmFsaWQocG9zaXRpb24pKTtcbiAgfVxuXG4gIGlzVmFsaWQoY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoKHJvdyA8IDAgfHwgY29sIDwgMCB8fCByb3cgPiA5IHx8IGNvbCA+IDkpIHx8IHRoaXMuYm9hcmRbcm93XVtjb2xdKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcFRpbGVzKHNoaXApIHtcbiAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBzaGlwLm5hbWU7XG4gICAgfSlcbiAgfVxuXG4gIHBsYWNlV2F0ZXJUaWxlcyhzaGlwKSB7XG4gICAgY29uc3QgcG9zc2libGVXYXRlclRpbGVzID0gW107XG5cbiAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgZm9yIChsZXQgaSA9IHJvdyAtIDE7IGkgPD0gcm93ICsgMTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBjb2wgLSAxOyBqIDw9IGNvbCArIDE7IGorKykge1xuICAgICAgICAgIGlmICgoaSAhPT0gcm93IHx8IGogIT09IGNvbCkgJiYgKGkgPj0gMCAmJiBqID49IDAgJiYgaSA8IDEwICYmIGogPCAxMCkpIHBvc3NpYmxlV2F0ZXJUaWxlcy5wdXNoKFtpLCBqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcG9zc2libGVXYXRlclRpbGVzLmZvckVhY2goY29vcmRpbmF0ZXMgPT4ge1xuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuICAgICAgaWYgKCF0aGlzLmJvYXJkW3Jvd11bY29sXSkgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBcIndhdGVyXCI7XG4gICAgfSlcbiAgfVxuXG4gIHByaW50Qm9hcmQoKSB7XG4gICAgdGhpcy5ib2FyZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImNvbnN0IGdhbWVDb250cm9sbGVyID0gKHBsYXllciwgY29tcHV0ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlci5ib2FyZDtcblxuICBjb25zdCBwbGFjZVBsYXllclNoaXBzID0gKCkgPT4ge1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcHMoXCJjYXJyaWVyXCIsIFswLCAwXSwgJ3JvdycpO1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcHMoXCJiYXR0bGVzaGlwXCIsIFs5LCAzXSwgJ3JvdycpO1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcHMoXCJkZXN0cm95ZXJcIiwgWzQsIDddLCAncm93Jyk7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwcyhcInN1Ym1hcmluZVwiLCBbMiwgMV0sICdyb3cnKTtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKFwicGF0cm9sQm9hdFwiLCBbOCwgMF0sICdyb3cnKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZUNvbXB1dGVyU2hpcHMgPSAoKSA9PiB7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXBzKFwiY2FycmllclwiLCBbNywgM10sICdyb3cnKTtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcHMoXCJiYXR0bGVzaGlwXCIsIFsyLCAwXSwgJ3JvdycpO1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwcyhcImRlc3Ryb3llclwiLCBbMCwgMV0sICdyb3cnKTtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcHMoXCJzdWJtYXJpbmVcIiwgWzMsIDddLCAncm93Jyk7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXBzKFwicGF0cm9sQm9hdFwiLCBbNSwgMF0sICdyb3cnKTtcbiAgfTtcblxuICBjb25zdCBmaXJzdFR1cm4gPSAoKSA9PiB7XG4gICAgcGxheWVyLnR1cm4gPSB0cnVlO1xuICAgIGNvbXB1dGVyLnR1cm4gPSBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNoYW5nZVR1cm5zID0gKCkgPT4ge1xuICAgIHBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgY29tcHV0ZXIuY2hhbmdlVHVybigpO1xuICB9XG5cbiAgY29uc3QgZ2V0Q2xpY2tlZENlbGwgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdylcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbCk7XG4gICAgICBcbiAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICB9O1xuXG4gIGNvbnN0IGlzSGl0ID0gKGF0dGFjaykgPT4ge1xuICAgIHJldHVybiBhdHRhY2s7XG4gIH1cblxuICBjb25zdCBjaGVja1dpbm5lciA9ICgpID0+IHtcbiAgICByZXR1cm4gcGxheWVyLnR1cm4gPyBjb21wdXRlckJvYXJkLmFsbFNoaXBzU3VuaygpIDogcGxheWVyQm9hcmQuYWxsU2hpcHNTdW5rKCk7XG4gIH1cblxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcbiAgICBwbGF5ZXIudHVybiA9IGZhbHNlO1xuICAgIGNvbXB1dGVyLnR1cm4gPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7IFxuICAgIHBsYWNlUGxheWVyU2hpcHMsXG4gICAgcGxhY2VDb21wdXRlclNoaXBzLFxuICAgIGZpcnN0VHVybixcbiAgICBjaGFuZ2VUdXJucyxcbiAgICBnZXRDbGlja2VkQ2VsbCxcbiAgICBpc0hpdCxcbiAgICBjaGVja1dpbm5lcixcbiAgICBnYW1lT3ZlclxuICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyXG4iLCJpbXBvcnQgZ2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vZ2FtZUNvbnRyb2xsZXIuanNcIjtcbmltcG9ydCBET00gZnJvbSBcIi4vRE9NLmpzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllckZhY3RvcnkuanNcIjtcblxuY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigncGxheWVyJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdjb21wdXRlcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjb21wdXRlci5ib2FyZDtcblxuICAgIGNvbnN0IGdhbWUgPSBnYW1lQ29udHJvbGxlcihwbGF5ZXIsIGNvbXB1dGVyKTtcbiAgICBjb25zdCBkb20gPSBET00ocGxheWVyLCBjb21wdXRlcik7XG5cbiAgICBjb25zdCBoYW5kbGVQbGF5ZXJBdHRhY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFwbGF5ZXIudHVybikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW2V2ZW50LnRhcmdldC5kYXRhc2V0LnJvdywgZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sXTtcbiAgICAgICAgaWYgKCFwbGF5ZXIuY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykpIHJldHVybjtcblxuICAgICAgICBjb25zdCBhdHRhY2sgPSBwbGF5ZXIucGxheWVyQXR0YWNrKGNvb3JkaW5hdGVzLCBjb21wdXRlckJvYXJkKTtcblxuICAgICAgICAoZ2FtZS5pc0hpdChhdHRhY2spKSA/IGRvbS5kaXNwbGF5SGl0KCkgOiBkb20uZGlzcGxheU1pc3MoKTtcblxuICAgICAgICBpZiAoZ2FtZS5jaGVja1dpbm5lcigpKSB7XG4gICAgICAgICAgICBnYW1lLmdhbWVPdmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnYW1lLmNoYW5nZVR1cm5zKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGhhbmRsZUNQVUF0dGFjaywgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZUNQVUF0dGFjayA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFjb21wdXRlci50dXJuKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgYXR0YWNrID0gY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpO1xuXG4gICAgICAgIChnYW1lLmlzSGl0KGF0dGFjaykpID8gZG9tLmRpc3BsYXlIaXQoKSA6IGRvbS5kaXNwbGF5TWlzcygpO1xuXG4gICAgICAgIGlmIChnYW1lLmNoZWNrV2lubmVyKCkpIHtcbiAgICAgICAgICAgIGdhbWUuZ2FtZU92ZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdhbWUuY2hhbmdlVHVybnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFkZExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wdXRlciAuY2VsbCcpO1xuICAgICAgICBjb21wdXRlckNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUGxheWVyQXR0YWNrKSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21wdXRlckNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXB1dGVyIC5jZWxsJyk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGF5ZXJBdHRhY2spKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICBkb20uZGlzcGxheUJvYXJkcygpO1xuICAgICAgICBnYW1lLnBsYWNlQ29tcHV0ZXJTaGlwcygpO1xuICAgICAgICBnYW1lLnBsYWNlUGxheWVyU2hpcHMoKTtcbiAgICAgICAgZG9tLmRpc3BsYXlQbGF5ZXJTaGlwcygpXG4gICAgICAgIGdhbWUuZmlyc3RUdXJuKClcbiAgICAgICAgYWRkTGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICByZXR1cm4geyBpbml0IH1cbn1cblxucGxheUdhbWUoKS5pbml0KCkiLCJpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRGYWN0b3J5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB0aGlzLmF0dGFja3NEb25lID0gW107XG4gICAgdGhpcy50dXJuID0gZmFsc2U7XG4gIH1cblxuICBwbGF5ZXJBdHRhY2soY29vcmRpbmF0ZXMsIGNvbXB1dGVyQm9hcmQpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykpIHJldHVybjtcbiAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgY29tcHV0ZXJBdHRhY2socGxheWVyQm9hcmQpIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMucmFuZG9tQ29vcmRpbmF0ZXMoKTtcbiAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIHJldHVybiBwbGF5ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGNoYW5nZVR1cm4oKSB7XG4gICAgdGhpcy50dXJuID8gdGhpcy50dXJuID0gZmFsc2UgOiB0aGlzLnR1cm4gPSB0cnVlO1xuICB9XG5cbiAgcmFuZG9tQ29vcmRpbmF0ZXMoKSB7XG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgd2hpbGUgKCF0aGlzLmNoZWNrQ29vcmRpbmF0ZXMoW3JvdywgY29sXSkpIHtcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgfVxuXG4gIGNoZWNrQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZXM7XG5cbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuYXR0YWNrc0RvbmUpIHtcbiAgICAgIGlmIChlbGVtZW50WzBdID09PSByb3cgJiYgZWxlbWVudFsxXSA9PT0gY29sKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMucG9zaXRpb24gPSBbXTtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0SGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIHRoaXMuaXNTdW5rKCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgdGhpcy5zdW5rID0gdGhpcy5oaXRzID49IHRoaXMubGVuZ3RoO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=