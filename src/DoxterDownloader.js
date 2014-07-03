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
