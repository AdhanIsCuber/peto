const express = require('express');
const dictionary = express.Router();

dictionary.get('/', (req, res) => {
  res.render('dictionary', {
    layout: './layouts/default',
    title: 'Dictionary |'
  })
})

dictionary.get('/', (req, res) => {
  res.render('dictionary_detail', {
    layout: './layouts/default',
    title: 'Dictionary |'
  })
})

module.exports = dictionary;