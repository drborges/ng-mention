// two-way data binding example
angular.module('drborges.contenteditable', [])
  .directive('contenteditable', function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        if (!ngModelCtrl) return;

        // model -> view
        ngModelCtrl.$render = function() {
          element.text(ngModelCtrl.$viewValue || '');
        };

        // view -> model
        element.on('input', function() {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element.text());
          });
        });

        // view -> model (Initial value)
        ngModelCtrl.$setViewValue(element.text());
      }
    };
  });