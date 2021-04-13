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

const regionValidator = (region) => {
  return region ? true : false;
};

const cpfRaw = (cpf) => {
  const strCPF = cpf.replace(/\D/g, "");
  return strCPF;
};

const cadastrar = (cpf) => {
  chrome.runtime.sendMessage(cpf);
  setTimeout(() => {
    enableRegisterInputs();
    hideLoadingSpin();
    showRegisterSuccess();
  }, 2000);
};

const getCpfValueFromInput = () => {
  const cpf = document.getElementById("cpf").value;
  return cpf;
};

const getPasswordValueFromInput = () => {
  const password = document.getElementById("password").value;
  return password;
};

const getRegionValueFromInput = () => {
  var regionChoosed = document.getElementById("regions").value;
  return regionChoosed;
};

const getRegisterButtonElement = () => {
  return document.getElementById("registerButton");
};

const getNewRegisterButtonElement = () => {
  return document.getElementById("newRegister");
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
  const passwordInputElement = document.getElementById("password");
  cpfInputElement.removeAttribute("disabled");
  passwordInputElement.removeAttribute("disabled");
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

const showRegisterSuccess = () => {
  document.getElementById("registerSuccess").style.display = "flex";
  document.getElementById("mainForm").style.display = "none";
};

const hideRegisterSuccess = () => {
  return new Promise((resolve, reject) => {
    document.getElementById("registerSuccess").style.display = "none";
    document.getElementById("mainForm").style.display = "flex";
    resolve(true);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  jQuery(function ($) {
    $("#cpf").mask("999.999.999-99");
  });

  const registerButtonElement = getRegisterButtonElement();
  registerButtonElement.addEventListener("click", () => {
    const cpf = getCpfValueFromInput();
    const password = getPasswordValueFromInput();
    var regionChoosed = getRegionValueFromInput();
    const isCpfValid = cpfValidator(cpf);
    const isPasswordValid = passwordValidator(password);
    const isRegionValid = regionValidator(regionChoosed);

    if (!isCpfValid) return showCpfError();
    hideCpfError();
    if (!isPasswordValid) return showPasswordError();
    hidePasswordError();

    showLoadingSpin();
    disableRegisterInputs();
    cadastrar(cpfRaw(cpf));
  });

  const newRegisterButtonElement = getNewRegisterButtonElement();
  newRegisterButtonElement.addEventListener("click", async () => {
    await hideRegisterSuccess();
    const cpfElement = document.getElementById("cpf");
    cpfElement.value = "";
    const passwordElement = document.getElementById("password");
    passwordElement.value = "";
    enableRegisterInputs();
  });
});
