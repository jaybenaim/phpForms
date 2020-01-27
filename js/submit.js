const form = $("form");
const messageConfirmed = `<div>Message Sent</div> `;
const displayAlert = alert => {
  form.append(alert);
};
/// Changes XML to JSON
function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

$(function() {
  form.on("submit", function(e) {
    e.preventDefault();

    fetch(
      "http://localhost/home/newname.php",
      { form },
      {
        method: "POST",
        data: form
      }
    )
      .then(res => {
        displayAlert(messageConfirmed);
        var jsonText = JSON.stringify(xmlToJson(res.body));
        console.log(jsonText);

        return res.json();
      })
      .then(myJson => {
        console.log(myJson);
      });
  });
});
