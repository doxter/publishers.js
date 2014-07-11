(function() {
'use strict';

function DoxterDownloader() {
  this.doxterApiUrl = 'http://localhost:3000/api/publishers/v1/doctors/next_availabilities.json';
}


DoxterDownloader.prototype.getInsertedValue = function (content,value) {
    var result;
    if(value !== undefined)
    {
        var filter_result = content.filter(function (doctor) {
            return doctor[value] !== undefined
        });

        if (filter_result !== undefined && filter_result[0] !== undefined)
        {
              result = filter_result[0][value];
        }
    }
    return result
};

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
                var result = this.getInsertedValue(content["doctors_ids"],value)

                if(result != undefined ) {
                    elements[element].innerHTML = result
                }
            }
        }
    }
};

DoxterDownloader.prototype.getAllDoctorsDivs = function() {
    var allDoctorsDivs = document.querySelectorAll('[data-doctor-id]');
    return allDoctorsDivs;
};

DoxterDownloader.prototype.serialize = function(obj, prefix) {
    var str = [];
    for(var p in obj) {
        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push(typeof v == "object" ?
            this.serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
};

DoxterDownloader.prototype.prepareDataForSend = function(data_divs) {
    var doctors_json = {};
    var doctor_ids= [];

    for (var i = 0; i < data_divs.length; i++) {
        doctor_ids[i] = data_divs[i].getAttribute("data-doctor-id");
    }

    doctors_json["doctors_ids"] = doctor_ids;
    return this.serialize(doctors_json);
};


DoxterDownloader.prototype.onDataArrived = function(result) {
    if(result != null && result != undefined)
    {
      result = JSON.parse(result)
      this.insertDoctorsContent(result);
    }
};


    window.addEventListener("load", function(event) {
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
