const cookie = require('cookie');

const BINANCE_API_KEY = 'API_KEY';
const BINANCE_API_SECRET = 'API_SECRET_KEY';


const exit = (request, response, next) => {
    response.setHeader('Set-Cookie', [
        cookie.serialize(BINANCE_API_KEY, ''),
        cookie.serialize(BINANCE_API_SECRET, '')
    ]);

    response.redirect('/');
};

module.exports = exit;