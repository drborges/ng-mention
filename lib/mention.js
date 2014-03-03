angular.module("drborges.mention", [])
  .directive("onMention", function () {
    return {
      scope: {
        onMention: '&',
      },
      require: 'onMention',
      controller: function () {
        this.extractMention = function (text, cursorPosition) {
          var mentionStartPosition = text.substring(0, cursorPosition).lastIndexOf("@") + 1;
          var mentionEndPosition = text.substring(mentionStartPosition).search(/[^\w]/) + mentionStartPosition;
          var mentionEndPosition = mentionStartPosition > mentionEndPosition ? text.length : mentionEndPosition;
          var mentionDetected =
            cursorPosition >= mentionStartPosition &&
            cursorPosition <= mentionEndPosition &&
            mentionStartPosition > 0 &&
            mentionStartPosition < mentionEndPosition;

          return mentionDetected ? text.substring(mentionStartPosition, mentionEndPosition) : "";
        }
      },
      link: function (scope, element, attrs, controller) {
        var lastMention = "";

        element.on('keyup', function () {
          var text = element.val();
          var cursorPosition = element[0].selectionStart;
          var mention = controller.extractMention(text, cursorPosition);
          var newMentionDetected = mention && mention !== lastMention;

          if (newMentionDetected) {
            scope.onMention({ mention: mention });
            lastMention = mention;
          }
        });
      }
    };
  });
