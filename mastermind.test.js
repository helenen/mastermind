const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import {writeTurns, writeSlots, play} from './mastermind.js';
import {RED, BLUE, GREEN} from './exports.js';

describe("Turn writer", function() {
    test('should return a list of turns', () => {
      let history = {};
      let dom = JSDOM.fragment('<div id="turns"></div>');
      let expected = JSDOM.fragment('<div id="turns">' +
          '<p>1 - </p>' +
          '<p>2 - </p>' +
          '<p>3 - </p>' +
          '<p>4 - </p>' +
          '<p>5 - </p>' +
          '<p>6 - </p>' +
          '<p>7 - </p>' +
          '<p>8 - </p>' +
          '<p>9 - </p>' +
          '<p>10 - </p>' +
        '</div>');
      expect(writeTurns(dom, history, 10)).toEqual(expected);
    });
    test('should return as many turns as needed', () => {
      let history = {};
      let dom = JSDOM.fragment('<div id="turns"></div>');
      let expected = JSDOM.fragment('<div id="turns">' +
          '<p>1 - </p>' +
          '<p>2 - </p>' +
          '<p>3 - </p>' +
          '<p>4 - </p>' +
          '<p>5 - </p>' +
        '</div>');
      expect(writeTurns(dom, history, 5)).toEqual(expected);
    });
    test('should write all the info needed', () => {
      let history = {
        1 : {
          colors : [RED, RED, GREEN, BLUE, BLUE],
          correct : 3
        }
      };
      let dom = JSDOM.fragment('<div id="turns"></div>');
      let expected = JSDOM.fragment('<div id="turns">' +
          '<p>1 - ' +
            '<span class="red"></span>' +
            '<span class="red"></span>' +
            '<span class="green"></span>' +
            '<span class="blue"></span>' +
            '<span class="blue"></span>' +
            ' - 3 bien placés</p>' +
          '<p>2 - </p>' +
          '<p>3 - </p>' +
          '<p>4 - </p>' +
          '<p>5 - </p>' +
          '<p>6 - </p>' +
          '<p>7 - </p>' +
          '<p>8 - </p>' +
        '</div>');
      expect(writeTurns(dom, history, 8)).toEqual(expected);
    });
});

describe("Slots writer", function() {
  test('should return a list of slots', () => {
    let dom = JSDOM.fragment('<div id="slots"></div>');
    let expected = JSDOM.fragment('<div id="slots">' +
        '<select id="1">' +
          '<option>red' +
          '<option>blue' +
          '<option>green' +
        '</select>' +
        '<select id="2">' +
          '<option>red' +
          '<option>blue' +
          '<option>green' +
        '</select>' +
        '<select id="3">' +
          '<option>red' +
          '<option>blue' +
          '<option>green' +
        '</select>' +
        '<select id="4">' +
          '<option>red' +
          '<option>blue' +
          '<option>green' +
        '</select>' +
        '<select id="5">' +
          '<option>red' +
          '<option>blue' +
          '<option>green' +
        '</select>' +
      '</div>');
    expect(writeSlots(dom, 5, 3)).toEqual(expected);
  });
  test('should return a list of the right size', () => {
    let dom = JSDOM.fragment('<div id="slots"></div>');
    let expected = JSDOM.fragment('<div id="slots">' +
        '<select id="1">' +
          '<option>red' +
          '<option>blue' +
        '</select>' +
        '<select id="2">' +
          '<option>red' +
          '<option>blue' +
        '</select>' +
        '<select id="3">' +
          '<option>red' +
          '<option>blue' +
        '</select>' +
      '</div>');
    expect(writeSlots(dom, 3, 2)).toEqual(expected);
  });
});

describe("Play function", function() {
  let state = {
    turn : 1,
    history : {}
  };
  let submit = [
    RED,
    BLUE,
    GREEN,
    BLUE,
    RED,
  ];
  let result = [
    GREEN,
    GREEN,
    GREEN,
    GREEN,
    GREEN,
  ];
  let location = {
    reload : () => {
      location.visited = true;
    },
    visited : false
  }
  test('should increase the turn count', () => {
    expect(play(location, state, submit, result).turn).toEqual(2);
  });
  test('should write each attempt in the history', () => {
    expect(play(location, state, submit, result).history[1].colors).toEqual([RED,BLUE,GREEN,BLUE,RED]);
  });
  test('should write the number of correct slots for each attempt', () => {
    expect(play(location, state, submit, result).history[1].correct).toEqual(1);
  });
  test('should refresh the page', () => {
    play(location, state, submit, result);
    expect(location.visited).toEqual(true);
  });
});