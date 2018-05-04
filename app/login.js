module.exports = (app, passport) => {
  app.get('/', isLoggedIn, (req, res) => {
    res.render('index', {
      layout: './layouts/default',
      user: req.user
    });
  });

  app.get('/login', (req, res) => {
    res.render('login', {
      layout: './layouts/default',
      title: 'Login |',
      user: req.user
    })
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.post('/logout', (req, res) => {
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