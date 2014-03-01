/*
 * Due to the bootstrap mechanism of mocha and chai,
 * it is not possible to run strict here.
 */
require.config({
  baseUrl: '../',
  paths: {
    'angular': 'vendor/angular/angular',
    'angular-mocks': 'vendor/angular-mocks/angular-mocks',
    'ng-mention-spec': 'spec/ng-mention-spec',
    'ng-mention': 'lib/ng-mention'
  },
  shim: {
    'angular-mocks': ['angular'],
    'ng-mention': ['angular'],
    'ng-mention-spec': ['angular-mocks', 'ng-mention']
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});


require(['vendor/chai/chai', 'vendor/mocha/mocha'], function (chai) {

  expect = chai.expect;
  mocha.setup('bdd');

  require(['ng-mention-spec'], function() {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
