const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');
const login = require('./app/login');
const helps = require('./app/helps');
const account = require('./app/account');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css'));

hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/index.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/base');
hbs.registerPartials(__dirname + '/views/components');
hbs.registerPartials(__dirname + '/views/dummy');

app.use('/login', login);
app.use('/helps', helps);
app.use('/account', account);

app.get('/', (req, res) => {
  res.render('index', {
    layout: './layouts/default'
  });
});

app.listen(8000, (req, res) => {
  console.log('server peto on http://127.0.0.1:8000')
})

module.exports = app;