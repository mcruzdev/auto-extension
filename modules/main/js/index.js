const api = {
  submitCpf: async (cpf) => {
    return await fetch("http://localhost:3000/api/v1/pe", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ cpf }),
    });
  },
};

const cadastrar = (cpf) => {
  api.submitCpf(cpf).then((res) => {
    if (res.ok) {
     const json = await res.json() 
     alert(`Status from auto-robot api: ${json.ok}`);
    } else {
      alert(`Failed Status: ${res.status}`);
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

document.addEventListener("DOMContentLoaded", function () {
  const cpf = getCpfValueFromInput();
  const registerButtonElement = getRegisterButtonElement();

  registerButtonElement.addEventListener("click", () => cadastrar(cpf));
});

