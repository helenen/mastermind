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

export function selectColors(colors, slots) {
    let colorSelection = [];
    for(let i=0; i<slots; i++) {
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
    return current === limit;
}

export function hasWon(selection, result) {
    return compare(selection, result) === selection.length;
}

export function deepCompare(selection, result) {
    let count = 0;
    let slot;
    let resultCopy = [...result];
    for(let i=0; i<selection.length; i++) {
        if(selection[i] != result[i]) {
            slot = -1;
            for(let u=0; u<result.length; u++) {
                if(selection[i] === resultCopy[u] && selection[u] != resultCopy[u]) slot = u;
            }
            if(slot != -1) {
                count++;
                resultCopy[slot] = null;
            }
        }
    }
    return count;
}