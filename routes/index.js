const routes = require('express').Router();

const home = require('./home');
const history = require('./history');
const wallet = require('./wallet');

routes.get('/', home);
routes.get('/wallet', wallet);
routes.get('/history', history);

module.exports = routes;