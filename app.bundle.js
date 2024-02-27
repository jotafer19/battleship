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
  const playerBoard = player.getBoard();
  const computerBoard = computer.getBoard();

  const createBoards = () => {
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
      const [x, y] = coordinates;
      const cell = document.querySelector(`.player .cell[data-row="${x}"][data-col="${y}"]`);
      cell.classList.add('ship');
    })
  }

  const displayMove = () => {
    let attackedCell;
    let displayCell;

    if (player.getTurn()) {
      const [x, y] = player.attacksDone.at(-1);
      attackedCell = computerBoard.board[x][y];
      displayCell = document.querySelector(`.computer .cell[data-row="${x}"][data-col="${y}"]`);
    } else if (computer.getTurn()) {
      const [x, y] = computer.attacksDone.at(-1);
      attackedCell = playerBoard.board[x][y];
      displayCell = document.querySelector(`.player .cell[data-row="${x}"][data-col="${y}"]`);
    }

    (attackedCell === "X") ? displayCell.classList.add('hit') : displayCell.classList.add('miss');
  }

  return {
    createBoards,
    displayPlayerShips,
    displayMove,
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

    if (!this.checkPlacement(ship, coordinates, direction)) return;

    ship.position.forEach((position) => {
      const [xCoor, yCoor] = position;
      this.board[xCoor][yCoor] = ship;
    });

    this.placeWater(ship.position);
  }

  receiveAttack(coordinates) {
    const [xCoor, yCoor] = coordinates;

    if (!this.board[xCoor][yCoor] || this.board[xCoor][yCoor] === "water") {
      return (this.board[xCoor][yCoor] = "O");
    }

    this.board[xCoor][yCoor].getHit();
    this.board[xCoor][yCoor] = "X";
  }

  checkGameOver() {
    return Object.values(this.ships).every((ship) => ship.sunk);
  }

  placeWater(shipPosition) {
    const adjacentCells = [];

    shipPosition.forEach((coordinate) => {
      const [xCoor, yCoor] = coordinate;

      for (let i = xCoor - 1; i <= xCoor + 1; i++) {
        for (let j = yCoor - 1; j <= yCoor + 1; j++) {
          if (
            (i !== xCoor || j !== yCoor) &&
            i >= 0 &&
            i < 10 &&
            j >= 0 &&
            j < 10
          )
            adjacentCells.push([i, j]);
        }
      }
    });

    adjacentCells.forEach((coordinate) => {
      const [xCoor, yCoor] = coordinate;
      if (!this.board[xCoor][yCoor]) this.board[xCoor][yCoor] = "water";
    });
  }

  checkPlacement(ship, coordinates, direction) {
    const position = [];
    const [xCoor, yCoor] = coordinates;

    if (direction === "row") {
      for (let i = yCoor; i < yCoor + ship.length; i++)
        position.push([xCoor, i]);
    } else if (direction === "col") {
      for (let i = xCoor; i < xCoor + ship.length; i++)
        position.push([i, yCoor]);
    }

    ship.position = position;
    return position.every((coordinate) => this.isValid(coordinate));
  }

  isValid(coordinates) {
    const [xCoor, yCoor] = coordinates;

    if (xCoor < 0 || xCoor > 9 || yCoor < 0 || yCoor > 9) return false;
    if (this.board[xCoor][yCoor]) return false;

    return true;
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
/* harmony import */ var _playerFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerFactory.js */ "./src/playerFactory.js");


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

  const startTurn = () => {
    player.changeTurn()
  }

  const changeTurns = () => {
    player.changeTurn();
    computer.changeTurn();
  }

  const checkWinner = () => {
    (player.getTurn()) ? playerBoard.checkGameOver() : computerBoard.checkGameOver();
  };

  const getClickedCell = (event) => {
      const row = parseInt(event.target.dataset.row)
      const col = parseInt(event.target.dataset.col);
      
      return [row, col];
  };

  return { 
    placePlayerShips,
    placeComputerShips,
    getClickedCell,
    startTurn,
    changeTurns,
    checkWinner
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
        const coordinates = game.getClickedCell(event);
        if (player.checkCoordinates(coordinates)) return;
        player.attack(computer.getBoard(), coordinates);
        dom.displayMove();
        removeListeners()
        if (computer.getBoard().checkGameOver()) {
            alert('You win')
        } else {
            setTimeout(handleCPUAttack, 500)
        }
    }

    const handleCPUAttack = () => {
        game.changeTurns()
        computer.randomAttack(player.getBoard());
        dom.displayMove();
        game.changeTurns()
        if (player.getBoard().checkGameOver()) {
            console.log('COmputer Wins')
        } else {
            addListeners()
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
        dom.createBoards();
        game.placeComputerShips();
        game.placePlayerShips();
        dom.displayPlayerShips()
        game.startTurn()
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

  getBoard() {
    return this.board;
  }

  attack(enemyBoard, coordinates) {
    if (this.checkCoordinates(coordinates)) return;
    this.attacksDone.push(coordinates);
    enemyBoard.receiveAttack(coordinates);
  }

  randomAttack(enemyBoard) {
    const coordinates = this.randomCoordinates();
    this.attacksDone.push(coordinates);
    enemyBoard.receiveAttack(coordinates);
  }

  randomCoordinates() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (this.checkCoordinates([x, y])) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    return [x, y];
  }

  checkCoordinates(coordinates) {
    for (let i = 0; i < this.attacksDone.length; i++) {
      if (
        this.attacksDone[i].every(
          (value, index) => value === coordinates[index],
        )
      )
        return true;
    }

    return false;
  }

  getTurn() {
    return this.turn;
  }

  changeTurn() {
    (this.turn) ? this.turn = false : this.turn = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxRGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvZ2FtZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zaGlwRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAocGxheWVyLCBjb21wdXRlcikgPT4ge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllci5nZXRCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIuZ2V0Qm9hcmQoKTtcblxuICBjb25zdCBjcmVhdGVCb2FyZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci5ib2FyZFwiKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlci5ib2FyZFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBwbGF5ZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGxheWVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgcGxheWVyQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIHBsYXllckNlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChwbGF5ZXJDZWxsKTtcblxuICAgICAgICBjb25zdCBjb21wdXRlckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb21wdXRlckNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJDZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBsYXllclNoaXBzID0gKCkgPT4ge1xuICAgIGxldCBzaGlwUG9zaXRpb25zID0gW107XG4gICAgXG4gICAgT2JqZWN0LnZhbHVlcyhwbGF5ZXJCb2FyZC5zaGlwcykuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIHNoaXBQb3NpdGlvbnMgPSBzaGlwUG9zaXRpb25zLmNvbmNhdChzaGlwLnBvc2l0aW9uKTtcbiAgICB9KVxuXG4gICAgc2hpcFBvc2l0aW9ucy5mb3JFYWNoKGNvb3JkaW5hdGVzID0+IHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkaW5hdGVzO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3h9XCJdW2RhdGEtY29sPVwiJHt5fVwiXWApO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlNb3ZlID0gKCkgPT4ge1xuICAgIGxldCBhdHRhY2tlZENlbGw7XG4gICAgbGV0IGRpc3BsYXlDZWxsO1xuXG4gICAgaWYgKHBsYXllci5nZXRUdXJuKCkpIHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IHBsYXllci5hdHRhY2tzRG9uZS5hdCgtMSk7XG4gICAgICBhdHRhY2tlZENlbGwgPSBjb21wdXRlckJvYXJkLmJvYXJkW3hdW3ldO1xuICAgICAgZGlzcGxheUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29tcHV0ZXIgLmNlbGxbZGF0YS1yb3c9XCIke3h9XCJdW2RhdGEtY29sPVwiJHt5fVwiXWApO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXIuZ2V0VHVybigpKSB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBjb21wdXRlci5hdHRhY2tzRG9uZS5hdCgtMSk7XG4gICAgICBhdHRhY2tlZENlbGwgPSBwbGF5ZXJCb2FyZC5ib2FyZFt4XVt5XTtcbiAgICAgIGRpc3BsYXlDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllciAuY2VsbFtkYXRhLXJvdz1cIiR7eH1cIl1bZGF0YS1jb2w9XCIke3l9XCJdYCk7XG4gICAgfVxuXG4gICAgKGF0dGFja2VkQ2VsbCA9PT0gXCJYXCIpID8gZGlzcGxheUNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0JykgOiBkaXNwbGF5Q2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUJvYXJkcyxcbiAgICBkaXNwbGF5UGxheWVyU2hpcHMsXG4gICAgZGlzcGxheU1vdmUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBET007IiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcEZhY3RvcnkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICAgIHRoaXMuc2hpcHMgPSB7XG4gICAgICBjYXJyaWVyOiBuZXcgU2hpcChcImNhcnJpZXJcIiwgNSksXG4gICAgICBiYXR0bGVzaGlwOiBuZXcgU2hpcChcImJhdHRsZXNoaXBcIiwgNCksXG4gICAgICBkZXN0cm95ZXI6IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsIDMpLFxuICAgICAgc3VibWFyaW5lOiBuZXcgU2hpcChcInN1Ym1hcmluZVwiLCAyKSxcbiAgICAgIHBhdHJvbEJvYXQ6IG5ldyBTaGlwKFwicGF0cm9sQm9hdFwiLCAxKSxcbiAgICB9O1xuICB9XG5cbiAgcGxhY2VTaGlwcyhzaGlwTmFtZSwgY29vcmRpbmF0ZXMsIGRpcmVjdGlvbikge1xuICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW3NoaXBOYW1lXTtcblxuICAgIGlmICghdGhpcy5jaGVja1BsYWNlbWVudChzaGlwLCBjb29yZGluYXRlcywgZGlyZWN0aW9uKSkgcmV0dXJuO1xuXG4gICAgc2hpcC5wb3NpdGlvbi5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgICAgY29uc3QgW3hDb29yLCB5Q29vcl0gPSBwb3NpdGlvbjtcbiAgICAgIHRoaXMuYm9hcmRbeENvb3JdW3lDb29yXSA9IHNoaXA7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBsYWNlV2F0ZXIoc2hpcC5wb3NpdGlvbik7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3hDb29yLCB5Q29vcl0gPSBjb29yZGluYXRlcztcblxuICAgIGlmICghdGhpcy5ib2FyZFt4Q29vcl1beUNvb3JdIHx8IHRoaXMuYm9hcmRbeENvb3JdW3lDb29yXSA9PT0gXCJ3YXRlclwiKSB7XG4gICAgICByZXR1cm4gKHRoaXMuYm9hcmRbeENvb3JdW3lDb29yXSA9IFwiT1wiKTtcbiAgICB9XG5cbiAgICB0aGlzLmJvYXJkW3hDb29yXVt5Q29vcl0uZ2V0SGl0KCk7XG4gICAgdGhpcy5ib2FyZFt4Q29vcl1beUNvb3JdID0gXCJYXCI7XG4gIH1cblxuICBjaGVja0dhbWVPdmVyKCkge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuc2hpcHMpLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnN1bmspO1xuICB9XG5cbiAgcGxhY2VXYXRlcihzaGlwUG9zaXRpb24pIHtcbiAgICBjb25zdCBhZGphY2VudENlbGxzID0gW107XG5cbiAgICBzaGlwUG9zaXRpb24uZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgICAgY29uc3QgW3hDb29yLCB5Q29vcl0gPSBjb29yZGluYXRlO1xuXG4gICAgICBmb3IgKGxldCBpID0geENvb3IgLSAxOyBpIDw9IHhDb29yICsgMTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSB5Q29vciAtIDE7IGogPD0geUNvb3IgKyAxOyBqKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoaSAhPT0geENvb3IgfHwgaiAhPT0geUNvb3IpICYmXG4gICAgICAgICAgICBpID49IDAgJiZcbiAgICAgICAgICAgIGkgPCAxMCAmJlxuICAgICAgICAgICAgaiA+PSAwICYmXG4gICAgICAgICAgICBqIDwgMTBcbiAgICAgICAgICApXG4gICAgICAgICAgICBhZGphY2VudENlbGxzLnB1c2goW2ksIGpdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWRqYWNlbnRDZWxscy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgICBjb25zdCBbeENvb3IsIHlDb29yXSA9IGNvb3JkaW5hdGU7XG4gICAgICBpZiAoIXRoaXMuYm9hcmRbeENvb3JdW3lDb29yXSkgdGhpcy5ib2FyZFt4Q29vcl1beUNvb3JdID0gXCJ3YXRlclwiO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tQbGFjZW1lbnQoc2hpcCwgY29vcmRpbmF0ZXMsIGRpcmVjdGlvbikge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gW107XG4gICAgY29uc3QgW3hDb29yLCB5Q29vcl0gPSBjb29yZGluYXRlcztcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSB5Q29vcjsgaSA8IHlDb29yICsgc2hpcC5sZW5ndGg7IGkrKylcbiAgICAgICAgcG9zaXRpb24ucHVzaChbeENvb3IsIGldKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgZm9yIChsZXQgaSA9IHhDb29yOyBpIDwgeENvb3IgKyBzaGlwLmxlbmd0aDsgaSsrKVxuICAgICAgICBwb3NpdGlvbi5wdXNoKFtpLCB5Q29vcl0pO1xuICAgIH1cblxuICAgIHNoaXAucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICByZXR1cm4gcG9zaXRpb24uZXZlcnkoKGNvb3JkaW5hdGUpID0+IHRoaXMuaXNWYWxpZChjb29yZGluYXRlKSk7XG4gIH1cblxuICBpc1ZhbGlkKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgW3hDb29yLCB5Q29vcl0gPSBjb29yZGluYXRlcztcblxuICAgIGlmICh4Q29vciA8IDAgfHwgeENvb3IgPiA5IHx8IHlDb29yIDwgMCB8fCB5Q29vciA+IDkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5ib2FyZFt4Q29vcl1beUNvb3JdKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaW50Qm9hcmQoKSB7XG4gICAgdGhpcy5ib2FyZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyRmFjdG9yeS5qc1wiO1xuXG5jb25zdCBnYW1lQ29udHJvbGxlciA9IChwbGF5ZXIsIGNvbXB1dGVyKSA9PiB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gcGxheWVyLmJvYXJkO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gY29tcHV0ZXIuYm9hcmQ7XG5cbiAgY29uc3QgcGxhY2VQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKFwiY2FycmllclwiLCBbMCwgMF0sICdyb3cnKTtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKFwiYmF0dGxlc2hpcFwiLCBbOSwgM10sICdyb3cnKTtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXBzKFwiZGVzdHJveWVyXCIsIFs0LCA3XSwgJ3JvdycpO1xuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcHMoXCJzdWJtYXJpbmVcIiwgWzIsIDFdLCAncm93Jyk7XG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwcyhcInBhdHJvbEJvYXRcIiwgWzgsIDBdLCAncm93Jyk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VDb21wdXRlclNoaXBzID0gKCkgPT4ge1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwcyhcImNhcnJpZXJcIiwgWzcsIDNdLCAncm93Jyk7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXBzKFwiYmF0dGxlc2hpcFwiLCBbMiwgMF0sICdyb3cnKTtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcHMoXCJkZXN0cm95ZXJcIiwgWzAsIDFdLCAncm93Jyk7XG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXBzKFwic3VibWFyaW5lXCIsIFszLCA3XSwgJ3JvdycpO1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwcyhcInBhdHJvbEJvYXRcIiwgWzUsIDBdLCAncm93Jyk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRUdXJuID0gKCkgPT4ge1xuICAgIHBsYXllci5jaGFuZ2VUdXJuKClcbiAgfVxuXG4gIGNvbnN0IGNoYW5nZVR1cm5zID0gKCkgPT4ge1xuICAgIHBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgY29tcHV0ZXIuY2hhbmdlVHVybigpO1xuICB9XG5cbiAgY29uc3QgY2hlY2tXaW5uZXIgPSAoKSA9PiB7XG4gICAgKHBsYXllci5nZXRUdXJuKCkpID8gcGxheWVyQm9hcmQuY2hlY2tHYW1lT3ZlcigpIDogY29tcHV0ZXJCb2FyZC5jaGVja0dhbWVPdmVyKCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0Q2xpY2tlZENlbGwgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdylcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbCk7XG4gICAgICBcbiAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICB9O1xuXG4gIHJldHVybiB7IFxuICAgIHBsYWNlUGxheWVyU2hpcHMsXG4gICAgcGxhY2VDb21wdXRlclNoaXBzLFxuICAgIGdldENsaWNrZWRDZWxsLFxuICAgIHN0YXJ0VHVybixcbiAgICBjaGFuZ2VUdXJucyxcbiAgICBjaGVja1dpbm5lclxuICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVDb250cm9sbGVyXG4iLCJpbXBvcnQgZ2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vZ2FtZUNvbnRyb2xsZXIuanNcIjtcbmltcG9ydCBET00gZnJvbSBcIi4vRE9NLmpzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllckZhY3RvcnkuanNcIjtcblxuY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigncGxheWVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdjb21wdXRlcicpO1xuXG4gICAgY29uc3QgZ2FtZSA9IGdhbWVDb250cm9sbGVyKHBsYXllciwgY29tcHV0ZXIpO1xuICAgIGNvbnN0IGRvbSA9IERPTShwbGF5ZXIsIGNvbXB1dGVyKTtcblxuICAgIGNvbnN0IGhhbmRsZVBsYXllckF0dGFjayA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdhbWUuZ2V0Q2xpY2tlZENlbGwoZXZlbnQpO1xuICAgICAgICBpZiAocGxheWVyLmNoZWNrQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpKSByZXR1cm47XG4gICAgICAgIHBsYXllci5hdHRhY2soY29tcHV0ZXIuZ2V0Qm9hcmQoKSwgY29vcmRpbmF0ZXMpO1xuICAgICAgICBkb20uZGlzcGxheU1vdmUoKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXJzKClcbiAgICAgICAgaWYgKGNvbXB1dGVyLmdldEJvYXJkKCkuY2hlY2tHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICBhbGVydCgnWW91IHdpbicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGhhbmRsZUNQVUF0dGFjaywgNTAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlQ1BVQXR0YWNrID0gKCkgPT4ge1xuICAgICAgICBnYW1lLmNoYW5nZVR1cm5zKClcbiAgICAgICAgY29tcHV0ZXIucmFuZG9tQXR0YWNrKHBsYXllci5nZXRCb2FyZCgpKTtcbiAgICAgICAgZG9tLmRpc3BsYXlNb3ZlKCk7XG4gICAgICAgIGdhbWUuY2hhbmdlVHVybnMoKVxuICAgICAgICBpZiAocGxheWVyLmdldEJvYXJkKCkuY2hlY2tHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ09tcHV0ZXIgV2lucycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRMaXN0ZW5lcnMoKVxuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgY29uc3QgYWRkTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21wdXRlckNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXB1dGVyIC5jZWxsJyk7XG4gICAgICAgIGNvbXB1dGVyQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGF5ZXJBdHRhY2spKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcHV0ZXIgLmNlbGwnKTtcbiAgICAgICAgY29tcHV0ZXJDZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVBsYXllckF0dGFjaykpO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGRvbS5jcmVhdGVCb2FyZHMoKTtcbiAgICAgICAgZ2FtZS5wbGFjZUNvbXB1dGVyU2hpcHMoKTtcbiAgICAgICAgZ2FtZS5wbGFjZVBsYXllclNoaXBzKCk7XG4gICAgICAgIGRvbS5kaXNwbGF5UGxheWVyU2hpcHMoKVxuICAgICAgICBnYW1lLnN0YXJ0VHVybigpXG4gICAgICAgIGFkZExpc3RlbmVycygpXG4gICAgICAgIFxuICAgIH1cblxuICAgIHJldHVybiB7IGluaXQgfVxufVxuXG5wbGF5R2FtZSgpLmluaXQoKSIsImltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZEZhY3RvcnkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIHRoaXMuYXR0YWNrc0RvbmUgPSBbXTtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICB9XG5cbiAgYXR0YWNrKGVuZW15Qm9hcmQsIGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykpIHJldHVybjtcbiAgICB0aGlzLmF0dGFja3NEb25lLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH1cblxuICByYW5kb21BdHRhY2soZW5lbXlCb2FyZCkge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5yYW5kb21Db29yZGluYXRlcygpO1xuICAgIHRoaXMuYXR0YWNrc0RvbmUucHVzaChjb29yZGluYXRlcyk7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIHJhbmRvbUNvb3JkaW5hdGVzKCkge1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgd2hpbGUgKHRoaXMuY2hlY2tDb29yZGluYXRlcyhbeCwgeV0pKSB7XG4gICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG5cbiAgY2hlY2tDb29yZGluYXRlcyhjb29yZGluYXRlcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRhY2tzRG9uZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmF0dGFja3NEb25lW2ldLmV2ZXJ5KFxuICAgICAgICAgICh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBjb29yZGluYXRlc1tpbmRleF0sXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0VHVybigpIHtcbiAgICByZXR1cm4gdGhpcy50dXJuO1xuICB9XG5cbiAgY2hhbmdlVHVybigpIHtcbiAgICAodGhpcy50dXJuKSA/IHRoaXMudHVybiA9IGZhbHNlIDogdGhpcy50dXJuID0gdHJ1ZTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5wb3NpdGlvbiA9IFtdO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gIH1cblxuICBnZXRIaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgdGhpcy5pc1N1bmsoKTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICB0aGlzLnN1bmsgPSB0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==