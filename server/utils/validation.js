var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

exports.isRealString = isRealString;