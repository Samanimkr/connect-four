const GRID_COLUMNS = 7;
const GRID_ROWS = 6;
/*
 * 0 = Empty
 * 1 = Player one
 * 2 = Player two
 */
const GRID_DATA = [];
const CONTAINER = document.querySelector(".container");

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
    CONTAINER.innerHTML = boxesHtml;
})();
const BOXES = document.querySelectorAll('button');


// EVENT LISTENER
BOXES.forEach(box => {
    // box.addEventListener("mouseover", function() {
    //     const boxNum = this.id.substr(4);
    //     const column = boxNum % 7;
    //     this.classList.add('red');
    // }); ------------- PADDING * COLUMN NUMBER ------------------
    // box.addEventListener("mouseleave", function() {
    //     this.classList.remove('red');
    // });
    box.addEventListener("click", function() {
        const boxNum = this.id.substr(4);
        const currentColumn = boxNum % 7;
        insertChipInColumn(currentColumn);
        console.log(GRID_DATA)
    });
})

function insertChipInColumn(column) {
    const lastBoxInColumn = 5;
    console.log('lastBoxInColumn: ', lastBoxInColumn);

    for (let row = lastBoxInColumn; row >= 0; row--) {
        console.log('column: ', column);
        console.log('row: ', row);
        const boxStatus = GRID_DATA[column][row];
        if (boxStatus === 0) {
            GRID_DATA[column][row] = CURRENT_PLAYER;
            console.log('BOX: ', (column+1)*(row+1));
            const box = document.getElementById(`box_${(column+1)*(row+1)}`);
            insertChipColour(box);
            return true;
        }
    }
    return false;
};

function insertChipColour(box) {
    if(CURRENT_PLAYER === 1) {
        box.classList.add('yellow');
        CURRENT_PLAYER = 2;
    } else {
        box.classList.add('red');
        CURRENT_PLAYER = 1;
    }
}