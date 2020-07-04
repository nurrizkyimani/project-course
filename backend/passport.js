const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const Student = require("./models/Student");
const passport = require("passport");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        callbackURL: "/auth/google/callback",
      },
      //get init data from the google server
      async function (accessToken, refreshToken, profile, done) {
        const newStudent = {
          googleID: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        console.log("newstudent");
        console.log(newStudent);
        //find the student data from mongo
        try {
          student = await Student.findOne({ googleID: profile.id });
          console.log(student);

          if (student) {
            console.log("student exist");
            done(null, student);
          } else {
            student = await Student.create(newStudent);
            console.log("student is created");
            done(null, student);
          }
          done(null, student);
        } catch (error) {
          console.log(error);
          throw new Error("Error in creating user ");
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("serializing start.");
    done(null, user.id);
    console.log("serializing done");
  });

  passport.deserializeUser(async (id, done) => {
    console.log("deserializing start.");
    try {
      const user = await Student.findById(id, (err, user) => done(err, user));
      console.log("user from deserializer");
      console.log(user);

      done(null, user);
    } catch (error) {
      done(new Error("Failed to deserialize user"));
    }
    console.log("deserialize done");
  });
};
