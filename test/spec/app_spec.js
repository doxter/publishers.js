'use strict';

(function() {
    var App = doxter.publisher.App;

    describe('App', function() {
        describe('App', function() {
            it('initializes the app with a publisher key', function() {
                expect(new App({ publisherKey: 'xxx' }).publisherKey).to.equal('xxx');
            });
        });
    });
})();
