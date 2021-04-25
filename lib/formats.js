exports.formatToUSD = (amount, digits = 8) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digits }).format(amount);
};

exports.formatToCurrency = (amount, digits = 8) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: digits }).format(amount);
};

exports.formatCalcToPercent = (amount, ref) => {
    return this.formatToPercent(1-(amount/ref))*100;
};

exports.formatToPercent = (amount) => {
    return Math.ceil(amount*100)/100;
};