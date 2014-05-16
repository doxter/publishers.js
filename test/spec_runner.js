require.config({
    baseUrl: '../app/scripts',
    paths: {
        'spec'  : '../../test/spec',
        'mocha' : '../../test/bower_components/mocha/mocha',
        'chai' : '../../test/bower_components/chai/chai'
    }
});

require(['require', 'chai', 'mocha'], function(require, chai) {
    var expect = chai.expect;
    mocha.setup('bdd');

    require([
        'app',
        'spec/app_spec'
    ], function(require) {
        mocha.run();
    });
});
