const express = require('express');
const account = express.Router();

account.get('/', (req, res) => {
  res.render('account', {
    layout: './layouts/default'
  });
});


module.exports = account;