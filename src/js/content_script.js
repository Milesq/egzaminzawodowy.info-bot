const API = 'https://my-bot-helper.herokuapp.com/';

function reply(correct) {
    let resps = [...document.querySelectorAll('.test table tr label')].slice(0, -1);

    try {
        correct = resps
            .findIndex(el => el.innerHTML.replace('.', '') === correct.replace('.', ''));
    } catch (err) {
        correct = 0;
    }

    resps = [...document.querySelectorAll('.test table tr')].slice(1, -1);
    resps[correct].childNodes[1].childNodes[1].click(); // correct answer

    let sender = document.querySelectorAll('.button');
    sender = (sender[1].disabled) ? sender[2] : sender[1];

    sender.click();
}

function getCorrect(ask) {
    return new Promise((resolve) => {
        while (/\s/.test(ask)) {
            ask = ask.replace(' ', '+');
        }

        fetch(API + '?q=' + ask)
            .then(x => x.text())
            .then(resp => {
                try {
                    let doc = new DOMParser;
                    doc = doc.parseFromString(resp, 'text/html');
                    doc = doc.querySelector('.jump-link a').href.replace('#more', '');

                    fetch(API + '?link=' + doc)
                        .then(x => x.text())
                        .then(resp => {
                            doc = new DOMParser;
                            doc = doc.parseFromString(resp, 'text/html');
                            let correct = doc.querySelectorAll('b');
                            correct = correct[correct.length - 1];
                            doc = [...doc.querySelector('ol').children].map(x => x.innerText);

                            correct = ({
                                A: 0,
                                B: 1,
                                C: 2,
                                D: 3
                            })[correct.innerHTML];

                            resolve(doc[correct]);
                        });
                } catch (err) {
                    resolve(0);
                }
            });
    });
}

if (typeof TESTS === 'undefined') {
    let ask = document.querySelector('.intertext1 td').innerText;
    [, ask] = ask.match(/\s(.+)\n/);

    // eslint-disable-next-line
    chrome.storage.local.get(['percents'], res => {
        console.log('next');

        if (Math.random() * 100 > res.percents) {
            // eslint-disable-next-line
            chrome.runtime.sendMessage(chrome.runtime.id, 'ok');
            reply(0);
        } else {
            getCorrect(ask)
                .then(correct => {
                    // eslint-disable-next-line
                    chrome.runtime.sendMessage(chrome.runtime.id, 'ok');
                    reply(correct);
                });
        }
    });
}