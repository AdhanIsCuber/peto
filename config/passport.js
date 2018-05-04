const LocalStrategy = require('passport-local').Strategy;
const Users = require('../app/models/Users');

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Users.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      process.nextTick(function () {
        Users.findOne({
          'user.username': username
        }, function (err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            var newUser = new Users();

            newUser.user.firstname = req.param('firstname');
            newUser.user.lastname = req.param('lastname');
            newUser.user.usermail = req.param('usermail');
            newUser.user.username = username;
            newUser.user.password = newUser.generateHash(password);

            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));

  // LOCAL LOGIN
  passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      Users.findOne({
        'user.username': username
      }, function (err, user) {
        if (err)
          return done(err);
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        return done(null, user);
      });
    }));
};