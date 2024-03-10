import DOM from "./DOM.js"

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
DOM().displayBoards()
DOM().displayShipsPlayerOne()
DOM().resetButton()