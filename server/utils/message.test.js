const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        let from = "Lucy";
        let latitude = 108;
        let longitude = 26;
        let url = `https://google.com/maps?q=${latitude},${longitude}`;
        let message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message.url).toEqual(url);
        expect(message).toInclude({
            from,
            url
        })
    });
});