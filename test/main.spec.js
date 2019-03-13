describe('hello function', () => {
    it('exists', () => {
        expect(typeof hello).toBe(typeof (() => { }));
    });

    it('return "hello world"', () => {
        expect(hello()).toBe('hello world');
    });
});