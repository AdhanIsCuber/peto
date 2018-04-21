const express = require('express');
const login = express.Router();

login.get('/', (req, res) => {
  res.render('login', {
    layout: './layouts/default'
  })
})


module.exports = login;