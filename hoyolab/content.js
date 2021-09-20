function includeJa(text) {
  try {
    const flag = 'gmi';
    const regexIncludeHiragana = '^(?=.*[\u3041-\u3096]).*$';
    const regexIncludeKatakana = '^(?=.*[\u30A1-\u30FA]).*$';
    const regexIncludeKanji = '^(?=.*[\u4E00-\u9FFF]).*$';
    const regexHiragana = new RegExp(regexIncludeHiragana, flag);
    const regexKatakana = new RegExp(regexIncludeKatakana, flag);
    const regexKanji = new RegExp(regexIncludeKanji, flag);

    if (regexHiragana.test(text))
      return true;
    if (regexKatakana.test(text))
      return true;
    if (regexKanji.test(text))
      return true;
    return false;
  } catch (error) {
    console.error(error);
    return true;
  }
}

function callback(mutations) {
  const elements = document.getElementsByClassName('mhy-article-card');

  for (let i = 0; i < elements.length; i++) {
    const titleHeads = elements[i]
      .getElementsByClassName('mhy-article-card__title');
    const title = titleHeads[0].innerText;

    if (!includeJa(title))
      elements[i].remove();
  }
}

const mutationObserver = new MutationObserver(callback);
const target = document.body;
const option = { childList: true, subtree: true };

chrome.runtime.sendMessage({ method: 'getItem' }, (response) => {
  const jaFilterJson = response.value;
  const jaFilter = jaFilterJson ? JSON.parse(jaFilterJson) : { enabled: true };

  if (jaFilter.enabled) {
    mutationObserver.observe(target, option);
  } else {
    mutationObserver.disconnect();
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
  chrome.runtime.sendMessage({
    method: 'setItem',
    value: JSON.stringify({ enabled: request.jaFilterEnabled })
  });

  if (request.jaFilterEnabled) {
    mutationObserver.observe(target, option);
    console.log('Japanese language filter enabled.');
  } else {
    mutationObserver.disconnect();
    console.log('Japanese language filter disabled.');
  }
});
