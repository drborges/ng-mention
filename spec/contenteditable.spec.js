'use strict'

describe("contenteditable", function () {
  var element, $scope;

  beforeEach(module('drborges.contenteditable'));

  describe("two-way data binding", function () {
    beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope.$new();
      element = $compile('<div contenteditable ng-model="posts">Initial data</div')($scope);
    }));

    it ("model is initialized with element's initial content", function () {
      expect($scope.posts).to.equal("Initial data");
    });

    it("model updates are reflected on the view", function () {
      $scope.$apply(function () {
        $scope.posts = "model update";
      });

      expect(element[0].innerText).to.equal("model update");
    });

    it("view updates are reflected on the model", function () {
      element[0].innerText = "view update";
      element.triggerHandler("input");

      expect($scope.posts).to.equal("view update");
    });
  });
});