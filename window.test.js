const jsdom = require('jsdom');
const std = require('@std/esm')(module);
const { JSDOM } = jsdom;
const window = std('./window.mjs');
const game = std('./game.mjs');

describe('Turn writer', function () {
  test('should return a list of turns', () => {
    let history = {};
    let dom = JSDOM.fragment('<div id="turns"></div>');
    let expected = JSDOM.fragment('<div id="turns">'
          + '<p><div class="turn">1 - </div></p>'
          + '<p><div class="turn">2 - </div></p>'
          + '<p><div class="turn">3 - </div></p>'
          + '<p><div class="turn">4 - </div></p>'
          + '<p><div class="turn">5 - </div></p>'
          + '<p><div class="turn">6 - </div></p>'
          + '<p><div class="turn">7 - </div></p>'
          + '<p><div class="turn">8 - </div></p>'
          + '<p><div class="turn">9 - </div></p>'
          + '<p><div class="turn">10 - </div></p>'
        + '</div>');
    expect(window.writeTurns(dom, history, 10)).toEqual(expected);
  });
  test('should return as many turns as needed', () => {
    let history = {};
    let dom = JSDOM.fragment('<div id="turns"></div>');
    let expected = JSDOM.fragment('<div id="turns">'
          + '<p><div class="turn">1 - </div></p>'
          + '<p><div class="turn">2 - </div></p>'
          + '<p><div class="turn">3 - </div></p>'
          + '<p><div class="turn">4 - </div></p>'
          + '<p><div class="turn">5 - </div></p>'
        + '</div>');
    expect(window.writeTurns(dom, history, 5)).toEqual(expected);
  });
  test('should write all the info needed', () => {
    let history = {
      1: {
        colors: [game.RED, game.RED, game.GREEN, game.BLUE, game.BLUE],
        correct: 3
      }
    };
    let dom = JSDOM.fragment('<div id="turns"></div>');
    let expected = JSDOM.fragment('<div id="turns">'
          + '<p><div class="turn">1 - </div>'
            + '<div class="slot" style="background-color: red"></div> '
            + '<div class="slot" style="background-color: red"></div> '
            + '<div class="slot" style="background-color: green"></div> '
            + '<div class="slot" style="background-color: blue"></div> '
            + '<div class="slot" style="background-color: blue"></div> '
          + ' - 3 bien placés</p>'
          + '<p><div class="turn">2 - </div></p>'
          + '<p><div class="turn">3 - </div></p>'
          + '<p><div class="turn">4 - </div></p>'
          + '<p><div class="turn">5 - </div></p>'
          + '<p><div class="turn">6 - </div></p>'
          + '<p><div class="turn">7 - </div></p>'
          + '<p><div class="turn">8 - </div></p>'
        + '</div>');
    expect(window.writeTurns(dom, history, 8)).toEqual(expected);
  });
  test('should write how many are in the wrong slot', () => {
    let history = {
      1: {
        colors: [game.RED, game.RED, game.GREEN, game.BLUE, game.BLUE],
        correct: 0,
        wrongSlot: 2
      },
      2: {
        colors: [game.BLUE, game.BLUE, game.GREEN, game.BLUE, game.BLUE],
        correct: 2,
        wrongSlot: 2
      }
    };
    let dom = JSDOM.fragment('<div id="turns"></div>');
    let expected = JSDOM.fragment('<div id="turns">'
          + '<p><div class="turn">1 - </div>'
            + '<div class="slot" style="background-color: red"></div> '
            + '<div class="slot" style="background-color: red"></div> '
            + '<div class="slot" style="background-color: green"></div> '
            + '<div class="slot" style="background-color: blue"></div> '
            + '<div class="slot" style="background-color: blue"></div> '
          + ' - 2 bons mais mal placés</p>'
          + '<p><div class="turn">2 - </div>'
            + '<div class="slot" style="background-color: blue"></div> '
            + '<div class="slot" style="background-color: blue"></div> '
            + '<div class="slot" style="background-color: green"></div> '
            + '<div class="slot" style="background-color: blue"></div> '
            + '<div class="slot" style="background-color: blue"></div> '
          + ' - 2 bien placés - 2 bons mais mal placés</p>'
          + '<p><div class="turn">3 - </div></p>'
          + '<p><div class="turn">4 - </div></p>'
          + '<p><div class="turn">5 - </div></p>'
        + '</div>');
    expect(window.writeTurns(dom, history, 5)).toEqual(expected);
  });
});

describe('Slots writer', function () {
  test('should return a list of slots', () => {
    let dom = JSDOM.fragment('<div id="slots"></div>');
    let expected = JSDOM.fragment('<div id="slots">'
        + '<select id="1">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
        + '<select id="2">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
        + '<select id="3">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
        + '<select id="4">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
        + '<select id="5">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
      + '</div>');
    expect(window.writeSlots(dom, 5, 3)).toEqual(expected);
  });
  test('should return a list of the right size', () => {
    let dom = JSDOM.fragment('<div id="slots"></div>');
    let expected = JSDOM.fragment('<div id="slots">'
        + '<select id="1">'
          + '<option>red'
          + '<option>blue'
        + '</select>'
        + '<select id="2">'
          + '<option>red'
          + '<option>blue'
        + '</select>'
        + '<select id="3">'
          + '<option>red'
          + '<option>blue'
        + '</select>'
      + '</div>');
    expect(window.writeSlots(dom, 3, 2)).toEqual(expected);
  });
});

describe('Play function', function () {
  let state = {
    turn: 1,
    history: {}
  };
  let submit = [
    game.RED,
    game.BLUE,
    game.GREEN,
    game.BLUE,
    game.RED
  ];
  let result = [
    game.GREEN,
    game.GREEN,
    game.GREEN,
    game.GREEN,
    game.GREEN
  ];
  let document = JSDOM.fragment('<div id="turns"></div>');
  test('should increase the turn count', () => {
    expect(window.play(document, state, submit, result).turn).toEqual(2);
  });
  test('should write each attempt in the history', () => {
    expect(window.play(document, state, submit, result).history[2].colors).toEqual([game.RED, game.BLUE, game.GREEN, game.BLUE, game.RED]);
  });
  test('should write the number of correct slots for each attempt', () => {
    expect(window.play(document, state, submit, result).history[3].correct).toEqual(1);
  });
  test('should write the number of slots in the wrong place for each attempt', () => {
    result[1] = game.RED;
    expect(window.play(document, state, submit, result).history[4].wrongSlot).toEqual(1);
  });
});

describe('Game ender', function () {
  test('should end the game', () => {
    let dom = JSDOM.fragment('<div id="result"></div>'
      + '<div id="slots">'
        + '<select id="1">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
        + '<select id="2">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
        + '<select id="3">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
        + '<select id="4">'
          + '<option>red'
          + '<option>blue'
          + '<option>green'
        + '</select>'
      + '</div>'
      +'<button id="playButton">Jouer</button>');
    let expected = JSDOM.fragment('<div id="result"><b>Result : </b>'
    + '<div class="slot" style="background-color: red"></div> '
    + '<div class="slot" style="background-color: blue"></div> '
    + '<div class="slot" style="background-color: red"></div> '
    + '<div class="slot" style="background-color: green"></div> '
  + '</div>'
  + '<div id="slots">'
    + '<select id="1" disabled="true">'
      + '<option>red'
      + '<option>blue'
      + '<option>green'
    + '</select>'
    + '<select id="2" disabled="true">'
      + '<option>red'
      + '<option>blue'
      + '<option>green'
    + '</select>'
    + '<select id="3" disabled="true">'
      + '<option>red'
      + '<option>blue'
      + '<option>green'
    + '</select>'
    + '<select id="4" disabled="true">'
      + '<option>red'
      + '<option>blue'
      + '<option>green'
    + '</select>'
  + '</div>'
  +'<button id="playButton" disabled="true">Jouer</button>');
    expect(window.end(dom, 4, ['red','blue','red','green'])).toEqual(expected);
  });
});