'use strict'

define(function () {

  describe("mention", function () {
    var element, $scope;

    function sendKeys(element, keys) {
      keys.split('').forEach(function (key) {
        var currentText = element.val();
        element.val(currentText.concat(key));
        element.trigger('keyup');
      });
    }

    function whenExtractingMentionWith(controller) {
      return {
        from: function (text) {
          return {
            withCursorMovingAlongIndexRange: function (start, end) {
              var i, range = [];
              for (i = start; i < end; i++) {
                range.push(i);
              }
              return {
                expectMentionToBe: function (expectedValue) {
                  range.forEach(function (cursorPosition) {
                    var mention = controller.extractMention(text, cursorPosition);
                    expect(mention).to.equal(expectedValue);
                  });
                }
              };
            }
          };
        }
      };
    }

    beforeEach(module('drborges.mention'));

    describe("onMention", function () {
      beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        element = $compile('<input on-mention="searchBy(mention)" />')($scope);
      }));

      describe("Event binding", function () {

        it("mention is triggered on keyup", function () {
          var actualMention;

          $scope.searchBy = function (mention) {
            actualMention = mention;
          };

          sendKeys(element, 'text @mention');

          expect(actualMention).to.equal('mention');
        });
      });

      describe("controller#extractMention", function () {
        var controller;

        beforeEach(function () {
          controller = element.controller('onMention');
        });

        describe("extracting mention when moving cursor throughout the text", function () {

          it("extracts mention from the beginning of a text", function () {
            var text = "@mention text";

            whenExtractingMentionWith(controller)
              .from(text)
              .withCursorMovingAlongIndexRange(1, 9)
              .expectMentionToBe("mention");
          });

          it("extracts mention from the middle of a text", function () {
            var text = "text @mention text";

            whenExtractingMentionWith(controller)
              .from(text)
              .withCursorMovingAlongIndexRange(6, 13)
              .expectMentionToBe("mention");
          });

          it("extracts mention from the end of a text", function () {
            var text = "text @mention";

            whenExtractingMentionWith(controller)
              .from(text)
              .withCursorMovingAlongIndexRange(6, 13)
              .expectMentionToBe("mention");
          });

          it("extracts sencond mention from text with multiple mentions", function () {
            var text = "@mention1 @mention2 text @mention3";

            whenExtractingMentionWith(controller)
              .from(text)
              .withCursorMovingAlongIndexRange(14, 20)
              .expectMentionToBe("mention2");
          });
        });

        describe("mention delimiter characters", function () {

          ['.', ',', '!', '?', '@', '"', ';', ':', "'", '(', ')'].forEach(function (mentionDelimiter) {
            it("extracts mention delimited by '@' and '" + mentionDelimiter + "'", function () {
              var text = "text @mention" + mentionDelimiter + " more text";

              whenExtractingMentionWith(controller)
                .from(text)
                .withCursorMovingAlongIndexRange(6, 13)
                .expectMentionToBe("mention");
            });
          });
        });
      });
    });

  });
});