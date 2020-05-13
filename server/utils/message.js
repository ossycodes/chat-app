var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

// module.exports = { generateMessage }
// same as the below, prefer the below tho ;-)
// exports.generateMessage = generateMessage;
// or even better still, since we just exporting a single function (*-*)
module.exports = generateMessage;