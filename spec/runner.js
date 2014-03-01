/*
 * Due to the bootstrap mechanism of mocha and chai,
 * it is not possible to run strict here.
 */
require.config({
  baseUrl: '../',
  paths: {
    'angular': 'vendor/angular/angular',
    'angular-mocks': 'vendor/angular-mocks/angular-mocks',
    'contenteditable.spec': 'spec/contenteditable.spec',
    'contenteditable': 'lib/contenteditable'
  },
  shim: {
    'angular-mocks': ['angular'],
    'contenteditable': ['angular'],
    'contenteditable.spec': ['angular-mocks', 'contenteditable']
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});


require(['vendor/chai/chai', 'vendor/mocha/mocha'], function (chai) {

  expect = chai.expect;
  mocha.setup('bdd');

  require(['contenteditable.spec'], function() {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
