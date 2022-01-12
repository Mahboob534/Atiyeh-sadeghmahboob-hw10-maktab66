let fill = document.querySelectorAll('.tile')
let warn = document.querySelector('.board')
let flag = true
const statusDisplay = document.querySelector('.game--status')

let gameActive = true
let currentPlayer = "X"

let gameState = ["", "", "", "", "", "", "", "", ""]

const winningMessage = () => `Player ${currentPlayer} has won!`
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.tile').forEach(cell => cell.addEventListener('click', handleCellClick))

function handleCellClick(clickedCellEvent) {

    const clickedCell = clickedCellEvent.target

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index'))
       
        
       if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCellIndex)
    handleResultValidation()
}
function handleCellPlayed(clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer
    if (flag) {
        fill[clickedCellIndex].classList.add("fill-x")
        flag = false;

    } else {
        fill[clickedCellIndex].classList.add("fill-o")
        flag = true;

    }

}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i]
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            const item = winCondition
            roundWon = true;
            fill[item[0]].classList.add('direction-win-color')
            fill[item[1]].classList.add('direction-win-color')
            fill[item[2]].classList.add('direction-win-color')
            break;
        }
    }
    if (roundWon) {
        currentPlayer === "X" ? warn.classList.add("winX") : warn.classList.add("winO")
        gameActive = false
        return;
    }
    let roundDraw = !gameState.includes("")
    if (roundDraw) {
        warn.classList.add("warning")
        gameActive = false
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    statusDisplay.innerHTML = currentPlayerTurn()
}

  document.querySelector('.game--restart ').addEventListener('click',handleRestartGame)

function handleRestartGame() {
     gameActive = true;
    flag = true
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML = currentPlayerTurn()
    document.querySelectorAll('.tile')
        .forEach(cell => {
            cell.classList.remove('fill-x')
            cell.classList.remove('fill-o')
            cell.classList.remove('direction-win-color')
        });
    document.querySelectorAll('.board')
        .forEach(cell => {

            cell.classList.remove('winO')
            cell.classList.remove('winX')
            cell.classList.remove('warning')
        })
    

} 