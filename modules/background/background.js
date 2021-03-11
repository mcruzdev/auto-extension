const interval = setInterval(() => {
  const tokenGoogle = document.getElementById("g-recaptcha-response");
  if (tokenGoogle) {
    clearInterval(interval);
    console.log(tokenGoogle);
  }
}, 1000);

console.log("Lendo brackground");

chrome.webRequest.onCompleted.addListener(
  function (details) {
    var extension = details.url.split(".").pop();
    if (extension == "m3u8") {
      console.debug(details.url);
    }
  },
  {
    urls: ["<all_urls>"],
  }
);
