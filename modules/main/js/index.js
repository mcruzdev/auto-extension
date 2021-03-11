document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("registerButton");
  button.addEventListener("click", onRegisterClick);
});

const onRegisterClick = function () {
  const cpf = document.getElementById("cpf");

  fetch("http://localhost:3000/api/v1/pe", {
    body: JSON.stringify({ cpf: cpf.value }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      alert(`Status from auto-robot api: ${json.ok}`);
    });
};
