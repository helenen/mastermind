import {RED, BLUE, GREEN, selectColors, compare, isLastTurn, hasWon} from './exports.js';

describe("Color selector", function() {
  test('should return a randomized array of colors', () => {
    let colors = [RED];
    expect(selectColors(colors, 3)).toEqual([RED,RED,RED]);
  });
  test('should pick a color among the ones listed', () => {
    let colors = [RED, BLUE, GREEN];
    let result = selectColors(colors, 1);
    expect(result[0] === RED || result[0] === BLUE || result[0] === GREEN).toBeTruthy();
  });
});

describe("Comparator", function() { 
  test('should return 0 if none is right', () => {
    let selection = [RED,BLUE,RED];
    let result = [BLUE,GREEN,BLUE];
    expect(compare(selection, result)).toEqual(0);
  });
  test('should return 1 if one is right', () => {
    let selection = [RED,BLUE,RED];
    let result = [BLUE,GREEN,RED];
    expect(compare(selection, result)).toEqual(1);
  });
  test('should return the right number', () => {
    let selection = [RED,RED,BLUE,GREEN,RED];
    let result = [GREEN,RED,BLUE,GREEN,BLUE];
    expect(compare(selection, result)).toEqual(3);
  });
});

describe("Referee", function() { 
  test('should return false if the player didn\'t win', () => {
    let selection = [RED,BLUE,RED];
    let result = [BLUE,BLUE,BLUE];
    expect(hasWon(selection, result)).toEqual(false);
  });
  test('should return true if the player won', () => {
    let selection = [BLUE,BLUE,BLUE];
    let result = [BLUE,BLUE,BLUE];
    expect(hasWon(selection, result)).toEqual(true);
  });
});

describe("Last turn checker", function() { 
  test('should return false if it isn\'t the last turn', () => {
    let current = 5;
    let limit = 10;
    expect(isLastTurn(current, limit)).toEqual(false);
  });
  test('should return true if it\'s the last turn', () => {
    let current = 10;
    let limit = 10;
    expect(isLastTurn(current, limit)).toEqual(true);
  });
});