const routes = require('express').Router();

const start = require('./start');
const home = require('./home');
const history = require('./history');
const wallet = require('./wallet');
const exit = require('./exit');

routes.use('/', start);

routes.get('/', home);
routes.get('/wallet', wallet);
routes.get('/history', history);
routes.get('/exit', exit);

module.exports = routes;