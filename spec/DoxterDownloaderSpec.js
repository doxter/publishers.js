'use strict';


describe("DoxterDownloader", function() {
    var doxterDownloader;

    beforeEach(function () {
        doxterDownloader = new DoxterDownloader();

        var doxterdiv = document.createElement('div');
        doxterdiv.id = "doxter_content";
        doxterdiv.innerHTML = "some_text"
        document.getElementsByTagName('body')[0].appendChild(doxterdiv);

        jasmine.Ajax.install();

    });

    it("should be able to insert a doctors to div", function () {
        var custom_content = "custom"
        doxterDownloader.insertDoctorsContent(custom_content);
        expect(document.getElementById('doxter_content').innerHTML).toBe(custom_content);
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