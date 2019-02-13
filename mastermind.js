const exp = require('./exports');
const colorCodes = {
  [exp.RED] : 'red',
  [exp.BLUE] : 'blue',
  [exp.GREEN] : 'green'
}

module.exports = {
  writeTurns : (dom, history, turns) => {
    for(i=1; i <= turns; i++) {
      let content = '';
      if(history[i]) {
        for(u=0; u<history[i].colors.length; u++) {
          content += '<span class="'+ colorCodes[history[i].colors[u]] +'"></span>';
        }
        if(history[i].correct > 0) content += ' - '+ history[i].correct +' bien placés';
      }
      dom.getElementById("turns").innerHTML += '<p>' + i + ' - ' + content + '</p>';
    }
    return dom;
  },
  writeSlots : (dom, slots, colors) => {
    for(i=1; i<=slots; i++) {
      let content = '';
      for(u=0; u<colors; u++) {
        content += '<option>' + colorCodes[exp.getColors()[u]];
      }
      dom.getElementById("slots").innerHTML += '<select id="' + i + '">' +  content + '</select>';
    }
    return dom;
  },
  play : (location, state, submit, result) => {
    state.history[state.turn] = {
      colors : submit,
      correct : exp.compare(submit, result)
    };
    state.turn++;
    location.reload();
    return state;
  }
}