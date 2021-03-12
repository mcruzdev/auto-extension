const api = {
  submitCpf: async (cpf) => {
    return await fetch("http://localhost:3000/api/v1/pe", {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      method: "POST",
      body: JSON.stringify({ cpf }),
    });
  },
};

const cadastrar = (cpf) => {
  api.submitCpf(cpf).then(async (res) => {
    if (res.ok) {
      const json = await res.json();
      alert(`Status from auto-robot api: ${json.ok}`);
      enableRegisterInputs();
      hideLoadingSpin();
    } else {
      alert(`Failed Status: `);
      enableRegisterInputs();
      hideLoadingSpin();
    }
  });
};

const getCpfValueFromInput = () => {
  const cpf = document.getElementById("cpf").value;
  return cpf;
};

const getRegisterButtonElement = () => {
  return document.getElementById("registerButton");
};

const showLoadingSpin = () => {
  const spinElement = document.getElementById("spin");
  const cadastrarElement = document.getElementById("registerButton");
  spinElement.style.display = "flex";
  cadastrarElement.style.display = "none";
};

const hideLoadingSpin = () => {
  const spinElement = document.getElementById("spin");
  const cadastrarElement = document.getElementById("registerButton");
  spinElement.style.display = "none";
  cadastrarElement.style.display = "flex";
};

const enableRegisterInputs = () => {
  const cpfInputElement = document.getElementById("cpf");
  const dateOfBirthInputElement = document.getElementById("dateOfBirth");
  cpfInputElement.disabled = "false";
  dateOfBirthInputElement.disabled = "false";
};

const disableRegisterInputs = () => {
  const cpfInputElement = document.getElementById("cpf");
  const dateOfBirthInputElement = document.getElementById("dateOfBirth");
  cpfInputElement.disabled = "true";
  dateOfBirthInputElement.disabled = "true";
};

document.addEventListener("DOMContentLoaded", function () {
  const cpf = getCpfValueFromInput();
  const registerButtonElement = getRegisterButtonElement();

  registerButtonElement.addEventListener("click", () => {
    cadastrar(cpf);
    showLoadingSpin();
    disableRegisterInputs();
  });
});
