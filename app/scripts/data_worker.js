'use strict';

(function() {
    var DataWorker,
        p = window.doxter.publisher;

    DataWorker = {

        availability: [],
        template: {},

        getTemplate: function(templateUrl) {
            var defer = p.jq.Deferred();

            if (templateUrl === undefined) {
                this.template = this._defaultTemplate;
                defer.resolve();
            } else {
                p.jq.ajax({
                    url: templateUrl,
                    context: p.DataWorker
                }).done(function(data) {
                    this.template = data;
                    defer.resolve();
                }).fail(function() {
                    throw 'Specified template file is not available. Please check the internet connection and if the file exists.';
                });
            }

            return defer.promise();
        },

        getAvailability: function(doctors) {
            var defer = p.jq.Deferred(),
                self = this;

            // Since JSON API is not available yet, this ajax does not fetch remote data.
            p.jq.ajax({
                url: "",
                context: p.DataWorker
            }).done(function(data) {
                this.availability = this._dummyData(doctors);
                defer.resolve();
            }).fail(function() {
                throw 'Cannot retreive data from API server.';
            });

            return defer.promise();
        },

        _baseUrl: 'https://publisher-api.doxter.de/availability/',

        _defaultTemplate: '{{#each availability}} <div class="availability-entry"><div class="problem">{{problem}}</div> {{#each times}} <div class="time">{{day}} {{start}}<a class="btn" href="{{url}}">Buchen</a></div> {{/each}} </div> {{/each}}',

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
                        { problem: 'Kontrolltermin', times: [
                            {
                                date: today.toLocaleDateString(),
                                day: this._day[today.getDay()],
                                start: today.toLocaleTimeString().replace(/:\d+ [AP]M/, ''),
                                end: hourLater.toLocaleTimeString().replace(/:\d+ [AP]M/, ''),
                                url: 'http://www.doxter.de/zahnarzt-berlin/dr-max-mustermann-schauprofil'
                            },
                            {
                                date: tomorrow.toLocaleDateString(),
                                day: this._day[tomorrow.getDay()],
                                start: tomorrow.toLocaleTimeString().replace(/:\d+ [AP]M/, ''),
                                end: tomorrowAndHourLater.toLocaleTimeString().replace(/:\d+ [AP]M/, ''),
                                url: 'http://www.doxter.de/zahnarzt-berlin/dr-max-mustermann-schauprofil' }
                        ] },
                        { problem: 'Fuellung', times: [
                            {
                                date: today.toLocaleDateString(),
                                day: this._day[today.getDay()],
                                start: today.toLocaleTimeString().replace(/:\d+ [AP]M/, ''),
                                end: hourLater.toLocaleTimeString().replace(/:\d+ [AP]M/, ''),
                                url: 'http://www.doxter.de/zahnarzt-berlin/dr-max-mustermann-schauprofil'
                            },
                            {
                                date: tomorrow.toLocaleDateString(),
                                day: this._day[tomorrow.getDay()],
                                start: tomorrow.toLocaleTimeString().replace(/:\d+ [AP]M/, ''),
                                end: tomorrowAndHourLater.toLocaleTimeString().replace(/:\d+ [AP]M/, ''),
                                url: 'http://www.doxter.de/zahnarzt-berlin/dr-max-mustermann-schauprofil' }
                        ] }
                    ]
                });
            }
            return availability;
        },

        _day: {
            0: 'Sonntag',
            1: 'Montag',
            2: 'Dienstag',
            3: 'Mittwoch',
            4: 'Donnerstag',
            5: 'Freitag',
            6: 'Samstag'
        }
    };

    p.DataWorker = DataWorker;
})();
