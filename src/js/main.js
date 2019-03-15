/* eslint-disable no-undef */

function openUrl(url) {
    chrome.tabs.query({
        active: true
    }, ([tab]) => {
        chrome.tabs.executeScript(tab.id, {
            code: `window.open('${url}')`
        });
    });
}

document.querySelector('.settings').addEventListener('submit', ev => {
    ev.preventDefault();
    const max = document.getElementById('max-percents').value;
    const min = document.getElementById('min-percents').value;
    let iters = document.getElementById('iterations').value;

    // eslint-disable-next-line
    for(;iters>0;--iters) {
        chrome.tabs.query({
            url: 'https://www.testy.egzaminzawodowy.info/question.php*'
        // eslint-disable-next-line no-loop-func
        }, ([tab]) => {
            if (tab === undefined) {
                alert('Najpierw otwórz kartę z egzaminem');
                openUrl('https://www.testy.egzaminzawodowy.info/technik-informatyk');
                return;
            }

            chrome.runtime.sendMessage({
                percents: Math.floor(Math.random() * (max - min) + min)
            });
        });
    }
});