const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./binance-app');

const BINANCE_API_KEY = 'API_KEY';
const BINANCE_API_SECRET = 'API_SECRET_KEY';


const exit = (request, response, next) => {
    localStorage.setItem(BINANCE_API_KEY, '');
    localStorage.setItem(BINANCE_API_SECRET, '');

    response.redirect('/');
};

module.exports = exit;