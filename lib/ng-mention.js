angular.module('angular.ui', [])
  .directive('ngMention', function() {
    return {
      restrict: 'A',
      require: 'ngModel',

      link: function(scope, element, attrs, ngModelCtrl) {
        if (!ngModelCtrl) return;

        // model -> view
        ngModelCtrl.$render = function() {
          element.html(ngModelCtrl.$viewValue || '');
        };

        // view -> model
        element.on('input', function() {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element.html());
          });
        });

        // view -> model (Initial value)
        ngModelCtrl.$setViewValue(element.html());
      }
    };
  });
