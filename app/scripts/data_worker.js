'use strict';

(function() {
    var DataWorker,
        p = window.doxter.publisher;

    DataWorker = {

        availability: [],
        template: {},

        // getTemplate and getAvailability methods should be refactored with shared ajaxing parts.
        getTemplate: function(templateUrl) {
            var defer = $.Deferred();

            $.ajax({
                url: templateUrl,
                context: p.DataWorker
            }).done(function(data) {
                this.template = data;
                defer.resolve();
            });

            return defer.promise();
        },

        getAvailability: function(doctors) {
            var defer = $.Deferred(),
                self = this;

            $.ajax({
                //url: self._baseUrl + doctors.concat(','),
                context: p.DataWorker
            }).done(function(data) {
                this.availability = this._dummyData(doctors);
                defer.resolve();
            });

            return defer.promise();
        },

        _baseUrl: 'https://publisher-api.doxter.de/availability/',

        _dummyData: function(doctors) {
            var hour = 60000 * 60;
            var availability = [];
            var today = new Date();
            var hourLater = new Date(today.getTime() + hour);
            var tomorrow = new Date(today.getTime() + 24 * hour);
            var tomorrowAndHourLater = new Date(tomorrow.getTime() + 24 * hour);

            for (var i=0; i<doctors.length;i++) {
                availability.push({
                    doctorId: doctors[i],
                    availability: [
                        { problem: 'Kontrol', times: [
                            { start: today, end: hourLater, url: '/dummy.html' },
                            { start: tomorrow, end: tomorrowAndHourLater, url: '/dummy.html' } ]
                        },
                        { problem: 'Fuellung', times: [
                            { start: today, end: hourLater, url: '/dummy.html' },
                            { start: tomorrow, end: tomorrowAndHourLater, url: 'dummy.html' } ]
                        },
                    ]
                });
            }
            return availability;
        }
    };

    p.DataWorker = DataWorker;
})();
