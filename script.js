// CONFIG
const GRID_COLUMNS = 7;
const GRID_ROWS = 6;
const GRID_DATA = []; // 0 = Empty, 1 = Player one, 2 = Player two

// ELEMENTS SELECTORS
const $CONTAINER = document.querySelector(".container");
const $BOXES_WRAPPER = document.querySelector(".boxes_wrapper");
const $POINTER = document.querySelector(".pointer");

const POINTER_POSITIONS = ['15px', '105px', '195px', '285px', '375px', '465px', '555px', '645px'];
var CURRENT_PLAYER = 1;

// INITIALISING
(function initialiseGridData() {
    for (let col = 0; col < GRID_COLUMNS; col++) {
        GRID_DATA[col] = [0, 0, 0, 0, 0, 0, 0];
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


// EVENT LISTENER
$BOXES.forEach(box => {
    box.addEventListener("mouseover", function() {
        const boxNum = this.id.substr(4);
        const column = boxNum % 7;
        $POINTER.style.left = POINTER_POSITIONS[column];
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

function insertChipProcedure(column) {
    const lastBoxInColumn = 5;

    for (let row = lastBoxInColumn; row >= 0; row--) {
        const boxStatus = GRID_DATA[column][row];
        if (boxStatus === 0) {
            GRID_DATA[column][row] = CURRENT_PLAYER;

            const index = (row * 7) + column;
            const box = document.getElementById(`box_${index}`);
            insertChip(box);
            return;
        }
    }
    return -1;
};

function insertChip(box) {
    if(CURRENT_PLAYER === 1) {
        box.classList.add('yellow');
        CURRENT_PLAYER = 2;
    } else {
        box.classList.add('red');
        CURRENT_PLAYER = 1;
    }
}