'use strict';

function DoxterDownloader() {
  this.doxterApiUrl = 'http://localhost:3000/api/publishers/v1/doctors/next_availabilities.json';
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
                if(value != undefined && content["doctors_ids"][value] != undefined) {
                    elements[element].innerHTML = content["doctors_ids"][value]
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
    return encodeURIComponent(doctor_ids);
};


DoxterDownloader.prototype.onDataArrived = function(result) {
  result = JSON.parse(result)
  this.insertDoctorsContent(result);
};
