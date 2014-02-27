/*
 * Due to the bootstrap mechanism of mocha and chai,
 * it is not possible to run strict here.
 */
require.config({
  baseUrl: '../',
  paths: {
    'angular-mocks': 'vendor/angular-mocks/angular-mocks',
  },
  shim: {
    'angular-mocks': ['vendor/angular/angular'],
    'spec/ng-mention-spec': ['angular-mocks']
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

require(['vendor/chai/chai', 'vendor/mocha/mocha'], function (chai) {

  expect = chai.expect;
  mocha.setup('bdd');

  require(['spec/ng-mention-spec'], function() {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
