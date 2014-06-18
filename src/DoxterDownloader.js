'use strict';

function DoxterDownloader() {

}

DoxterDownloader.prototype.download = function() {
    this.isDownloaded = true;
};

DoxterDownloader.prototype.doxterRequestListener = function() {
//    if (this.readyState === 4) {
//        if (this.status >= 200 && this.status < 400) {
//            // Success!
////            document.getElementById('doxter_content').innerHTML = this.responseText;
//        } else {
//            // Error :(
//        }
//    }
}();

DoxterDownloader.prototype.getDoxterData = function(doxterListener) {
   if (document.readyState === 'complete') {
        var request = new XMLHttpRequest();
        if(doxterListener === undefined || doxterListener === null)
        {
            doxterListener = this.doxterRequestListener();
        }
        request.onreadystatechange = doxterListener;
        request.open('GET', '/echo/html/');
        request.send();
        request = null;
    }
};
