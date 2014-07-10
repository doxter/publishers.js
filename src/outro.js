
    document.addEventListener("DOMContentLoaded", function(event) {
        var seed = +new Date();
        var _instance = new DoxterDownloader();
        var script = document.createElement('script');
        var allDoctorsDivs = _instance.getAllDoctorsDivs();
        var data = _instance.prepareDataForSend(allDoctorsDivs);
        var aid = document.getElementById("doxterPublisherDownloader").getAttribute("data-aid");
        var aid_params = "";

        if (aid !== undefined)
        {
          aid_params = "&aid=" + aid
        }

        window["doxter_instance_" + seed] = _instance.onDataArrived.bind(_instance);
        script.type = 'text/javascript';
        script.src = _instance.doxterApiUrl +"?callback=window.doxter_instance_" + seed + '&' + data + aid_params;
        document.body.appendChild(script);
    });

})();
