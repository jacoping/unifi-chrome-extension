console.log("UNIFI-CHROME: content.js loaded");

const original_content = document.querySelector('#testopagina').cloneNode(true);

var status = "dirty";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.command);

    if (request.command === "clean") {
      // ADD CODE HERE
      var div = document.querySelector('#cmpro-pagecontent');
      div.remove();

      status = "whashed";

    } else if (request.command === "restore") {
      var div = document.querySelector('#testopagina');
      div.remove();
      document.querySelector('#corpo').appendChild(original_content);
      status = "dirty";
    }

    sendResponse({result: "success: " + status});
});
