// import { checkVertical } from './checkDirections';
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
        const column = boxNum % 7;
        const nextFreeBox = getNextFreeBox(column);
        const row = Math.floor(nextFreeBox/7);

        if (nextFreeBox === -1) {
            console.log('Column is full!')
        } else {
            GRID_DATA[column][row] = CURRENT_PLAYER;

            const box = document.getElementById(`box_${nextFreeBox}`);
            if(CURRENT_PLAYER === 1) box.classList.add('yellow');
            if(CURRENT_PLAYER === 2) box.classList.add('red');

            const hasWon = checkForWinner(column, row);
            if (hasWon) console.log(CURRENT_PLAYER + ' has WON!');
            changeTurn();
        }
    });
})


/*
 * INSERTING CHIP PROCEDURE
 */

function getNextFreeBox(column){
    const lastBoxInColumn = 5;
    for (let row = lastBoxInColumn; row >= 0; row--) {
        const boxStatus = GRID_DATA[column][row];
        if (boxStatus === 0) {
            return (row * 7) + column;;
        }
    }
    return -1;
}

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
    let hasPlayerWon = false;
    if (!hasPlayerWon) hasPlayerWon = checkVertical(column);
    if (!hasPlayerWon) hasPlayerWon = checkHorizontal(row);
    if (!hasPlayerWon) hasPlayerWon = checkDiagonalTLtoBR(column, row);
    if (!hasPlayerWon) hasPlayerWon = checkDiagonalTRtoBL(column, row);
    return hasPlayerWon;
}

function checkVertical(column) {
    let counter = 0, currentRow = 0;

    while (counter < 4 && currentRow < GRID_ROWS) {
        if (GRID_DATA[column][currentRow] === CURRENT_PLAYER) {
            counter++;
        } else {
            counter = 0;
        }
        currentRow++;
    }

    return (counter >= 4);
};

function checkHorizontal(row) {
    let counter = 0, currentColumn = 0;

    while (counter < 4 && currentColumn < GRID_COLUMNS) {
        if (GRID_DATA[currentColumn][row] === CURRENT_PLAYER) {
            counter++;
        } else {
            counter = 0;
        }
        currentColumn++;
    }

    return (counter >= 4);
};

function checkDiagonalTLtoBR(column, row) {
    let counter = 0;
    let currentColumn = column > row ? column - row : 0;
    let currentRow = row > column ? row - column : 0;

    while (counter < 4 && currentColumn < GRID_COLUMNS && currentRow < GRID_ROWS) {
        if (GRID_DATA[currentColumn][currentRow] === CURRENT_PLAYER) {
            counter++;
        } else {
            counter = 0;
        }
        currentColumn++;
        currentRow++;
    }
    
    return (counter >= 4);
};

function checkDiagonalTRtoBL(column, row) {
    let counter = 0;
    let flippedColumn = (GRID_COLUMNS - 1) - column;
    let currentColumn = flippedColumn > row ? row + column : 6;
    let currentRow = row > flippedColumn ? row - flippedColumn: 0;

    while (counter < 4 && currentColumn > 0 && currentRow < GRID_ROWS) {
        if (GRID_DATA[currentColumn][currentRow] === CURRENT_PLAYER) {
            counter++;
        } else {
            counter = 0;
        }
        currentColumn--;
        currentRow++;
    }
    
    return (counter >= 4);
};
