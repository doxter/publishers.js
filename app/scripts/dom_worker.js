'use strict';

(function() {
    var DomWorker;

    DomWorker = {
        render: function(template, data) {
            template = Handlebars.compile(template);

            for (var i=0; i<data.length; i++) {
                var doctor = data[i].doctorId;
                var tmpDom = document.createElement('div');
                var cont = template({ availability: data[i].availability });

                $(tmpDom).append(cont);
                $('.availability[data-doxter-id=' + doctor + ']').html(tmpDom);
            }
        },

        scanDoctors: function() {
            return $('.availability').map(function() {
                return $(this).data('doxterId');
            })
        }
    };

    doxter.publisher.DomWorker = DomWorker;
})();
