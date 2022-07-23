const User = require("./user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
      console.log("ok")
      User.findOne({ email: username}, (err, user) => {
        if (err) throw err;
        if (!user)return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );


  passport.serializeUser((user, cb) => {
    cb(null, user.id, user.email);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
      email: user.email,
      };
      cb(err, userInformation);
    });
  });
}
