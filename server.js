require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.use('/', routes);
 
app.listen(process.env.APP_PORT);