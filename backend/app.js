const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDatabase = require("./mongodb");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
dotenv.config({ path: "./config/config.env" });

const { authCheck } = require("./middleware/auth");

//passport config
require("./passport")(passport);
//database init
connectDatabase();

//expresss init
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//connect bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.disable("x-powered-by");

// create cookie session
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

//Sessions;
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(
  cors({
    origin: "http://localhost:3001", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(cookieParser());
//Passport js middleware
app.use(passport.initialize());
//passport session
app.use(passport.session());

// ROUTE
// app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/review", require("./routes/reviewRoutes"));

//send status cookies if authenticated;
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

//PORT
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`PORT LISTEN TO ${process.env.NODE_ENV} mode on port ${PORT}`)
);
