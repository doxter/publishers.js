'use strict';
define(function(require){

    describe('App', function() {
        describe('App', function() {
            it('initializes the app with a publisher key', function() {
                expect(new App({accountKey: 'xxx'})).accountKey.to.equal('xxx');
            });
        });
    });

})();
