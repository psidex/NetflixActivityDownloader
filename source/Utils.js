/*
 * Utils.js
 * This just contains a few utility functions
*/



// GETs JSON data from URL
function getJSON(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                alert("Netflix Stats gathering failed, see console for details");
                console.warn(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    }; 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}



{nextScript}
