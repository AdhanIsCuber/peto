const LocalStrategy = require('passport-local').Strategy;
const Users = require('../app/models/Users');

module.exports = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    Users.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email 
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function () {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Users.findOne({
          'user.username': username
        }, function (err, user) {
          // if there are any errors, return the error
          if (err)
            return done(err);

          // check to see if theres already a user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {

            // if there is no user with that email
            // create the user
            var newUser = new Users();

            // set the user's local credentials
            newUser.user.firstname = req.param('firstname');
            newUser.user.lastname = req.param('lastname');
            newUser.user.usermail = req.param('usermail');
            newUser.user.username = username;
            newUser.user.password = newUser.generateHash(password);

            // save the user
            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));
}