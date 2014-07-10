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

        it("get query data", function () {
            var content = this.jsonFixture["doctors_ids"]
            var value = "test_id_1"
            var result = doxterDownloader.getInsertedValue(content,value)
            expect(result).toBe(content[0][value])
        });
        it("should be able to insert a html content for each doctor id", function () {

            doxterDownloader.insertDoctorsContent(this.jsonFixture);

            expect(document.querySelectorAll('[data-doctor-id=test_id_1]')[0].innerHTML).toBe('<div id="doxter_recieved_1"></div>');
        });
    });

    describe("getDoctorsAvailability", function() {
        beforeEach(function () {
            this.jsonFixture = getJSONFixture("test_response.json");
            jasmine.Ajax.install();

            doxterDownloader.doxterApiUrl = this.fakeUrl;

            spyOn(doxterDownloader,'getAllDoctorsDivs');
            spyOn(doxterDownloader,'prepareDataForSend');
            spyOn(doxterDownloader, 'insertDoctorsContent');
            spyOn(doxterDownloader, "onDataArrived");

        });

        it("specifying response when you need it", function() {
            // Use stub request for fake request
            var allDoctorsDivs = doxterDownloader.getAllDoctorsDivs();
            var data = doxterDownloader.prepareDataForSend(allDoctorsDivs);
            var request = new XMLHttpRequest();

            request.onreadystatechange = doxterDownloader.onDataArrived;
            request.open('GET', this.doxterApiUrl);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(data);
            expect(doxterDownloader.getAllDoctorsDivs).toHaveBeenCalled();
            expect(jasmine.Ajax.requests.mostRecent().url).toBe(this.fakeUrl);
            jasmine.Ajax.requests.mostRecent().response({

                "status": 200,

                "contentType": "application/json;charset=UTF-8",

                "responseText": this.jsonFixture
            });
            expect(doxterDownloader.onDataArrived).toHaveBeenCalled();
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
            var doctors_object = {};
            doctors_object["doctors_ids"] = ["test_id_1", "test_id_2", "test_id_3"];
            var expected_result_query = doxterDownloader.serialize(doctors_object);

            var allDoctorsDivs = doxterDownloader.getAllDoctorsDivs();
            var result_query = doxterDownloader.prepareDataForSend(allDoctorsDivs);

            expect(result_query).toBe(expected_result_query);
        });
    });

});