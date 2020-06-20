const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')

const Student = require('./models/Student');
const passport = require('passport');


module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: '/auth/google/callback'
    },
    async function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        
        console.log(profile);
    }));

    passport.serializeUser((user, done) => {done(null, user.id);
        
    }); 
    passport.deserializeUser((id, done)=> {
        // User.findById(id, (err, user)=> {
        // done(err, user);
        // });
    });


    
}      