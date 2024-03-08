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

export default DOM;