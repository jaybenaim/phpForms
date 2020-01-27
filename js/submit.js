const form = document.querySelector("form");
const messageConfirmed = `<div>Message Sent</div> `;
const displayAlert = alert => {
  form.append(alert);
};

$(function() {
  form.on("submit", function(e) {
    e.preventDefault();
    const formattedFormData = new FormData(form);
    fetchData(formattedFormData);

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
  const response = await fetch("http://localhost/home/newname.php", {
    method: "POST",
    body: formattedFormData
  });
  const data = await response.text();
  console.log(data);
}
