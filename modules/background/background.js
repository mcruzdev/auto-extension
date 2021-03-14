const showNotification = (params) => {
  chrome.notifications.create("", {
    type: "basic",
    iconUrl: chrome.runtime.getURL(
      "./img/logo-ae-digitals-with-background.png"
    ),
    title: params.title,
    message: params.message,
  });
};

const api = {
  submitCpf: async (cpf) => {
    return await fetch("http://18.229.118.15:8080/api/v1/pe", {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      method: "POST",
      body: JSON.stringify({ cpf, rg: "264133341" }),
    });
  },
};

const postCpf = (cpf) => {
  api.submitCpf(cpf).then(async (res) => {
    if (res.ok) {
      const notificationParams = {
        title: "AE Digitals",
        message: "Seu cadastro foi realizado com sucesso",
      };
      alert(notificationParams.message);
      showNotification(notificationParams);
    } else {
      const notificationParams = {
        title: "AE Digitals",
        message: "Não foi possível realizar seu cadastro, tente novamente :(",
      };
      showNotification(notificationParams);
      alert(notificationParams.message);
      enableRegisterInputs();
      hideLoadingSpin();
    }
  });
};

chrome.runtime.onMessage.addListener(postCpf);
