const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');

passport.seralizeUser((user, done) => {
    done(null, user._id)
});

passport.deseralizeUser((userID, done) => {
    User.findById(userID)
        .then(user => done(null, user))
});

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.CLIENT_ID,
    clientSecret: keys.google.CLIENT_SECRET
}, (accessToken,
    refreshToken,
    profile,
    done) => {

    User.findOne({googleID: profile.id})
        .then(currentUser => {
            if(!currentUser) {
                let newUser = {
                    username: profile.displayName,
                    googleID: profile.id,
                    name: {
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName
                    }
                };

                new User(newUser)
                    .save()
                    .then(res => {
                        console.log(`New user created: ${res}`);
                        done(null, currentUser)
                    })
                    .catch(err => {
                        console.log(`Error while creating new user: ${err}`);
                        done(true, currentUser)
                    })
            }
            else{
                console.log(`User loged in: ${currentUser}`);
                done(null, currentUser)
            }
        })
}));