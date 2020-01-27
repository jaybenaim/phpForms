const form = document.querySelector("form");
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
    const formattedFormData = new FormData(form);
    fetchData(formattedFormData);
    const name = form.find("[name='name']").val();
    const email = form.find("[name='email']").val();
    const message = form.find("[name='message']").val();

    const data = { name, email, message };

    console.log(data);
    fetch(
      "http://localhost/home/newname.php",

      {
        method: "POST",
        body: data
      },
      data
    )
      .then(res => {
        return res;
      })
      .then(body => {
        console.log(body);
      })
      .catch(err => {
        console.log(err);
      });
  });
});
async function postData(formattedFormData) {
  /**
   * The request is still 'POST' but the $_GET variable
   * will get values too: 'name' and 'favorite_color'
   */
  const response = await fetch("http://localhost/home/newname.php", {
    method: "POST",
    body: formattedFormData
  });
  const data = await response.text();
  console.log(data);
}
