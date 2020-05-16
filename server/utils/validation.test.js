const { isRealString } = require('./validation');
const expect = require('expect');

describe('isRealString validation', () => {
    it('should return false if paramter is not a string or is empty', () => {
        let invalidParams = [" ", 1, {}];
        invalidParams.forEach((e) => {
            let res = isRealString(e);
            expect(res).toBeFalsy();
        })
    });

    it('should return true if paramter is a string', () => {
        let validParams = "Ossy";
        const res = isRealString(validParams)
        expect(res).toBe(true);
    });
});
