'use strict';

function DoxterDownloader() {
  this.doxterApiUrl = '/echo/html/';
}

DoxterDownloader.prototype.insertDoctorsContent = function(content) {
    var doxterContent =  document.getElementById('doxter_content');
    if(doxterContent !== undefined)
    {
      doxterContent.innerHTML = content
    }
};

DoxterDownloader.prototype.getAllDoctorsDivs = function() {
    var greenTest = document.querySelectorAll('[data-doctor-id]');;
    return greenTest;
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


DoxterDownloader.prototype.doxterRequestListener = function() {
    if ((this.readyState == this.DONE)) {
        if (this.status >= 200 && this.status < 400) {
            this.insertDoctorsContent(this.responseText)
        }
    }
};

DoxterDownloader.prototype.getDoxterData = function(doxterListener) {
   if (document.readyState === 'complete') {
        var request = new XMLHttpRequest();
        if(doxterListener === undefined || doxterListener === null)
        {
            doxterListener = this.doxterRequestListener;
        }
        request.onreadystatechange = doxterListener;
        request.open('GET', this.doxterApiUrl);
        request.send();
        request = null;
    }
};
