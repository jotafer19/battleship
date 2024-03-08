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

    const isPositionValid = (ship, coordinates) => {
        const length = parseInt(ship.dataset.length);
        const direction = ship.dataset.direction;
        const [row, col] = coordinates;

        if (direction === "row") {
            for (let i = col; i < col + length; i++) {
                if (i < 0 || i > 9) return false;
            }
        } else if (direction === "col") {
            for (let i = row; i < row + length; i++) {
                if (i < 0 || i > 9) return false;
            }
        }

        return true;
    }

    const dragDrop = (event) => {
        event.preventDefault()
        const cell = event.target;
        const coordinates = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
        cell.classList.toggle('drag-over')

        const data = event.dataTransfer.getData('text/plain');
        const draggableShip = document.getElementById(data);

        try {
            if (!isPositionValid(draggableShip, coordinates)) return;
            draggableShip.style.position = "absolute";
            cell.append(draggableShip);
        } catch {
            return;
        }
    }

    const dragShips = () => {
        const allShips = document.querySelectorAll('.active .ship');
        allShips.forEach(ship => {
            ship.addEventListener('dragstart', dragStart)
            ship.addEventListener('dragend', dragEnd)
        })

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
        dragShips()
    }

    return {
        displayBoards,
        displayShipsPlayerOne
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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixrQkFBa0I7QUFDaEQ7QUFDQTtBQUNBLFVBQVU7QUFDViw4QkFBOEIsa0JBQWtCO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEdBQUc7Ozs7Ozs7Ozs7OztBQzlKUTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLG9EQUFHO0FBQ0gsb0RBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERPTSA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJPbmVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItb25lLmJvYXJkJyk7XG4gICAgICAgIGNvbnN0IHBsYXllclR3b0JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci10d28uYm9hcmQnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJPbmVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQ2VsbC5kYXRhc2V0LmNvbCA9IGo7XG4gICAgICAgICAgICAgICAgcGxheWVyT25lQm9hcmQuYXBwZW5kKHBsYXllck9uZUNlbGwpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGxheWVyVHdvQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0NlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICAgICAgICAgIHBsYXllclR3b0JvYXJkLmFwcGVuZChwbGF5ZXJUd29DZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdlbmVyYXRlU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBzRGF0YSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2FycmllcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmF0dGxlc2hpcCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZGVzdHJveWVyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzdWJtYXJpbmUnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3BhdHJvbCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBjcmVhdGVkU2hpcHMgPSBbXTtcbiAgICAgICAgc2hpcHNEYXRhLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTaGlwLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgIG5ld1NoaXAuc2V0QXR0cmlidXRlKCdpZCcsIHNoaXAubmFtZSk7XG4gICAgICAgICAgICBuZXdTaGlwLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgbmV3U2hpcC5kYXRhc2V0Lmxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgICAgICAgICAgbmV3U2hpcC5kYXRhc2V0LmRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwUGFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHNoaXBQYXJ0LmNsYXNzTGlzdC5hZGQoJ3NoaXAtcGFydCcpO1xuICAgICAgICAgICAgICAgIG5ld1NoaXAuYXBwZW5kKHNoaXBQYXJ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlZFNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZWRTaGlwcztcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBldmVudC50YXJnZXQuaWQpO1xuXG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ0VuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnZHJhZ2dlZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGRyYWdPdmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgZHJhZ0VudGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnRvZ2dsZSgnZHJhZy1vdmVyJylcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnTGVhdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QudG9nZ2xlKCdkcmFnLW92ZXInKVxuICAgIH1cblxuICAgIGNvbnN0IGlzUG9zaXRpb25WYWxpZCA9IChzaGlwLCBjb29yZGluYXRlcykgPT4ge1xuICAgICAgICBjb25zdCBsZW5ndGggPSBwYXJzZUludChzaGlwLmRhdGFzZXQubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gc2hpcC5kYXRhc2V0LmRpcmVjdGlvbjtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGVzO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjb2w7IGkgPCBjb2wgKyBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgMCB8fCBpID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdyArIGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAwIHx8IGkgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmFnRHJvcCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW3BhcnNlSW50KGNlbGwuZGF0YXNldC5yb3cpLCBwYXJzZUludChjZWxsLmRhdGFzZXQuY29sKV07XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnRvZ2dsZSgnZHJhZy1vdmVyJylcblxuICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlU2hpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIWlzUG9zaXRpb25WYWxpZChkcmFnZ2FibGVTaGlwLCBjb29yZGluYXRlcykpIHJldHVybjtcbiAgICAgICAgICAgIGRyYWdnYWJsZVNoaXAuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICBjZWxsLmFwcGVuZChkcmFnZ2FibGVTaGlwKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkcmFnU2hpcHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuc2hpcCcpO1xuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQpXG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBkcmFnRW5kKVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGFsbENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZSAuY2VsbCcpO1xuICAgICAgICBhbGxDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBkaXNwbGF5U2hpcHNQbGF5ZXJPbmUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1vbmUuc2hpcC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBnZW5lcmF0ZVNoaXBzKCk7XG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBzaGlwc0NvbnRhaW5lci5hcHBlbmQoc2hpcCk7XG4gICAgICAgIH0pXG4gICAgICAgIGRyYWdTaGlwcygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlzcGxheUJvYXJkcyxcbiAgICAgICAgZGlzcGxheVNoaXBzUGxheWVyT25lXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET007IiwiaW1wb3J0IERPTSBmcm9tIFwiLi9ET00uanNcIlxuXG5jb25zdCBwbGF5R2FtZSA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudnMtQ1BVJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcHUnKVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudnMtcGxheWVyJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwbGF5ZXInKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxucGxheUdhbWUoKVxuRE9NKCkuZGlzcGxheUJvYXJkcygpXG5ET00oKS5kaXNwbGF5U2hpcHNQbGF5ZXJPbmUoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==