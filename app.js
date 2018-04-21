const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');
const login = require('./app/login');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css'));

hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/index.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/base');
hbs.registerPartials(__dirname + '/views/components');

app.use('/login', login);

app.get('/', (req, res) => {
  res.render('index', {
    layout: './layouts/default'
  });
});

app.listen(7000, (req, res) => {
  console.log('server wiryaramadhan on http://127.0.0.1:7000')
})

module.exports = app;