

console.log("UNIFI-CHROME: content.js loaded");

const settings = {
  selector_name: '#cmpro-pagecontent'
}

const sanitize_html_options = {
  allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe' ],
disallowedTagsMode: 'discard',
allowedAttributes: {
  a: [ 'href', 'name', 'target' ],
  // We don't currently allow img itself by default, but this
  // would make sense if we did. You could add srcset here,
  // and if you do the URL is checked for safety
  img: [ 'src' ]
},
// Lots of these won't come up by default because we don't allow them
selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
// URL schemes we permit
allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
allowedSchemesByTag: {},
allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
allowProtocolRelative: true
}

// hello world sanitize html
var html = "<strong>hello world</strong>";
console.log(sanitizeHtml(html));

var original_content = document.querySelector('body');
var status = "dirty";

var sanitize = function(body) {
  let washed = body;
  console.log("washing...");
  let container = washed.querySelector(settings.selector_name);
  container.innerHTML = sanitizeHtml(container.innerHTML, sanitize_html_options);
  return washed;
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("UNIFI-CHROME: received command: " + request.command);

    if (request.command === "clean") {
      // ADD CODE HERE
      let body = document.querySelector('body');
      let clonedBody = body.cloneNode(true);
      clonedBodyWashed = sanitize(clonedBody);
      body.replaceWith(clonedBodyWashed);

      status = "whashed";

    } else if (request.command === "restore") {
      let body = document.querySelector('body');
      body.replaceWith(original_content);

      status = "dirty";
    }

    sendResponse({result: "success: " + status});
});
