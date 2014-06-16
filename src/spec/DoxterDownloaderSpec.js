'use strict';

/*globals DoxterDownloader:false, Song: false*/

describe("DoxterDownloader", function() {
    var publisher;

    beforeEach(function () {
        publisher = new DoxterDownloader();
    });

    it("should be able to download a doctors", function () {
        publisher.download();
        expect(publisher.isDownloaded).toEqual(true);
    });
});