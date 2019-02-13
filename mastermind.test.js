const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Hello World", function() {
    test('should write hello world', () => {
      let dom = new JSDOM('<div id="test"></div>');
      let expected = new JSDOM('<div id="test">Hello World</div>');
      expect(test(dom)).toEqual(expected);
    });
});

function test(dom) {
    dom.getElementById('test') = "Hello World";
    return dom;
}