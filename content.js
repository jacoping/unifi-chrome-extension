

console.log("UNIFI-CHROME: content.js loaded");

const settings = {
  selector_name: '#cmpro-pagecontent'
}

// hello world sanitize html
var html = "<strong>hello world</strong>";
console.log(sanitizeHtml(html));

var original_content = document.querySelector('body');
var status = "dirty";

var wash = function(body) {
  let washed = body;
  console.log("washing...");
  let container = washed.querySelector(settings.selector_name);

  let elements = container.getElementsByTagName('*');
  l = elements.length;
  for (i = 0; i < l; i++) {
    elements[i].removeAttribute('style');
  }

  return washed;
};

var wash2 = function(body) {
  let washed = body;
  console.log("washing...");
  let container = washed.querySelector(settings.selector_name);
  container.innerHTML = sanitizeHtml(container.innerHTML);
  return washed;
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("UNIFI-CHROME: received command: " + request.command);

    if (request.command === "clean") {
      // ADD CODE HERE
      let body = document.querySelector('body');
      let clonedBody = body.cloneNode(true);
      clonedBodyWashed = wash2(clonedBody);
      body.replaceWith(clonedBodyWashed);

      status = "whashed";

    } else if (request.command === "restore") {
      let body = document.querySelector('body');
      body.replaceWith(original_content);

      status = "dirty";
    }

    sendResponse({result: "success: " + status});
});
