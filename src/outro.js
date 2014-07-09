
    document.addEventListener("DOMContentLoaded", function(event) {
        var seed = +new Date();
        var _instance = new DoxterDownloader();
        var script = document.createElement('script');
        var allDoctorsDivs = _instance.getAllDoctorsDivs();
        var data = _instance.prepareDataForSend(allDoctorsDivs);
        window["doxter_instance_" + seed] = _instance.onDataArrived.bind(_instance);
        script.type = 'text/javascript';
        script.src = _instance.doxterApiUrl +"?callback=window.doxter_instance_" + seed + '&doctors_ids=' + data;
        document.body.appendChild(script);
    });

})();
