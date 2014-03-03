'use strict'

define(['fixtures'], function (fixtures) {
  var on = fixtures.on;
  var whenExtractingMentionWith = fixtures.whenExtractingMentionWith;
  var forEveryPossibleMentionDelimiter = fixtures.forEveryPossibleMentionDelimiter;

  describe("mention", function () {
    var element, $scope;

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

          on(element).sendKeys('text @mention');

          expect(actualMention).to.equal('mention');
        });

        it("callback is not called if mention is not detected", function () {
          $scope.searchBy = sinon.spy();

          on(element).sendKeys('text without mention');

          expect($scope.searchBy).to.have.not.been.called;
        });

        xit("detects mentions as the cursor moves throughout the text", function () {
          var actualMention;

          $scope.searchBy = function (mention) {
            actualMention = mention;
          };

          on(element)
            .text('text @mention1 @mention2 text')
            .moveCursorToPosition(0);

          expect(actualMention).to.be.undefined;

          on(element).moveCursorToPosition(14);

          expect(actualMention).to.equal("mention1");

          on(element).moveCursorToPosition(24);

          expect(actualMention).to.equal("mention2");
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
          forEveryPossibleMentionDelimiter(function (mentionDelimiter) {

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