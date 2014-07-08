(function() {
'use strict';
    function DoxterDownloader() {
        this.doxterApiUrl = 'http://api/v1/html/';
    }

    DoxterDownloader.prototype.insertDoctorsContent = function(content) {
        var elements = this.getAllDoctorsDivs();
        for(var element in elements)
        {
            var doctor_attributes = elements[element]["attributes"]
            if(doctor_attributes != undefined)
            {
                var doctor_id = doctor_attributes.getNamedItem("data-doctor-id");
                if(doctor_id != undefined)
                {
                    var value = doctor_id.value
                    if(value != undefined) {
                        elements[element].innerHTML = content["doctors_ids"][value]
                    }
                }
            }
        }
    };

    DoxterDownloader.prototype.getAllDoctorsDivs = function() {
        var allDoctorsDivs = document.querySelectorAll('[data-doctor-id]');
        return allDoctorsDivs;
    }

    DoxterDownloader.prototype.prepareDataForSend = function(data_divs) {
        var doctors_json = {};
        var doctor_ids= [];

        for (var i = 0; i < data_divs.length; i++) {
            doctor_ids[i] = data_divs[i].getAttribute("data-doctor-id");
        }

        doctors_json["doctors_ids"] = doctor_ids;
        var serialized_json = JSON.stringify(doctors_json);

        return serialized_json;
    }


    DoxterDownloader.prototype.onDataArrived = function() {
        var request = this.request
        if(request != null || request != undefined){
            if(request.readyState == request.DONE) {
                if (request.status >= 200 && request.status < 400) {
                    this.insertDoctorsContent(request.responseText);
                }
            }
        }
    };

    DoxterDownloader.prototype.getDoxterData = function() {
        if (document.readyState === 'complete') {
            var allDoctorsDivs = this.getAllDoctorsDivs();
            var data = this.prepareDataForSend(allDoctorsDivs);
            this.request = new XMLHttpRequest();
            this.request.onreadystatechange = this.onDataArrived.bind(this);
            this.request.open('POST', this.doxterApiUrl);
            this.request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            this.request.send(data);

        }
    };




    document.addEventListener("DOMContentLoaded", function(event) {
        var seed = +new Date();
        var _instance = new DoxterDownloader();
        var script = document.createElement('script');
        window["window.doxter_instance_" + seed] = _instance.onDataArrived.bind(_instance);
        script.src = _instance.doxterApiUrl +"?callback=window.doxter_instance_" + seed;
        document.body.appendChild(script);
    });

})();
