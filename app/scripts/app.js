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
            asyncTasks;

        willGetAvailability = DataWorker.getAvailability();
        willGetTemplate = DataWorker.getTemplate();
        asyncTasks = $.when(willGetAvailability, willGetTemplate);

        asyncTasks.done(function() {
            DomWorker.render(DataWorker.availability);
        }).fail(function() {
            p.errorMessage = DataWorker.errorMessage;
        });
    };

    p.App = App;
})();
