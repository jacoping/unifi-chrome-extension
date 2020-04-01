console.log("UNIFI-CHROME: content.js loaded");

var original_content = document.querySelector('body');
var status = "dirty";

var wash = function(body) {
  let washed = body;
  console.log("washing...");
  let container = washed.querySelector('#cmpro-page-container');
  let elements = container.getElementsByTagName('*');
  l = elements.length;
  for (i = 0; i < l; i++) {
    elements[i].removeAttribute('style');
  }
  return washed;
};


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.command);

    if (request.command === "clean") {
      // ADD CODE HERE
      let body = document.querySelector('body');
      let clonedBody = body.cloneNode(true);
      clonedBodyWashed = wash(clonedBody);
      body.replaceWith(clonedBodyWashed);

      status = "whashed";

    } else if (request.command === "restore") {
      let body = document.querySelector('body');
      body.replaceWith(original_content);

      status = "dirty";
    }

    sendResponse({result: "success: " + status});
});
