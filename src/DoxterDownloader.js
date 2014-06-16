'use strict';

function DoxterDownloader() {
}

DoxterDownloader.prototype.download = function() {
    this.isDownloaded = true;
};

DoxterDownloader.prototype.doxterRequestListener = function() {
    if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
            // Success!
//            document.getElementById('doxter_content').innerHTML = this.responseText;
            console.log(this.responseText);
        } else {
            // Error :(
        }
    }
};

DoxterDownloader.prototype.getDoxterData = function() {
//    if (state === 'complete') {
//        request = new XMLHttpRequest();
//        request.open('GET', '/echo/html/', true);
//        request.onreadystatechange = this.doxterRequestListener();
//        request.send();
//        request = null;
//    }
};
