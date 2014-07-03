'use strict';


describe("DoxterDownloader", function() {
    var doxterDownloader;

    beforeEach(function () {
        doxterDownloader = new DoxterDownloader();
        jasmine.getFixtures().fixturesPath = "spec/fixtures";
        loadFixtures('test_page.html');
        jasmine.Ajax.install();

    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("should be able to insert a doctors to div", function () {
        var custom_content = "custom"
        doxterDownloader.insertDoctorsContent(custom_content);
        expect(document.getElementById('doxter_content').innerHTML).toBe(custom_content);
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

    describe("getAllDoctorsDivs", function() {
        it("should collect every doctors divs with ids", function () {
            var expectedCountOfElement = 3;
            var allDoctorsDivs = doxterDownloader.getAllDoctorsDivs()
            expect(allDoctorsDivs.length).toBe(expectedCountOfElement);
        });
    });
    describe("prepareDataForSend", function() {

        it("should received array of elements and return json array of doctors ids", function () {
            var doctors_json = {};
            doctors_json["doctors_ids"] = ["test_id_1", "test_id_2", "test_id_3"];
            var expected_result_json = JSON.stringify(doctors_json)

            var allDoctorsDivs = doxterDownloader.getAllDoctorsDivs()
            var result_json = doxterDownloader.prepareDataForSend(allDoctorsDivs)

            expect(result_json).toBe(expected_result_json);
        });
    });

});