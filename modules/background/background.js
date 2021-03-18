const showNotification = (params) => {
  chrome.notifications.create("", {
    type: "basic",
    iconUrl: chrome.runtime.getURL(
      "./img/logo-ae-digitals-with-background.png"
    ),
    title: params.title,
    message: params.message,
    requireInteraction: true,
    priority: 2,
  });
};

const api = {
  submitCpf: async (cpf) => {
    return await fetch(
      "http://ec2-18-228-118-253.sa-east-1.compute.amazonaws.com:8080/api/v1/pe",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        method: "POST",
        body: JSON.stringify({ cpf }),
      }
    );
  },
};

const postCpf = (cpf) => {
  try {
    api
      .submitCpf(cpf)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          const notificationParams = {
            title: "AE Digitals",
            message: `${data.alunoName}, seu cadastro foi realizado com sucesso`,
          };
          showNotification(notificationParams);
          alert(notificationParams.message);
        } else {
          const data = await res.json();
          const notificationParams = {
            title: "AE Digitals",
            message: `${data.alunoName}, não foi possível realizar seu cadastro, tente novamente :(`,
          };
          showNotification(notificationParams);
          alert(notificationParams.message);
        }
      })
      .catch(() => {
        const notificationParams = {
          title: "AE Digitals",
          message: "Não foi possível realizar seu cadastro, tente novamente :(",
        };
        showNotification(notificationParams);
        alert(notificationParams.message);
      });
  } catch (err) {
    const notificationParams = {
      title: "AE Digitals",
      message: "Não foi possível realizar seu cadastro, tente novamente :(",
    };
    showNotification(notificationParams);
    alert(notificationParams.message);
  }
};

chrome.runtime.onMessage.addListener((cpf) => {
  postCpf(cpf);
});
