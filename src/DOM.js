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

    const shipClick = (event) => {
        const ship = event.target.closest('.ship')

        if (!ship.parentNode.classList.contains('cell')) return;

        const startCoordinates = [parseInt(ship.dataset.row), parseInt(ship.dataset.col)];
        const direction = ship.dataset.direction;

        ship.classList.toggle('dragged')

        if (direction === "row") {
            ship.dataset.direction = "col";
            isValidPosition(ship, startCoordinates) ? ship.style.gridAutoFlow = "row" : ship.dataset.direction = "row";
        } else if (direction === "col") {
            ship.dataset.direction = "row"
            isValidPosition(ship, startCoordinates) ? ship.style.gridAutoFlow = "column" : ship.dataset.direction = "col";
        }

        ship.classList.toggle('dragged')
    }

    const dragEnter = (event) => {
        event.preventDefault();
        const cell = event.target;
        cell.classList.add('drag-over')
    }

    const dragLeave = (event) => {
        event.preventDefault();
        const cell = event.target;
        cell.classList.remove('drag-over')
    }

    const dragDrop = (event) => {
        event.preventDefault();

        const cell = event.target;
        const [row, col] = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
        cell.classList.remove('drag-over')

        const data = event.dataTransfer.getData('text/plain');
        const draggableShip = document.getElementById(data);

        try {
            if (!isValidPosition(draggableShip, [row, col]) || cell.classList.contains('ship-part')) return;
            draggableShip.style.position = "absolute";
            draggableShip.dataset.row = row;
            draggableShip.dataset.col = col;
            cell.append(draggableShip);
        } catch {
            return;
        }
    }

    const shipListeners = () => {
        const allShips = document.querySelectorAll('.active .ship');
        allShips.forEach(ship => {
            ship.addEventListener('dragstart', dragStart)
            ship.addEventListener('dragend', dragEnd)
            ship.addEventListener('click', shipClick);
        })
    }

    const boardListeners = () => {
        const allCells = document.querySelectorAll('.active .board .cell');
        allCells.forEach(cell => {
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragleave', dragLeave);
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('drop', dragDrop);
        })
    }

    const displayShips = () => {
        const shipsContainer = document.querySelector('.active .ship-container');
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

    const getRandomCoordinates = () => {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        return [row, col];
    }

    const getRandomDirection = () => {
        const randomNumber = Math.floor(Math.random() * 2);

        return randomNumber === 0 ? "row" : "col";
    }

    const changeDirection = (ship) => {
        const direction = getRandomDirection();
        if (direction === "col") {
            ship.style.gridAutoFlow = "row";
            ship.dataset.direction = "col";
        }
    }

    const placeRandomly = () => {
        resetBoard();
        const allShips = document.querySelectorAll('.active .ship-container .ship');
        allShips.forEach(ship => {
            changeDirection(ship);
            let [row, col] = getRandomCoordinates();
            while (!isValidPosition(ship, [row, col])) [row, col] = getRandomCoordinates();
            ship.style.position = "absolute";
            ship.dataset.row = row;
            ship.dataset.col = col;
            const cell = document.querySelector(`.active .cell[data-row="${row}"][data-col="${col}"]`);
            cell.append(ship);
        })
    }

    const placeComputerShips = () => {
        const playerOne = document.querySelector('.player-one-container');
        const playerTwo = document.querySelector('.player-two-container');

        playerOne.classList.toggle('active')
        playerTwo.classList.toggle('active');
        placeRandomly()
    }

    const checkShipsPlaced = () => {
        const allShips = document.querySelectorAll('.active .cell .ship');
        return allShips.length >= 5;
    }

    const changePlayerDisplay = () => {
        const playerOne = document.querySelector('.player-one-container');
        const playerTwo = document.querySelector('.player-two-container');
        const nextPlayerButton = document.querySelector('button.next-player');
        const startGame = document.querySelector('button.start-game');

        playerOne.classList.toggle('active');
        playerOne.classList.toggle('inactive');
        playerTwo.classList.toggle('active');
        playerTwo.classList.toggle('inactive');
        nextPlayerButton.classList.toggle('inactive');
        startGame.classList.toggle('inactive')
    }

    const nextPlayerPlacement = () => {
        changePlayerDisplay()
        displayShips();
    }

    const changePlayer = () => {
        const activePlayer = document.querySelector('.player.active');
        const inactivePlayer = document.querySelector('.player.inactive');

        activePlayer.classList.toggle('active')
        activePlayer.classList.toggle('inactive')
        inactivePlayer.classList.toggle('active')
        inactivePlayer.classList.toggle('inactive')
    }

    const displayBothBoards = () => {
        const playerOne = document.querySelector('.player-one-container')
        const playerTwo = document.querySelector('.player-two-container')
        const shipContainers = document.querySelectorAll('.ship-container');
        playerTwo.classList.toggle('inactive');
        shipContainers.forEach(container => container.classList.toggle('inactive'));
    }

    const loadGame = () => {
        const gameModeContainer = document.querySelector('.game-mode-container');
        const gameContainer = document.querySelector('.game-container');
        const playerOne = document.querySelector('.player-one-container');
        const controllerContainer = document.querySelector('.controller-container');

        gameModeContainer.classList.toggle('inactive');
        gameContainer.classList.toggle('inactive');
        playerOne.classList.toggle('inactive');
        playerOne.classList.toggle('active');
        controllerContainer.classList.toggle('inactive')
    }

    const loadVsPlayer = () => {
        loadGame()
        const startButton = document.querySelector('button.start-game')
        startButton.classList.toggle('inactive')
    }

    const loadVsComputer = () => {
        loadGame()
        const nextPlayerButton = document.querySelector('button.next-player')
        nextPlayerButton.classList.toggle('inactive')
    }

    const removeCells = () => {
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach(cell => cell.remove());
    }   

    const vsPlayerDisplayBothBoards = () => {
        const activePlayer = document.querySelector('.player.active');
        const inactivePlayer = document.querySelector('.player.inactive');

        activePlayer.classList.toggle('active')
        inactivePlayer.classList.toggle('inactive')
    }

    const resetGame = () => {
        const gameModeContainer = document.querySelector('.game-mode-container')
        const gameContainer = document.querySelector('.game-container')
        const allShipContainer = document.querySelectorAll('.ship-container')
        const allPlayerContainer = document.querySelectorAll('.player')
        const nextPlayerButton = document.querySelector('button.next-player')
        const winnerContainer = document.querySelector('.winner-container')

        gameModeContainer.classList.toggle('inactive')
        gameContainer.classList.toggle('inactive')
        allShipContainer.forEach(container => container.classList.toggle('inactive'))
        allPlayerContainer.forEach(container => container.classList.toggle('inactive'))
        nextPlayerButton.classList.toggle('inactive')
        winnerContainer.classList.toggle('inactive')

        removeCells()
    }

    const displayWinner = (playerName) => {
        const winnerContainer = document.querySelector('.winner-container')
        winnerContainer.classList.toggle('inactive')
        
        const winnerMessage = document.querySelector('.winner-message')
        winnerMessage.textContent = `${playerName} wins!`
    }

    return {
        loadVsPlayer,
        loadVsComputer,
        displayBoards,
        displayShips,
        resetBoard,
        placeRandomly,
        changePlayer,
        checkShipsPlaced,
        getShipCoordinates,
        nextPlayerPlacement,
        displayWinner,
        resetGame,
        displayBothBoards,
        placeComputerShips,
        vsPlayerDisplayBothBoards
    }
}

export default DOM;