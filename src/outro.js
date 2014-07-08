

    document.addEventListener("DOMContentLoaded", function(event) {
        var seed = +new Date();
        var _instance = new DoxterDownloader();
        var script = document.createElement('script');
        var allDoctorsDivs = _instance.getAllDoctorsDivs();
        var data = _instance.prepareDataForSend(allDoctorsDivs);
        window["window.doxter_instance_" + seed] = _instance.onDataArrived.bind(_instance);
        script.src = _instance.doxterApiUrl +"?callback=window.doxter_instance_" + seed;
        document.body.appendChild(script);
    });

})();
