module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('login', {
      layout: './layouts/default'
    })
  })

  app.post('/login', (req, res) => {
    console.log('log')
  })

  app.post('signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  })
};

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}