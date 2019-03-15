/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function play() {
    chrome.tabs.query({
        url: 'https://www.testy.egzaminzawodowy.info/question.php*'
    }, ([tab]) => {
        chrome.tabs.executeScript(tab.id, {
            file: 'js/content_script.js'
        });
    });
}

chrome.runtime.onMessage.addListener(() => {
    setTimeout(play, 700);
});

// TODO: % poprawnych odpowiedzi
// TODO: wysyłanie testu