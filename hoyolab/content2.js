// target
const target = document.body;
let titlehead = null;
let title = null;
var isJapanese = false;


function includeJa(text) {
        try {
            let gmi = 'gmi';
            let regeIncludeHiragana = '^(?=.*[\u3041-\u3096]).*$';
            let regeIncludeKatakana = '^(?=.*[\u30A1-\u30FA]).*$';
            let regeIncludeKanji = '^(?=.*[\u4E00-\u9FFF]).*$';
            let regeHiragana = new RegExp(regeIncludeHiragana, gmi);
            let regeKatakana = new RegExp(regeIncludeKatakana, gmi);
            let regeKanji = new RegExp(regeIncludeKanji, gmi);

            let includeJa = false;
            if (regeHiragana.test(text))
                includeJa = true;
            if (regeKatakana.test(text))
                includeJa = true;
            if (regeKanji.test(text))
                includeJa = true;

            return includeJa;
        } catch (error) {
            alert(error);
        }
    }

// MO instance
const mutationObserver = new MutationObserver(callback);
// callback
function callback(mutations){
  //console.log(mutations);
  //mutations.forEach( mutation => {
    // console.log(mutation);
    let element = document.getElementsByClassName("mhy-article-card");
    console.log(element.length);
    for(let i = 0; i < element.length; i++){
      console.log(i);
      //console.log(element[i]);
      titlehead = element[i].getElementsByClassName("mhy-article-card__title");
      console.log(titlehead);
      title = titlehead[0].innerText;
/*
      for(var j=0; j < title.length; j++){
        if(title.charCodeAt(j) >= 256) {
          isJapanese = true;
        break;
      }else{
        isJapanese = false;
      }
      }
      */
      isJapanese = includeJa(title);
      console.log(title);
      console.log(isJapanese);

      if(isJapanese == false){
        element[i].remove();
      }

    }
;
}

// options
const option = {
  childList: true,
  subtree: true
};
// MO target & options
mutationObserver.observe(target, option);
