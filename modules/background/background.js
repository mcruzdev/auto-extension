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
      body: JSON.stringify({ cpf, rg: "" }),
    });
  },
};

const postCpf = (cpf) => {
  api.submitCpf(cpf).then(async (res) => {
    if (res.ok) {
      const notificationParams = {
        title: "Mateus só faz gambiarra",
        message: "Oiceotse god of proramming",
      };
      showNotification(notificationParams);
      const json = await res.json();
    } else {
      alert(`Failed Status: `);
      enableRegisterInputs();
      hideLoadingSpin();
    }
  });
};

chrome.runtime.onMessage.addListener(postCpf);
