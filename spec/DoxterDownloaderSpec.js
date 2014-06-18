'use strict';


describe("DoxterDownloader", function() {
    var doxterDownloader;

    beforeEach(function () {
        doxterDownloader = new DoxterDownloader();
        jasmine.Ajax.install();

    });

    it("should be able to download a doctors", function () {
        doxterDownloader.download();
        expect(doxterDownloader.isDownloaded).toEqual(true);
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it("specifying response when you need it", function() {
        var doneFn = jasmine.createSpy("success");

        var fakeListener = function() {
            if (this.readyState == this.DONE) {
                doneFn(this.responseText);
            }
        };
        doxterDownloader.getDoxterData(fakeListener);
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/echo/html/');
        expect(doneFn).not.toHaveBeenCalled();
        jasmine.Ajax.requests.mostRecent().response({

        "status": 200,

        "contentType": 'text/plain',

        "responseText": 'awesome response'
    });

        expect(doneFn).toHaveBeenCalledWith('awesome response');
});
});