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
            googleID: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
        }

        console.log(newStudent);
        
        try {
            student = await Student.findOne({googleId: profile.id})
            if(student){
                done(null,student)

            } else {
                student = await Student.create(newStudent)
                done(null, student)
            }
            done(null, student)
        } catch (error) {
            console.log(error);
            done(error)
        }
    }));

    passport.serializeUser((user, done) => {
        console.log('serializing start.');
        done(null, user.id)
        console.log('serializing done');
    })
    
    passport.deserializeUser((id, done) => {
        console.log('deserializing start.');
        Student.findById(id, (err, user) => done(err, user))
        console.log('deserialize done');
      })


    
}      