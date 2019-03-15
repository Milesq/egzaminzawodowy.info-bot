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

function rand(min, max) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);

    if (min > max) {
        const tmp = min;
        min = max;
        max = tmp;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}

if (typeof TESTS === 'undefined') {
    document.querySelector('.settings').addEventListener('submit', ev => {
        ev.preventDefault();
        const max = document.getElementById('max-percents').value;
        const min = document.getElementById('min-percents').value;

        // eslint-disable-next-line
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
                percents: rand(min, max)
            });
        });
    });
}