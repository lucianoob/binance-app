const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./localstorage');

const BINANCE_API_KEY = 'API_KEY';
const BINANCE_API_SECRET = 'API_SECRET_KEY';


const config = (request, response, next) => {
    const binanceApiKey = localStorage.getItem(BINANCE_API_KEY);
    const binanceApiSecret = localStorage.getItem(BINANCE_API_SECRET);

    if(binanceApiKey && binanceApiSecret) {
        process.env['API_KEY'] = binanceApiKey;
        process.env['API_SECRET_KEY'] = binanceApiSecret;

        next();
    } else {
        const body = request.body;
        const apiKey = body.textApiKey || null;
        const apiSecret = body.textApiSecretKey || null;

        if(apiKey && apiSecret) {
            process.env['API_KEY'] = apiKey;
            process.env['API_SECRET_KEY'] = apiSecret;

            localStorage.setItem(BINANCE_API_KEY, apiKey);
            localStorage.setItem(BINANCE_API_SECRET, apiSecret);

            response.redirect('/');
        } else {
            response.render('pages/start');
        }
    }
};

module.exports = config;