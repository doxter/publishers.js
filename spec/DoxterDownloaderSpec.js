'use strict';


describe("DoxterDownloader", function() {
    var doxterDownloader;

    beforeEach(function () {
        doxterDownloader = new DoxterDownloader();
        jasmine.getFixtures().fixturesPath = "spec/fixtures";
        jasmine.getJSONFixtures().fixturesPath = "spec/fixtures/json/";
        loadFixtures('test_page.html');
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    describe("insertDoctorsContent",function() {
        beforeEach(function () {
            this.jsonFixture = getJSONFixture("test_response.json");
         });
        it("should be able to insert a html content for each doctor id", function () {

            doxterDownloader.insertDoctorsContent(this.jsonFixture);

            expect(document.querySelectorAll('[data-doctor-id=test_id_1]')[0].innerHTML).toBe('<div id="doxter_recieved_1"></div>');
        });
    });

    describe("getDoctorsAvailability", function() {
        beforeEach(function () {
            jasmine.Ajax.install();
            this.fakeUrl = '/echo/json/';

            doxterDownloader.doxterApiUrl = this.fakeUrl;

            spyOn(doxterDownloader,'getAllDoctorsDivs');
            spyOn(doxterDownloader,'prepareDataForSend');
            spyOn(doxterDownloader, 'insertDoctorsContent');

        });

        it("specifying response when you need it", function() {
            doxterDownloader.getDoxterData();
            expect(doxterDownloader.getAllDoctorsDivs).toHaveBeenCalled();
            expect(doxterDownloader.prepareDataForSend).toHaveBeenCalled();
            expect(jasmine.Ajax.requests.mostRecent().url).toBe(this.fakeUrl);

            jasmine.Ajax.requests.mostRecent().response({

                "status": 200,

                "contentType": 'text/plain',

                "responseText": 'awesome response'
            });
            expect(doxterDownloader.insertDoctorsContent).toHaveBeenCalledWith('awesome response');
        });
    });

    describe("getAllDoctorsDivs", function() {
        it("should collect every doctors divs with ids", function () {
            var expectedCountOfElement = 3;
            var allDoctorsDivs = doxterDownloader.getAllDoctorsDivs();
            expect(allDoctorsDivs.length).toBe(expectedCountOfElement);
        });
    });

    describe("prepareDataForSend", function() {

        it("should have received array of elements and return json array of doctors ids", function () {
            var doctors_json = {};
            doctors_json["doctors_ids"] = ["test_id_1", "test_id_2", "test_id_3"];
            var expected_result_json = JSON.stringify(doctors_json);

            var allDoctorsDivs = doxterDownloader.getAllDoctorsDivs();
            var result_json = doxterDownloader.prepareDataForSend(allDoctorsDivs);

            expect(result_json).toBe(expected_result_json);
        });
    });

});