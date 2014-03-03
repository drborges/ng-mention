define(function () {
  var api = {};

  api.range = function (start, end) {
    var range = [];
    for (var i = start; i < end; i++) {
      range.push(i);
    }
    return range;
  };

  api.sendKeys = function (element, keys) {
    keys.split('').forEach(function (key) {
      var currentText = element.val();
      element.val(currentText.concat(key));
      element.trigger('keyup');
    });
  };

  // TODO: return chainable constructor objects to reduce complexity below
  api.whenExtractingMentionWith = function (controller) {
    return {
      from: function (text) {
        return {
          withCursorMovingAlongIndexRange: function (start, end) {
            return {
              expectMentionToBe: function (expectedValue) {
                api.range(start, end).forEach(function (cursorPosition) {
                  var mention = controller.extractMention(text, cursorPosition);
                  expect(mention).to.equal(expectedValue);
                });
              }
            };
          }
        };
      }
    };
  };

  api.forEveryPossibleMentionDelimiter = function (callback) {
    ['.', ',', '!', '?', '@', '"', ';', ':', "'", '(', ')'].forEach(function (mentionDelimiter) {
      callback(mentionDelimiter);
    });
  };

  return api;
});