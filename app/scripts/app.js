'use strict';

(function() {
    var p = window.doxter.publisher,
        DataWorker = p.DataWorker,
        DomWorker = p.DomWorker;

    function App(config) {
        this.accountKey = config.accountKey;
    }

    App.prototype.run = function() {
        var willGetAvailability,
            willGetTemplate,
            asyncTasks,
            doctors;

        doctors = DomWorker.scanDoctors();
        console.log('doctors = ' + doctors);
        willGetAvailability = DataWorker.getAvailability(doctors);
        willGetTemplate = DataWorker.getTemplate();
        asyncTasks = $.when(willGetAvailability, willGetTemplate);

        asyncTasks.done(function() {
            console.log('both tasks are done');
            console.log('availability: ' + DataWorker.availability);
            DomWorker.render(DataWorker.availability);
        }).fail(function() {
            p.errorMessage = DataWorker.errorMessage;
        });
    };

    p.App = App;
})();
