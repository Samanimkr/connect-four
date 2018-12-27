import * as Directions from './checkDirections';

/*
 * CONFIG
 */
const GRID_COLUMNS = 7;
const GRID_ROWS = 6;
const GRID_DATA = []; // 0 = Empty, 1 = Player one, 2 = Player two


/*
 * ELEMENTS SELECTORS
 */
const $PLAYER_TURN = document.querySelector(".player_turn");
const $CONTAINER = document.querySelector(".container");
const $BOXES_WRAPPER = document.querySelector(".boxes_wrapper");
const $POINTER = document.querySelector(".pointer");

const POINTER_POSITIONS = [15, 105, 195, 285, 375, 465, 555, 645];
var POINTER_CURRENT_POSITION = 0;
var CURRENT_PLAYER = 1;


/*
 * INITIALISING
 */
(function initialiseGridData() {
    for (let col = 0; col < GRID_COLUMNS; col++) {
        GRID_DATA[col] = [0, 0, 0, 0, 0, 0];
    }
})();

(function createBoxes() {
    let boxesHtml = '';
    for (let i = 0; i < (GRID_COLUMNS*GRID_ROWS); i++) {
        boxesHtml += `<button class="box" id="box_${i}"></button>`;
    }
    $BOXES_WRAPPER.innerHTML = boxesHtml;
})();
const $BOXES = document.querySelectorAll('button');


/*
 * ANIMATIONS
 */
function movePointer(currentPos, finalPos) {
    var pos = currentPos;
    var id = setInterval(frame, 5);

    function frame() {
        if (pos == finalPos) {
            animationInProgess = false;
            clearInterval(id);
        } else {
            pos = pos < finalPos? pos+5 : pos-5; 
            $POINTER.style.left = pos + 'px'; 
        }
    }
}


/*
 * EVENT LISTENERS
 */
$BOXES.forEach(box => {
    box.addEventListener("mouseover", function() {
        const boxNum = this.id.substr(4);
        const column = boxNum % 7;

        const leftPos = getComputedStyle($POINTER).left;
        const current = parseInt(leftPos.substring(0, leftPos.length-2));
        const final = POINTER_POSITIONS[column];
        movePointer(current, final);

        POINTER_CURRENT_POSITION = column;
    });
    box.addEventListener("click", function() {
        const boxNum = this.id.substr(4);
        const currentColumn = boxNum % 7;
        const response = insertChipProcedure(currentColumn);
        if (response && response === -1) {
            console.log('Column is full!')
        }
    });
})


/*
 * INSERTING CHIP PROCEDURE
 */
function insertChipProcedure(column) {
    const lastBoxInColumn = 5;

    for (let row = lastBoxInColumn; row >= 0; row--) {
        const boxStatus = GRID_DATA[column][row];
        if (boxStatus === 0) {
            GRID_DATA[column][row] = CURRENT_PLAYER;

            const index = (row * 7) + column;
            const box = document.getElementById(`box_${index}`);
            if(CURRENT_PLAYER === 1) box.classList.add('yellow');
            if(CURRENT_PLAYER === 2) box.classList.add('red');

            checkForWinner(column, row);
            changeTurn();
            return;
        }
    }
    return -1;
};

function changeTurn() {
    if(CURRENT_PLAYER === 1) {
        CURRENT_PLAYER = 2;
        $PLAYER_TURN.innerHTML = 'Player 2';
        $PLAYER_TURN.style.backgroundColor = "#d73c2c";
        $POINTER.style.backgroundColor = "#d73c2c";
    } else {
        CURRENT_PLAYER = 1;
        $PLAYER_TURN.innerHTML = 'Player 1';
        $PLAYER_TURN.style.backgroundColor = "#f1c40f";
        $POINTER.style.backgroundColor = "#f1c40f";
    }
}

/*
 * WINNING PROCEDURE
 */
function checkForWinner(column, row) {
    let playerHasWon = false;
    if (!playerHasWon) playerHasWon = checkHorizontal(column, row);
    if (!playerHasWon) playerHasWon = checkVertical(column, row);

    // Diagonals
    // if (row >= 2 && column >= 3 && !playerHasWon) { // Top Left
    //     playerHasWon = checkTopLeft(column, row);
    // }
    // if (row <= 2 && column >= 3 && !playerHasWon) { // Bottom Left
    //     playerHasWon = checkBottomLeft(column, row);
    // }
    // if (row >= 2 && column <= 3 && !playerHasWon) { // Top Right
    //     playerHasWon = checkTopRight(column, row);
    // }
    // if (row <= 2 && column <= 3 && !playerHasWon) { // Bottom Right
    //     playerHasWon = checkBottomRight(column, row);
    // }
    if (playerHasWon) console.log(CURRENT_PLAYER + ' is the WINNER');
}

// GROUP DIRECTIONS
function checkVertical(column, row) {
    let counter = 1;
    if (row <= 2) { // Bottom
        counter += Directions.checkBottom(column, row);
    }
    return (counter >= 4);
};

function checkHorizontal(column, row) {
    let counter = 1;
    if (column >= 3) { // Left
        counter += Directions.checkLeft(column, row);
    }
    if (column <= 3 && counter < 4) { // Right
        counter += Directions.checkRight(column, row);
    }
    return (counter >= 4);
};
