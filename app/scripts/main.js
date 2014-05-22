'use strict';

(function() {
    var p = window.doxter.publisher;

    p.jq(function() {
        var publisherKey = p.jq('#doxter-publisher-js').data('publisherKey'),
            templateUrl = p.jq('#doxter-publisher-js').data('templateUrl');

        (new p.App({ publisherKey: publisherKey, templateUrl: templateUrl })).run();
    });
})();
