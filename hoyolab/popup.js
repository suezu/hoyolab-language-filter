window.onload = () => {
  // LocalStorage上の設定を参照し、ボタンの状態を変更する。
  const jaFilterJson = localStorage.getItem('ja_filter');
  const jaFilter = jaFilterJson ? JSON.parse(jaFilterJson) : { enabled: true };

  if (jaFilter.enabled) {
    const radio = document.getElementById('jaFilterEnabled');
    radio.checked = true;
  } else {
    const radio = document.getElementById('jaFilterDisabled');
    radio.checked = true;
  }

  // HoYoLABのページを開いていない（拡張機能が有効なページ上ではない）場合、操作をさせない。
  // 好き勝手に操作をさせると、有効／無効の設定と実際の状態がズレるため。
  // ただ、複数のタブを開いて一方のタブで設定を変更しても、別タブの状態は変わらないので結局ズレることはある。
  // ここらへん何かうまいこと同期させる方法があれば改善してもらいたい・・・。
  chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, tabs => {
    const url = tabs[0].url;
    if (url.startsWith('https://www.hoyolab.com/'))
      return;

    const mainElement = document.getElementsByClassName('main')[0];
    const messageElement = document.createElement('p');
    const messageContent = document
      .createTextNode('HoYoLABのページを開いた状態で操作ください。');
    messageElement.appendChild(messageContent);
    mainElement.appendChild(messageElement);

    document.querySelectorAll('input').forEach(e => e.disabled = true);
  });

  // ボタン操作によるコールバック用のイベントを登録する。
  document.getElementsByName('jaFilter').forEach((radio) => {
    radio.addEventListener('change', (event) => {
      const filterEnabled = event.target.value.toLowerCase() === 'true';

      localStorage.setItem(
        'ja_filter', JSON.stringify({ enabled: filterEnabled })
      );

      const sendData = { jaFilterEnabled: filterEnabled };
      function sendMessage(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, sendData);
      }
      chrome.tabs.query({ active: true, currentWindow: true }, sendMessage);
    });
  });
}
