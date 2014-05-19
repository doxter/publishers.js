'use strict';

(function() {
    var p = window.doxter.publisher;

    p.load = function(config) {
        $(function() {
            (new p.App(config)).run();
        });
    };
})();
