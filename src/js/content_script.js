const API = 'https://my-bot-helper.herokuapp.com/';

function reply(correct = 0) {
    const resps = [...document.querySelectorAll('.test table tr')].slice(1, -1);
    resps[correct].childNodes[1].childNodes[1].click();
    document.querySelectorAll('.button')[2].click();
}

function getCorrect(ask) {
    return new Promise((resolve) => {
        while (/\s/.test(ask)) {
            ask = ask.replace(' ', '+');
        }

        fetch(API + '?q=' + ask)
            .then(x => x.text())
            .then(resp => {
                let doc = new DOMParser;
                doc = doc.parseFromString(resp, 'text/html');
                doc = doc.querySelector('.jump-link a').href.replace('#more', '');

                fetch(API + '?link=' + doc)
                    .then(x => x.text())
                    .then(resp => {
                        doc = new DOMParser;
                        doc = doc.parseFromString(resp, 'text/html');
                        [, doc] = doc.querySelectorAll('b');
                        resolve(doc.innerHTML);
                    });
            });
    });
}

if (typeof TESTS === 'undefined') {
    let ask = document.querySelector('.intertext1 td').innerText;
    [, ask] = ask.match(/\s(.+)\n/);

    getCorrect(ask)
        .then(correct => {
            correct = ({
                A: 0,
                B: 1,
                C: 2,
                D: 3
            })[correct];

            reply(correct);
        });
}