import DOM from "./DOM.js"

const vsPlayer = () => {
    DOM().selectMode();
    DOM().displayBoards()
    DOM().displayShips()

    const nextPlayerButton = document.querySelector('button.next-player');
    nextPlayerButton.addEventListener('click', () => {
        DOM().
    })
}

const playGame = () => {
    document.addEventListener('click', event => {
        if (event.target.closest('.vs-CPU')) {
            console.log('cpu')
        } else if (event.target.closest('.vs-player')) {
            vsPlayer()
        }
    })
}

playGame()
