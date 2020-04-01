console.log("UNIFI-CHROME: popup.js loaded");

document.addEventListener('DOMContentLoaded', function() {
  var cleanButton = document.querySelector('#clean-button');
  cleanButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "clean"}, function(response) {
                console.log(response.result);
            });
        });
  }, false);

  var restoreButton = document.querySelector('#restore-button');
  restoreButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "restore"}, function(response) {
                console.log(response.result);
            });
        });
  }, false);

  var reloadButton = document.querySelector('#reload-button');
  reloadButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
  }, false);


}, false);


/*
chrome.tabs.getSelected(null, function(tab) {
  // WORKS BUT IS USELESS - CAN'T INTERACT WITH DOM
  // alert("works");
});
*/
