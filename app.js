require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');
const helper = require('handlebars-helpers')({
  hbs: hbs
});;

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
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css'));
// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(require('flash')()); // use connect-flash for flash messages stored in session

hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/index.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/base');
hbs.registerPartials(__dirname + '/views/components');
hbs.registerPartials(__dirname + '/views/dummy');

require('./app/login')(app, passport);

app.listen(8000, (req, res) => {
  console.log('server peto on http://127.0.0.1:8000')
})