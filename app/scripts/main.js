'use strict';

(function() {
    var p = window.doxter.publisher;

    $(function() {
        var accountKey = $('#doxter-publisher-js').data('accountKey'),
            templateUrl = $('#doxter-publisher-js').data('templateUrl');

        (new p.App({ accountKey: accountKey, templateUrl: templateUrl })).run();
    });
})();
