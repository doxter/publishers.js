(function() {
    'use strict';

    describe('App', function() {
        describe('App', function() {
            it('initializes the app with a publisher key', function() {
                expect(new App({accountKey: 'xxx'})).accountKey.to.equal('xxx');
            });
        });
    });
})();
