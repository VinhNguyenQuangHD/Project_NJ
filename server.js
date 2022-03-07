require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/User");
const user_routes = require('./routes/user.routes');
const bcrypt = require("bcryptjs");
const morgan = require("morgan");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middleware/auth");
const body_parser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (email) => {
    const userFound = await User.findOne({ email });
    return userFound;
  },
  async (id) => {
    const userFound = await User.findOne({ _id: id });
    return userFound;
  }
);

//Xac dinh view qua form
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.urlencoded({ extended: true }));
app.use(flash());
app.use(
  //Luu phien dang nhap tai mot cong nhat dinh nao do
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use('/register', user_routes);
app.use('/', require('../Project_NJ/routes/crud_router'));

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index", { name: req.user.name });
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});


//Chuc nang dang nhap
app.post(
  "/login",
  checkNotAuthenticated,
  //Chuyen huong toi trang chu neu dang nhap thanh cong
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

//Chuc nang dang ky
app.post("/register", checkNotAuthenticated, async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
   if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("/register");
  }else{
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

//Chuc nang Log Out
app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

//Ket noi voi MongoDB
mongoose
  .connect("mongodb://localhost:27017/auth", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server: http://localhost:${PORT}`);
    });
  });