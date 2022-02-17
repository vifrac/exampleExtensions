var manifest = browser.runtime.getManifest();
console.log("desde background : " + manifest.name);

function logTabs(tabs) {
  console.log(tabs);
}

browser.tabs.query({ currentWindow: true }, logTabs);

let querying = browser.tabs.query({});
console.log(querying);
let querying1 = browser.tabs.query({ active: true });
console.log(querying1);

function logCookie(c) {
  console.log(c);
}

function logError(e) {
  console.error(e);
}

let setCookie = browser.cookies.set({
  url: "https://vifrac.com/",
  name: "testCookies",
});
setCookie.then(logCookie, logError);

console.log(setCookie);
