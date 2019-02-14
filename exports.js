export const RED = 'red';
export const BLUE = 'blue';
export const GREEN = 'green';

export function getColors() {
    return [
        RED,
        BLUE,
        GREEN
    ];
}

export function selectColors(colors, size) {
    let colorSelection = [];
    for(let i=0; i<size; i++) {
        colorSelection.push(getColors()[Math.floor(Math.random() * colors)]);
    }
    return colorSelection;
}

export function compare(selection, result) {
    let count = 0;
    for(let i=0; i<selection.length; i++) {
        if(selection[i] === result[i]) count++;
    }
    return count;
}

export function isLastTurn(current, limit) {
    if(current === limit) return true;
    return false;
}

export function hasWon(selection, result) {
    if(this.compare(selection, result) === selection.length) return true;
    return false;
}