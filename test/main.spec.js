describe('random function', () => {
    it('exists', () => {
        expect(typeof rand).toBe('function');
    });

    it('return correct number', () => {
        for(let i=0;i<5;++i) {
            expect(rand(17, 98)).toBeGreaterThanOrEqual(17);
            expect(rand(17, 98)).toBeLessThanOrEqual(98);
        }
    });
});