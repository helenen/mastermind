const exp = require('./exports');

describe("Color selector", function() {
  test('should return a randomized array of colors', () => {
    let colors = [exp.RED];
    expect(exp.selectColors(colors, 3)).toEqual([exp.RED,exp.RED,exp.RED]);
  });
  test('should pick a color among the ones listed', () => {
    let colors = [exp.RED, exp.BLUE, exp.GREEN];
    let result = exp.selectColors(colors, 1);
    expect(result[0] === exp.RED || result[0] === exp.BLUE || result[0] === exp.GREEN).toBeTruthy();
  });
});

describe("Comparator", function() { 
  test('should return 0 if none is right', () => {
    let selection = [exp.RED,exp.BLUE,exp.RED];
    let result = [exp.BLUE,exp.GREEN,exp.BLUE];
    expect(exp.compare(selection, result)).toEqual(0);
  });
  test('should return 1 if one is right', () => {
    let selection = [exp.RED,exp.BLUE,exp.RED];
    let result = [exp.BLUE,exp.GREEN,exp.RED];
    expect(exp.compare(selection, result)).toEqual(1);
  });
  test('should return the right number', () => {
    let selection = [exp.RED,exp.RED,exp.BLUE,exp.GREEN,exp.RED];
    let result = [exp.GREEN,exp.RED,exp.BLUE,exp.GREEN,exp.BLUE];
    expect(exp.compare(selection, result)).toEqual(3);
  });
});

describe("Referee", function() { 
  test('should return false if the player didn\'t win', () => {
    let selection = [exp.RED,exp.BLUE,exp.RED];
    let result = [exp.BLUE,exp.BLUE,exp.BLUE];
    expect(exp.hasWon(selection, result)).toEqual(false);
  });
  test('should return true if the player won', () => {
    let selection = [exp.BLUE,exp.BLUE,exp.BLUE];
    let result = [exp.BLUE,exp.BLUE,exp.BLUE];
    expect(exp.hasWon(selection, result)).toEqual(true);
  });
});

describe("Last turn checker", function() { 
  test('should return false if it isn\'t the last turn', () => {
    let current = 5;
    let limit = 10;
    expect(exp.isLastTurn(current, limit)).toEqual(false);
  });
  test('should return true if it\'s the last turn', () => {
    let current = 10;
    let limit = 10;
    expect(exp.isLastTurn(current, limit)).toEqual(true);
  });
});