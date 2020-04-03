console.log("UNIFI-CHROME: popup.js loaded");


let clean = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "clean"}, function(response) {
                console.log(response.result);
                document.querySelector("#status").innerHTML = "pulito";
            });
        });
  }

  let unclean = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "restore"}, function(response) {
                console.log(response.result);
                document.querySelector("#status").innerHTML = "originale";
            });
        });
  }

document.addEventListener('DOMContentLoaded', function() {
  var cleanButton = document.querySelector('#clean-button');
  cleanButton.addEventListener('click', clean, false);

  var restoreButton = document.querySelector('#restore-button');
  restoreButton.addEventListener('click', unclean, false);

}, false);

clean();

/*
  var reloadButton = document.querySelector('#reload-button');
  reloadButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
  }, false);



*/


// automatic clean on first click


/*
chrome.tabs.getSelected(null, function(tab) {
  // WORKS BUT IS USELESS - CAN'T INTERACT WITH DOM
  // alert("works");
});
*/
