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

const cpfValidator = (cpf) => {
  const strCPF = cpfRaw(cpf);
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
};

const passwordValidator = (password) => {
  return password == "aedigitals" ? true : false;
};

const cpfRaw = (cpf) => {
  const strCPF = cpf.replace(/\D/g, "");
  return strCPF;
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

const getPasswordValueFromInput = () => {
  const password = document.getElementById("password").value;
  return password;
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
  const passwordInputElement = document.getElementById("password");
  cpfInputElement.disabled = "true";
  passwordInputElement.disabled = "true";
};

const showCpfError = () => {
  document.getElementById("cpfError").style.display = "block";
};

const showPasswordError = () => {
  document.getElementById("passwordError").style.display = "block";
};

const hidePasswordError = () => {
  document.getElementById("passwordError").style.display = "none";
};

const hideCpfError = () => {
  document.getElementById("cpfError").style.display = "none";
};

document.addEventListener("DOMContentLoaded", function () {
  jQuery(function ($) {
    $("#cpf").mask("999.999.999-99");
  });

  const registerButtonElement = getRegisterButtonElement();

  registerButtonElement.addEventListener("click", () => {
    const cpf = getCpfValueFromInput();
    const password = getPasswordValueFromInput();
    const isCpfValid = cpfValidator(cpf);
    const isPasswordValid = passwordValidator(password);

    if (!isCpfValid) return showCpfError();
    hideCpfError();
    if (!isPasswordValid) return showPasswordError();
    hidePasswordError();

    showLoadingSpin();
    disableRegisterInputs();
    cadastrar(cpfRaw(cpf));
  });
});
