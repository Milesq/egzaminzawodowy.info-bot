/* eslint-disable */
describe('play function', () => {
    it('is function', () => {
        expect(play).toBeDefined();
        expect(typeof play).toBe(typeof (() => {}));
    });

    it('passed one argument', () => {
        expect(play.length).toBe(1);
    });
});