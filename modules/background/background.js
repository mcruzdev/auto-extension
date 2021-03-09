const interval = setInterval(() => {
  const cpfInput = document.getElementById("cpf");
  if (cpfInput) {
    clearInterval(interval);

    cpfInput.value = "294627176";
  }
}, 1000);

console.log("Lendo brackground");
