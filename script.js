// CONFIG
const GRID_COLUMNS = 7;
const GRID_ROWS = 6;
const GRID_DATA = []; // 0 = Empty, 1 = Player one, 2 = Player two

// ELEMENTS SELECTORS
const $CONTAINER = document.querySelector(".container");
const $BOXES_WRAPPER = document.querySelector(".boxes_wrapper");
const $POINTER = document.querySelector(".pointer");

const POINTER_POSITIONS = [15, 105, 195, 285, 375, 465, 555, 645];
var POINTER_CURRENT_POSITION = 0;
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
        $POINTER.style.backgroundColor = "#d73c2c";
    } else {
        box.classList.add('red');
        CURRENT_PLAYER = 1;
        $POINTER.style.backgroundColor = "#f1c40f";
    }
}

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