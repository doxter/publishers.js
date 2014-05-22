'use strict';

(function() {
    var DomWorker,
        p = window.doxter.publisher;

    DomWorker = {
        render: function(template, data) {
            template = Handlebars.compile(template);

            for (var i=0; i<data.length; i++) {
                var doctor = data[i].doctorId;
                var tmpDom = document.createElement('div');
                var cont = template({ availability: data[i].availability });

                p.jq(tmpDom).append(cont);
                p.jq('.availability[data-doxter-id=' + doctor + ']').html(tmpDom);
            }
        },

        scanDoctors: function() {
            return p.jq('.availability').map(function() {
                return p.jq(this).data('doxterId');
            })
        }
    };

    doxter.publisher.DomWorker = DomWorker;
})();
