// GROUP DIRECTIONS
export const checkVertical = (column, row) => {
    let counter = 1;
    if (row <= 2) { // Bottom
        counter += Directions.checkBottom(column, row);
    }
    return (counter >= 4);
};

export const checkHorizontal = (column, row) => {
    let counter = 1;
    if (column >= 3) { // Left
        counter += Directions.checkLeft(column, row);
    }
    if (column <= 3 && counter < 4) { // Right
        counter += Directions.checkRight(column, row);
    }
    return (counter >= 4);
};

// INDIVIDUAL DIRECTIONS
function checkBottom(column, row){
    let counter = 1, flag = true;
    while (counter < 4 && flag) {
        if (GRID_DATA[column][row+counter] === CURRENT_PLAYER) {
            counter++;
        } else {
            flag = false;
        }
    }
    return counter-1;
}

function checkLeft(column, row){
    let counter = 1, flag = true;
    while (counter < 4 && flag) {
        if (GRID_DATA[column-counter][row] === CURRENT_PLAYER) {
            counter++;
        } else {
            flag = false;
        }
    }
    return counter-1;
}

function checkRight(column, row){
    let counter = 1, flag = true;
    while (counter < 4 && flag) {
        if (GRID_DATA[column+counter][row] === CURRENT_PLAYER) {
            counter++;
        } else {
            flag = false;
        }
    }
    return counter-1;
}
