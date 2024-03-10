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

    const doubleClick = (event) => {
        const ship = event.target.closest('.ship')
        const startCoordinates = [parseInt(ship.dataset.row), parseInt(ship.dataset.col)];
        const direction = ship.dataset.direction;

        ship.classList.toggle('dragged')
        if (direction === "row") {
            ship.dataset.direction = "col"
            if (isValidPosition(ship, startCoordinates)) {
                ship.style.gridAutoFlow = "row"
            } else if (!isValidPosition(ship, startCoordinates)) {
                ship.dataset.direction = "row";
            }
        } else if (direction === "col") {
            ship.dataset.direction = "row"
            if (isValidPosition(ship, startCoordinates)) {
                ship.style.gridAutoFlow = "column"
            } else if (!isValidPosition(ship, startCoordinates)) {
                ship.dataset.direction = "col";
            }
        }
        ship.classList.toggle('dragged')
    }

    const dragEnter = (event) => {
        event.preventDefault();
        const cell = event.target;
        cell.classList.toggle('drag-over')
    }

    const dragLeave = (event) => {
        event.preventDefault();
        const cell = event.target;
        cell.classList.toggle('drag-over')
    }

    const dragDrop = (event) => {
        event.preventDefault();

        const cell = event.target;
        const [row, col] = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
        cell.classList.toggle('drag-over')

        const data = event.dataTransfer.getData('text/plain');
        const draggableShip = document.getElementById(data);

        try {
            if (!isValidPosition(draggableShip, [row, col])) return;
            draggableShip.style.position = "absolute";
            draggableShip.dataset.row = row;
            draggableShip.dataset.col = col;
            cell.append(draggableShip);
            draggableShip.addEventListener('click', doubleClick)
        } catch {
            return;
        }
    }

    const shipListeners = () => {
        const allShips = document.querySelectorAll('.active .ship');
        allShips.forEach(ship => {
            ship.addEventListener('dragstart', dragStart)
            ship.addEventListener('dragend', dragEnd)
        })
    }

    const boardListeners = () => {
        const allCells = document.querySelectorAll('.active .cell');
        allCells.forEach(cell => {
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragleave', dragLeave);
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('drop', dragDrop);
        })
    }

    const displayShipsPlayerOne = () => {
        const shipsContainer = document.querySelector('.player-one.ship-container');
        const ships = generateShips();
        ships.forEach(ship => {
            shipsContainer.append(ship);
        })
        shipListeners()
        boardListeners()
    }

    const displayShipsPlayerTwo = () => {
        const shipsContainer = document.querySelector('.player-two.ship-container');
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
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);

        const cellsUsed = getAllCellsUsed();

        // do... while or only while loop?
    }

    return {
        displayBoards,
        displayShipsPlayerOne,
        displayShipsPlayerTwo,
        resetButton
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM.js */ "./src/DOM.js");


const playGame = () => {
    document.addEventListener('click', event => {
        if (event.target.closest('.vs-CPU')) {
            console.log('cpu')
        } else if (event.target.closest('.vs-player')) {
            console.log('player')
        }
    })
}

playGame()
;(0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"])().displayBoards()
;(0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"])().displayShipsPlayerOne()
;(0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"])().resetButton()

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRCxVQUFVO0FBQ1YsOEJBQThCLGtCQUFrQjtBQUNoRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxHQUFHOzs7Ozs7Ozs7Ozs7QUM3UVE7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxvREFBRztBQUNILG9EQUFHO0FBQ0gsb0RBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERPTSA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJPbmVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItb25lLmJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHBsYXllclR3b0JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10d28uYm9hcmQnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJPbmVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQm9hcmQuYXBwZW5kKHBsYXllck9uZUNlbGwpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGxheWVyVHdvQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0JvYXJkLmFwcGVuZChwbGF5ZXJUd29DZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdlbmVyYXRlU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBzRGF0YSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2FycmllcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmF0dGxlc2hpcCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZGVzdHJveWVyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzdWJtYXJpbmUnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3BhdHJvbCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBjcmVhdGVkU2hpcHMgPSBbXTtcbiAgICAgICAgc2hpcHNEYXRhLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTaGlwLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgIG5ld1NoaXAuc2V0QXR0cmlidXRlKCdpZCcsIHNoaXAubmFtZSk7XG4gICAgICAgICAgICBuZXdTaGlwLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgbmV3U2hpcC5kYXRhc2V0Lmxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgICAgICAgICAgbmV3U2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwUGFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHNoaXBQYXJ0LmNsYXNzTGlzdC5hZGQoJ3NoaXAtcGFydCcpO1xuICAgICAgICAgICAgICAgIG5ld1NoaXAuYXBwZW5kKHNoaXBQYXJ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlZFNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZWRTaGlwcztcbiAgICB9XG5cbiAgICBjb25zdCBpc0luVGhlQm9hcmQgPSAoZHJhZ2dlZFNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpID0+IHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gcGFyc2VJbnQoZHJhZ2dlZFNoaXAuZGF0YXNldC5sZW5ndGgpO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBkcmFnZ2VkU2hpcC5kYXRhc2V0LmRpcmVjdGlvbjtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IHN0YXJ0Q29vcmRpbmF0ZXM7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgICAgICAgaWYgKGNvbCArIGxlbmd0aCAtIDEgPCAwIHx8IGNvbCArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAgICAgICBpZiAocm93ICsgbGVuZ3RoIC0gMSA8IDAgfHwgcm93ICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGdldFNoaXBDb29yZGluYXRlcyA9IChzaGlwLCBzdGFydENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBzdGFydENvb3JkaW5hdGVzO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBwYXJzZUludChzaGlwLmRhdGFzZXQubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gc2hpcC5kYXRhc2V0LmRpcmVjdGlvbjtcblxuICAgICAgICBjb25zdCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbDsgaSA8IGNvbCArIGxlbmd0aDsgaSsrKSBzaGlwQ29vcmRpbmF0ZXMucHVzaChbcm93LCBpXSlcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY29sXCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPCByb3cgKyBsZW5ndGg7IGkrKykgc2hpcENvb3JkaW5hdGVzLnB1c2goW2ksIGNvbF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBjb25zdCBnZXRBbGxDZWxsc1VzZWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzUGxhY2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuY2VsbCAuc2hpcDpub3QoLmRyYWdnZWQpJyk7XG4gICAgICAgIGNvbnN0IGFsbENlbGxzVXNlZCA9IFtdO1xuICAgICAgICBhbGxTaGlwc1BsYWNlZC5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRpbmdDb29yZGluYXRlcyA9IFtwYXJzZUludChzaGlwLmRhdGFzZXQucm93KSwgcGFyc2VJbnQoc2hpcC5kYXRhc2V0LmNvbCldO1xuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkaW5hdGVzID0gZ2V0U2hpcENvb3JkaW5hdGVzKHNoaXAsIHN0YXJ0aW5nQ29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgc2hpcENvb3JkaW5hdGVzLmZvckVhY2goY29vcmRpbmF0ZSA9PiBhbGxDZWxsc1VzZWQucHVzaChjb29yZGluYXRlKSk7XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIHJldHVybiBhbGxDZWxsc1VzZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgYXJlQ29vcmRpbmF0ZXNBZGphY2VudCA9IChkcmFnZ2VkU2hpcENvb3JkaW5hdGVzLCBzaGlwc1BsYWNlZENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGNvb3JkMSBvZiBkcmFnZ2VkU2hpcENvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb29yZDIgb2Ygc2hpcHNQbGFjZWRDb29yZGluYXRlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd0RpZmYgPSBNYXRoLmFicyhjb29yZDFbMF0gLSBjb29yZDJbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbERpZmYgPSBNYXRoLmFicyhjb29yZDFbMV0gLSBjb29yZDJbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChyb3dEaWZmIDw9IDEgJiYgY29sRGlmZiA8PSAxKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gKGRyYWdnZWRTaGlwLCBzdGFydENvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgIGlmICghaXNJblRoZUJvYXJkKGRyYWdnZWRTaGlwLCBzdGFydENvb3JkaW5hdGVzKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBkcmFnZ2VkU2hpcENvb3JkaW5hdGVzID0gZ2V0U2hpcENvb3JkaW5hdGVzKGRyYWdnZWRTaGlwLCBzdGFydENvb3JkaW5hdGVzKTtcbiAgICAgICAgY29uc3Qgc2hpcHNQbGFjZWRDb29yZGluYXRlcyA9IGdldEFsbENlbGxzVXNlZCgpO1xuICAgICAgICBpZiAoc2hpcHNQbGFjZWRDb29yZGluYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChhcmVDb29yZGluYXRlc0FkamFjZW50KGRyYWdnZWRTaGlwQ29vcmRpbmF0ZXMsIHNoaXBzUGxhY2VkQ29vcmRpbmF0ZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBldmVudC50YXJnZXQuaWQpO1xuXG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ0VuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZHJhZ2dlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGRyYWdPdmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgZG91YmxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgc2hpcCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2hpcCcpXG4gICAgICAgIGNvbnN0IHN0YXJ0Q29vcmRpbmF0ZXMgPSBbcGFyc2VJbnQoc2hpcC5kYXRhc2V0LnJvdyksIHBhcnNlSW50KHNoaXAuZGF0YXNldC5jb2wpXTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gc2hpcC5kYXRhc2V0LmRpcmVjdGlvbjtcblxuICAgICAgICBzaGlwLmNsYXNzTGlzdC50b2dnbGUoJ2RyYWdnZWQnKVxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJjb2xcIlxuICAgICAgICAgICAgaWYgKGlzVmFsaWRQb3NpdGlvbihzaGlwLCBzdGFydENvb3JkaW5hdGVzKSkge1xuICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUuZ3JpZEF1dG9GbG93ID0gXCJyb3dcIlxuICAgICAgICAgICAgfSBlbHNlIGlmICghaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpKSB7XG4gICAgICAgICAgICAgICAgc2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAgICAgICBzaGlwLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJyb3dcIlxuICAgICAgICAgICAgaWYgKGlzVmFsaWRQb3NpdGlvbihzaGlwLCBzdGFydENvb3JkaW5hdGVzKSkge1xuICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUuZ3JpZEF1dG9GbG93ID0gXCJjb2x1bW5cIlxuICAgICAgICAgICAgfSBlbHNlIGlmICghaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHN0YXJ0Q29vcmRpbmF0ZXMpKSB7XG4gICAgICAgICAgICAgICAgc2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwiY29sXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcC5jbGFzc0xpc3QudG9nZ2xlKCdkcmFnZ2VkJylcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QudG9nZ2xlKCdkcmFnLW92ZXInKVxuICAgIH1cblxuICAgIGNvbnN0IGRyYWdMZWF2ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC50b2dnbGUoJ2RyYWctb3ZlcicpXG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ0Ryb3AgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gW3BhcnNlSW50KGNlbGwuZGF0YXNldC5yb3cpLCBwYXJzZUludChjZWxsLmRhdGFzZXQuY29sKV07XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnRvZ2dsZSgnZHJhZy1vdmVyJylcblxuICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlU2hpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIWlzVmFsaWRQb3NpdGlvbihkcmFnZ2FibGVTaGlwLCBbcm93LCBjb2xdKSkgcmV0dXJuO1xuICAgICAgICAgICAgZHJhZ2dhYmxlU2hpcC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIGRyYWdnYWJsZVNoaXAuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICBkcmFnZ2FibGVTaGlwLmRhdGFzZXQuY29sID0gY29sO1xuICAgICAgICAgICAgY2VsbC5hcHBlbmQoZHJhZ2dhYmxlU2hpcCk7XG4gICAgICAgICAgICBkcmFnZ2FibGVTaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG91YmxlQ2xpY2spXG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlIC5zaGlwJyk7XG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydClcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGRyYWdFbmQpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYm9hcmRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuY2VsbCcpO1xuICAgICAgICBhbGxDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBkaXNwbGF5U2hpcHNQbGF5ZXJPbmUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1vbmUuc2hpcC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBnZW5lcmF0ZVNoaXBzKCk7XG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBzaGlwc0NvbnRhaW5lci5hcHBlbmQoc2hpcCk7XG4gICAgICAgIH0pXG4gICAgICAgIHNoaXBMaXN0ZW5lcnMoKVxuICAgICAgICBib2FyZExpc3RlbmVycygpXG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGxheVNoaXBzUGxheWVyVHdvID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItdHdvLnNoaXAtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gZ2VuZXJhdGVTaGlwcygpO1xuICAgICAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgc2hpcHNDb250YWluZXIuYXBwZW5kKHNoaXApO1xuICAgICAgICB9KVxuICAgICAgICBzaGlwTGlzdGVuZXJzKClcbiAgICAgICAgYm9hcmRMaXN0ZW5lcnMoKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc2V0Qm9hcmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlIC5zaGlwLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUgLnNoaXAnKTtcblxuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4gc2hpcC5yZW1vdmUoKSlcbiAgICAgICAgZ2VuZXJhdGVTaGlwcygpLmZvckVhY2goc2hpcCA9PiBzaGlwQ29udGFpbmVyLmFwcGVuZChzaGlwKSlcbiAgICAgICAgc2hpcExpc3RlbmVycygpXG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5yZXNldC1ib2FyZCcpO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXNldEJvYXJkKVxuICAgIH1cblxuICAgIGNvbnN0IGdldFJhbmRvbUNvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICAgIGNvbnN0IGNlbGxzVXNlZCA9IGdldEFsbENlbGxzVXNlZCgpO1xuXG4gICAgICAgIC8vIGRvLi4uIHdoaWxlIG9yIG9ubHkgd2hpbGUgbG9vcD9cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkaXNwbGF5Qm9hcmRzLFxuICAgICAgICBkaXNwbGF5U2hpcHNQbGF5ZXJPbmUsXG4gICAgICAgIGRpc3BsYXlTaGlwc1BsYXllclR3byxcbiAgICAgICAgcmVzZXRCdXR0b25cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERPTTsiLCJpbXBvcnQgRE9NIGZyb20gXCIuL0RPTS5qc1wiXG5cbmNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy52cy1DUFUnKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NwdScpXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy52cy1wbGF5ZXInKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BsYXllcicpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5wbGF5R2FtZSgpXG5ET00oKS5kaXNwbGF5Qm9hcmRzKClcbkRPTSgpLmRpc3BsYXlTaGlwc1BsYXllck9uZSgpXG5ET00oKS5yZXNldEJ1dHRvbigpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9