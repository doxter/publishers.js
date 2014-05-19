'use strict';

(function() {
    var p = window.doxter.publisher,
        DataWorker = p.DataWorker,
        DomWorker = p.DomWorker;

    function App(config) {
        this.accountKey = config.accountKey;
        this.templateUrl = config.templateUrl;
    }

    App.prototype.run = function() {
        var willGetAvailability,
            willGetTemplate,
            asyncTasks,
            doctors;

        doctors = DomWorker.scanDoctors();
        willGetAvailability = DataWorker.getAvailability(doctors);
        willGetTemplate = DataWorker.getTemplate(this.templateUrl);
        asyncTasks = $.when(willGetAvailability, willGetTemplate);

        asyncTasks.done(function() {
            DomWorker.render(DataWorker.template, DataWorker.availability);
        }).fail(function() {
            p.errorMessage = DataWorker.errorMessage;
        });
    };

    p.App = App;
})();
