module.exports = {
    RED: Symbol.for('red'),
    BLUE: Symbol.for('blue'),
    GREEN: Symbol.for('green'),
    getColors: function() { 
        return [
            this.RED,
            this.BLUE,
            this.GREEN
        ];
    },
    selectColors: (colors, size) => {
        let colorSelection = [];
        for(let i=0; i<size; i++) {
            colorSelection.push(colors[Math.floor(Math.random() * colors.length)]);
        }
        return colorSelection;
    },
    compare: (selection, result) => {
        let count = 0;
        for(let i=0; i<selection.length; i++) {
            if(selection[i] === result[i]) count++;
        }
        return count;
    },
    isLastTurn: (current, limit) => {
        if(current === limit) return true;
        return false;
    },
    hasWon: function (selection, result) {
        if(this.compare(selection, result) === selection.length) return true;
        return false;
    }
};