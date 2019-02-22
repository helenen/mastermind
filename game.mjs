export const RED = 'red';
export const BLUE = 'blue';
export const GREEN = 'green';
export const PURPLE = 'purple';
export const YELLOW = 'yellow';
export const ORANGE = 'orange';
export const BROWN = 'brown';
export const GREY = 'grey';
export const DARKBLUE = 'darkblue';
export const DARKRED = 'darkred';

export function getColors() {
  return [
    RED,
    BLUE,
    GREEN,
    PURPLE,
    YELLOW,
    ORANGE,
    BROWN,
    GREY,
    DARKBLUE,
    DARKRED
  ];
}

export function selectColors(colors, slots) {
  let colorSelection = [];
  for (let i = 0; i < slots; i++) {
    colorSelection.push(getColors()[Math.floor(Math.random() * colors)]);
  }
  return colorSelection;
}

export function compare(selection, result) {
  let count = 0;
  for (let i = 0; i < selection.length; i++) {
    if (selection[i] === result[i]) count += 1;
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
  for (let i = 0; i < selection.length; i++) {
    if (selection[i] !== result[i]) {
      slot = -1;
      for (let u = 0; u < result.length; u++) {
        if (selection[i] === resultCopy[u] && selection[u] !== resultCopy[u]) slot = u;
      }
      if (slot !== -1) {
        count += 1;
        resultCopy[slot] = null;
      }
    }
  }
  return count;
}
