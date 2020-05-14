const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
};

// module.exports = { generateMessage }
// same as the below, prefer the below tho ;-)
// exports.generateMessage = generateMessage;
// or even better still, since we just exporting a single function (*-*)
// module.exports = generateMessage;
/**
 * we no longer exporting just one function ^-^
 */
// module.exports = {
//     generateMessage,
//     generateLocationMessage
// };
/**
 * or my preference
 */
exports.generateMessage = generateMessage;
exports.generateLocationMessage = generateLocationMessage;