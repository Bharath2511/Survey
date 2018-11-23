const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  //this id is doc's id
  //console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken, refreshToken, profile);
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        //we already have record of the user
        return done(null, existinguser);
      }

      //make a new record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
