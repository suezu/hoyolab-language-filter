chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const key = 'ja_filter';

  if (request.method === 'getItem') {
    sendResponse({ value: localStorage.getItem(key) });
    return;
  }
  if (request.method === 'setItem') {
    localStorage.setItem(key, request.value);
    return;
  }
});
