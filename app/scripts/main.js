'use strict';

(function() {
    var p = window.doxter.publisher;

    p.load = function(config) {
        (new p.App(config)).run();
    };
})();
