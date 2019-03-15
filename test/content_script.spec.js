const TESTS = true;
describe('getCorrect function', () => {
    it('is function', () => {
        expect(typeof getCorrect).toBe(typeof(() => {}));
    });

    it('passed one argument', () => {
        expect(getCorrect.length).toBe(1);
    });

    it('return correct answers', done => {
        const answers = [
            ['W systemie Windows wymagania co do złożoności hasła należy określić w', 'D'],
            ['Materiałem eksploatacyjnym w drukarce laserowej jest', 'B']
        ];

        const promises = [];

        answers.forEach(el => {
            promises.push(getCorrect(el[0]));
        });

        Promise
            .all(promises)
            .then(resps => {
                let corrects = answers.map(x => x[1]);
                corrects.forEach((correct, i) => {
                    expect(correct).toBe(resps[i]);
                });

                done();
            });
    });
});