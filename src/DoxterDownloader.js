'use strict';

function DoxterDownloader() {
  this.doxterApiUrl = 'http://doxter.de/api/publishers/v1/doctors/next_availabilities.json';
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
            var doctor_id = doctor_attributes.getNamedItem("data-doxter-id");
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
    var allDoctorsDivs = document.querySelectorAll('[data-doxter-id]');
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
        doctor_ids[i] = data_divs[i].getAttribute("data-doxter-id");
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
