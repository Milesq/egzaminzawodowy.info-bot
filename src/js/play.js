/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function play(percents) {
    chrome.tabs.query({
        url: 'https://www.testy.egzaminzawodowy.info/question.php*'
    }, ([tab]) => {
        // for (let i = 0; i < 40; ++i) {
        chrome.tabs.executeScript(tab.id, {
            file: 'js/content_script.js'
        });
        // }
    });
}

chrome.runtime.onMessage.addListener((req) => {
    play(req.percents);
});