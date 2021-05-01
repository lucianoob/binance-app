const cookie = require('cookie');

const BINANCE_API_KEY = 'API_KEY';
const BINANCE_API_SECRET = 'API_SECRET_KEY';
const cookieValid = 60 * 60 * 24 * 7;

const config = (request, response, next) => {
    const cookies = cookie.parse(request.headers.cookie || '');
    const binanceApiKey = cookies[BINANCE_API_KEY];
    const binanceApiSecret = cookies[BINANCE_API_SECRET];

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

            response.setHeader('Set-Cookie', [
                cookie.serialize(BINANCE_API_KEY, apiKey, {
                    maxAge: cookieValid
                }),
                cookie.serialize(BINANCE_API_SECRET, apiSecret, {
                    maxAge: cookieValid
                })
            ]);

            response.redirect('/');
        } else {
            response.render('pages/start');
        }
    }
};

module.exports = config;