import { selectColors, isLastTurn, hasWon } from './game.mjs';
import {
  writeTurns,
  writeSlots,
  play,
  end
} from './window.mjs';


let state = {
  turn: 1,
  history: {}
};
let [turns, slots, colors, result, submit, hasEnded] = [0, 0, 0, [], [], false];

document.getElementById('playButton').addEventListener('click', () => {
  for (let i = 1; i <= slots; i++) {
    let element = document.getElementById(i);
    submit.push(element.options[element.selectedIndex].text);
  }
  if (isLastTurn(state.turn, parseInt(turns, 10))) {
    document.getElementById('outcome').innerHTML = '<h1>You lost...</h1>';
    end(document, slots, result);
    hasEnded = true;
  }
  play(document, state, submit, result, turns);
  if (hasWon(submit, result)) {
    document.getElementById('outcome').innerHTML = '<h1>You won !</h1>';
    if (!hasEnded) end(document, slots, result);
  }
  submit = [];
});

let anticheat = window.setInterval(() => {
  let [selectedTurns, selectedSlots, selectedColors] = [document.getElementById('turnsSetup').value,
    document.getElementById('slotsSetup').value,
    document.getElementById('colorsSetup').value];
  if (selectedTurns >= 1
         && selectedTurns <= 20
         && selectedSlots >= 3
         && selectedSlots <= 10
         && selectedColors >= 3
         && selectedColors <= 10) {
    document.getElementById('submitSetup').removeAttribute('disabled');
  } else {
    document.getElementById('submitSetup').setAttribute('disabled', true);
  }
}, 100);

document.getElementById('submitSetup').addEventListener('click', () => {
  [turns, slots, colors] = [document.getElementById('turnsSetup').value,
    document.getElementById('slotsSetup').value,
    document.getElementById('colorsSetup').value];
  result = selectColors(colors, slots);
  writeTurns(document, state.history, turns);
  writeSlots(document, slots, colors);
  document.getElementById('setup').setAttribute('hidden', true);
  document.getElementById('main').removeAttribute('hidden');
  window.clearInterval(anticheat);
});
