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

export default DOM;