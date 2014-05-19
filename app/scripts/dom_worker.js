'use strict';

(function() {
    var DomWorker;

    DomWorker = {
        render: function() {},
        scanDoctors: function() {
            return $('.doctor').map(function() {
                return $(this).data('doctorId');
            })
        }
    };

    doxter.publisher.DomWorker = DomWorker;
})();
