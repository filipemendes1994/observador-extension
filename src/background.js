const urlPrefix = 'https://observador.pt/';

chrome.tabs.onUpdated.addListener((tabId, { status }, { url }) => {
  if (status !== 'complete') {
    return;
  }

  if (url.startsWith(urlPrefix)) {
    chrome.tabs.sendMessage(tabId, { command: 'unlock' });
  }
});
