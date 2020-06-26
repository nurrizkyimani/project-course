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
        const newStudent = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
        }
        
        try {
            student = await Student.findOne({googleId: profile.id})
            if(student){
                done(null,student)
            } else {
                student = await Student.create({newStudent})
                done(null, student)
            }
            done(null, student)
        } catch (error) {
            console.log(error);
            done(error)
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })


    
}      