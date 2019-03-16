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

if (typeof TESTS === 'undefined') {
    document.querySelector('.settings').addEventListener('submit', ev => {
        ev.preventDefault();

        const percents = document.getElementById('percents').value;

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

            chrome.storage.local.set({ percents }, () => {
                chrome.runtime.sendMessage('ok');
            });
        });
    });
}