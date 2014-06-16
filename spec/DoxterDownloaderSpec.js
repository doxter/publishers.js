'use strict';

/*globals PublisherDownloader:false, Song: false*/

describe("PublisherDownloader", function() {
    var publisher;

    beforeEach(function () {
        publisher = new PublisherDownloader();
    });

    it("should be able to download a doctors", function () {
        publisher.downloaded();
        expect(publisher.currentlyPlayingSong).toEqual(true);
    });
});