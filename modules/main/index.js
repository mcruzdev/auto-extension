const api = {
  submitCpf: async (cpf) => {
    return await fetch(`${global.config.herokuBaseUrl}/logar`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ cpf }),
    });
  },
};

const cadastrar = (cpf) => {
  // api.submitCpf(cpf).then((res) => {
  //   if (res.ok) {
  //     alert("Incluido Com sucesso");
  //   }
  // });

  alert("Incluido Com sucesso");
};

const getCpfValueFromInput = () => {
  const cpf = document.getElementById("cpf").value;
  return cpf;
};

const getRegisterButtonElement = () => {
  return document.getElementById("registerButton");
};

document.addEventListener("DOMContentLoaded", function () {
  const cpf = getCpfValueFromInput();
  const registerButtonElement = getRegisterButtonElement();

  registerButtonElement.addEventListener("click", () => cadastrar(cpf));
});
