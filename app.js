require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');

const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const mlabPetoDB = process.env.MLAB_DATABASE_PETO;

// configuration connect DB
mongoose.connect(mlabPetoDB);
require('./config/passport')(passport);

// route
const login = require('./app/login')(app, passport);
const helps = require('./app/helps')(app, passport);
const account = require('./app/account')(app, passport);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

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


app.listen(8000, (req, res) => {
  console.log('server peto on http://127.0.0.1:8000')
})

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index', {
      layout: './layouts/default'
    });
  });
}