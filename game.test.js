require = require('@std/esm')(module);
const game = require('./game.mjs');

describe("Color selector", function() {
  test('should return a randomized array of colors', () => {
    let colors = 1;
    expect(game.selectColors(colors, 3)).toEqual([game.RED,game.RED,game.RED]);
  });
  test('should pick a color among the ones listed', () => {
    let colors = 3;
    let result = game.selectColors(colors, 1);
    expect(result[0] === game.RED || result[0] === game.BLUE || result[0] === game.GREEN).toBeTruthy();
  });
});

describe("Comparator", function() { 
  test('should return 0 if none is right', () => {
    let selection = [game.RED,game.BLUE,game.RED];
    let result = [game.BLUE,game.GREEN,game.BLUE];
    expect(game.compare(selection, result)).toEqual(0);
  });
  test('should return 1 if one is right', () => {
    let selection = [game.RED,game.BLUE,game.RED];
    let result = [game.BLUE,game.GREEN,game.RED];
    expect(game.compare(selection, result)).toEqual(1);
  });
  test('should return the right number', () => {
    let selection = [game.RED,game.RED,game.BLUE,game.GREEN,game.RED];
    let result = [game.GREEN,game.RED,game.BLUE,game.GREEN,game.BLUE];
    expect(game.compare(selection, result)).toEqual(3);
  });
});

describe("Referee", function() { 
  test('should return false if the player didn\'t win', () => {
    let selection = [game.RED,game.BLUE,game.RED];
    let result = [game.BLUE,game.BLUE,game.BLUE];
    expect(game.hasWon(selection, result)).toEqual(false);
  });
  test('should return true if the player won', () => {
    let selection = [game.BLUE,game.BLUE,game.BLUE];
    let result = [game.BLUE,game.BLUE,game.BLUE];
    expect(game.hasWon(selection, result)).toEqual(true);
  });
});

describe("Last turn checker", function() { 
  test('should return false if it isn\'t the last turn', () => {
    let current = 5;
    let limit = 10;
    expect(game.isLastTurn(current, limit)).toEqual(false);
  });
  test('should return true if it\'s the last turn', () => {
    let current = 10;
    let limit = 10;
    expect(game.isLastTurn(current, limit)).toEqual(true);
  });
});