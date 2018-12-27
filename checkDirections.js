export function checkBottom(column, row){
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

export function checkLeft(column, row){
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

export function checkRight(column, row){
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