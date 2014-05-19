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
                console.log('template fetched');
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
                console.log('data fetched');
                this.availability = this._dummyData(doctors);
                console.log(this._dummyData(doctors));
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

            console.log('today: ' + today);
            console.log('hour later: ' + hourLater);
            console.log('tomorrow: ' +  tomorrow);
            console.log('tomorrowAndHourLater: ' +  tomorrowAndHourLater);

            for (var i=0; i<doctors.length;i++) {
                availability.push({
                    id: doctors[i],
                    avaiability: [
                        { start: today, end: hourLater },
                        { start: tomorrow, end: tomorrowAndHourLater }
                    ]
                });
            }
            return availability;
        }
    };

    p.DataWorker = DataWorker;
})();
