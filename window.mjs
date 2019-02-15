import {getColors, compare} from './game.mjs';

export function writeTurns(dom, history, turns) {
  dom.getElementById("turns").innerHTML = '';
  for(let i=1; i <= turns; i++) {
    let content = '';
    if(history[i]) {
      for(let u=0; u<history[i].colors.length; u++) {
        content += '<div class="'+ history[i].colors[u] +'"></div> ';
      }
      if(history[i].correct > 0) content += ' - '+ history[i].correct +' bien placés';
    }
    dom.getElementById("turns").innerHTML += '<p><div class="turn">' + i + ' - </div>' + content + '</p>';
  }
  return dom;
}

export function writeSlots(dom, slots, colors) {
  dom.getElementById("slots").innerHTML = '';
  for(let i=1; i<=slots; i++) {
    let content = '';
    for(let u=0; u<colors; u++) {
      content += '<option>' + getColors()[u];
    }
    dom.getElementById("slots").innerHTML += '<select id="' + i + '">' +  content + '</select>';
  }
  return dom;
}

export function play(document, state, submit, result, turns) {
  state.history[state.turn] = {
    colors : submit,
    correct : compare(submit, result)
  };
  state.turn++;
  writeTurns(document, state.history, turns);
  return state;
}