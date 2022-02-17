var manifest = browser.runtime.getManifest();

console.log("desde script : 1" + manifest.name);

function logTabs(tabs) {
  console.log(tabs);
}

browser.tabs.query({ currentWindow: true }, logTabs);

function logTabs1(tabs) {
  console.log(tabs);
}

browser.tabs.query(logTabs1);
