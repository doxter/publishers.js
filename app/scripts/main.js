'use strict';

(function() {
    var p = window.doxter.publisher;

    p.jq(function() {
        var accountKey = p.jq('#doxter-publisher-js').data('accountKey'),
            templateUrl = p.jq('#doxter-publisher-js').data('templateUrl');

        (new p.App({ accountKey: accountKey, templateUrl: templateUrl })).run();
    });
})();
