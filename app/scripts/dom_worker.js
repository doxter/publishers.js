'use strict';

(function() {
    var DomWorker;

    DomWorker = {
        render: function(template, data) {
            for (var i=0; i<data.length; i++) {
                var doctor = data[i].doctorId;
                var tmpDom = document.createElement('div');

                for (var j=0; j<data[i].availability.length; j++) {
                    var a = data[i].availability[j];

                    $(tmpDom).append(template.replace('{{problem}}', a.problem));
                }
                $('.availability[data-doctor-id=' + doctor + ']').html(tmpDom);
            }
        },

        scanDoctors: function() {
            return $('.availability').map(function() {
                return $(this).data('doctorId');
            })
        }
    };

    doxter.publisher.DomWorker = DomWorker;
})();
