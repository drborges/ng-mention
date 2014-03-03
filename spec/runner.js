/*
 * Due to the bootstrap mechanism of mocha and chai,
 * it is not possible to run strict here.
 */
require.config({
  baseUrl: '../',
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'chai': 'vendor/chai/chai',
    'sinon': 'vendor/sinonjs/sinon',
    'sinon-chai': 'vendor/sinon-chai/lib/sinon-chai',
    'mocha': 'vendor/mocha/mocha',
    'angular': 'vendor/angular/angular',
    'angular-mocks': 'vendor/angular-mocks/angular-mocks',
    'fixtures': 'spec/fixtures',
    'contenteditable.spec': 'spec/contenteditable.spec',
    'contenteditable': 'lib/contenteditable',
    'mention.spec': 'spec/mention.spec',
    'mention': 'lib/mention'
  },
  shim: {
    'angular-mocks': ['angular'],
    'mention': ['angular'],
    'contenteditable': ['angular'],
    'mention.spec': ['angular-mocks', 'mention'],
    'contenteditable.spec': ['angular-mocks', 'contenteditable']
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});


require(['chai', 'sinon-chai', 'sinon', 'mocha', 'jquery'], function (chai, sinonChai) {

  chai.use(sinonChai);
  expect = chai.expect;
  mocha.setup('bdd');

  require(['contenteditable.spec', 'mention.spec'], function() {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
