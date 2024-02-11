import Gameboard from "./gameboardFactory.js"

class Player {
    constructor() {
        this.gameboard = new Gameboard();
    }

    getGameboard() {
        return this.gameboard;
    }

    attack(enemyBoard, coordinates) {
        return enemyBoard.receiveAttack(coordinates);
    }
}

const player1 = new Player();
const player2 = new Player();

player2.makeAttack = () => {
    let attackDone = false;

    while (!attackDone) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        try {
            
        }
    }
}

console.log(player2.makeAttack())