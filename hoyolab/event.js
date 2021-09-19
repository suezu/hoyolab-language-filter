chrome.runtime.onInstalled.addListener(function () {
  const parentMenu = chrome.contextMenus.create({
    type: "normal",
    id: "parent",
    title: "HoYoLAB日本語フィルター"
  });

  chrome.contextMenus.create({
    parentId: parentMenu,
    type: "radio",
    id: "true",
    title: "ON",
    checked: true
  });

  chrome.contextMenus.create({
    parentId: parentMenu,
    type: "radio",
    id: "false",
    title: "OFF"
  });
});

chrome.contextMenus.onClicked.addListener(function (item) {
  const sendData = { jaFilterEnabled: item.menuItemId.toLowerCase() === 'true' };
  function sendMessage(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, sendData);
  }
  chrome.tabs.query({ active: true, currentWindow: true }, sendMessage);
});
