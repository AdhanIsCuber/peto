module.exports = (app, passport) => {
  app.get('/account', (req, res) => {
    res.render('account', {
      layout: './layouts/default',
      title: 'Account |'
    });
  });
}