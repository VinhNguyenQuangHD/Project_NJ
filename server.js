require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/User");
const Infor_s = require("./models/Infor");
const user_routes = require('./routes/user.routes');
const bcrypt = require("bcryptjs");
const morgan = require("morgan");
const web_rtc = require('wrtc');


const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middleware/auth");
const body_parser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;
const server_connection = require('http').Server(app);
const io = require('socket.io')(server_connection);



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
  },
);

//Xac dinh view qua form
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json());
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
//app.use('/', user_routes);
app.use('/', require('../Project_NJ/routes/crud_router'));


const axios = require('axios');
const controller = require('../Project_NJ/controller/chude_controller');
const controller1 = require('../Project_NJ/controller/loaisp_controller');

app.get("/", checkAuthenticated, (req, res) => {
  let urls = ['http://localhost:8080/api/topic', 'http://localhost:8080/api/protype'];

  axios.all(urls.map((url) => axios.get(url))).then(
    axios.spread((resp,resp2) =>{
      res.render("index", {topic: resp.data, prop: resp2.data, id: req.user._id});
    })
  );

});

app.get('/api/topic', controller.topic_read );
app.get('/api/protype', controller1.read_new_produce_type );

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

var User_Detail = require('../Project_NJ/models/Infor');
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
        codename: req.body.name,
        ages: 0,
        gender: 'Unknown',
        sociallink: 'Unknown',

      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

//Ket noi

app.get("/live-stream", (req,res) =>{
  res.render("livestream");
})
app.get("/viewer-side", (req,res) =>{
  res.render("viewer_screne");
})

app.post('/consumer', async ({ body }, res) => {
  const peer = new web_rtc.RTCPeerConnection({
      iceServers: [
          {
              urls: "stun:stun.stunprotocol.org"
          }
      ]
  });
  const desc = new web_rtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
      sdp: peer.localDescription
  }

  res.json(payload);
});


app.post('/broadcast', async ({ body }, res) => {
  const peer = new web_rtc.RTCPeerConnection({
      iceServers: [
          {
              urls: "stun:stun.stunprotocol.org"
          }
      ]
  });
  peer.ontrack = (e) => handleTrackEvent(e, peer);
  const desc = new web_rtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
      sdp: peer.localDescription
  }

  res.json(payload);
});

function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
};


//Ket noi voi MongoDB
mongoose
  .connect("mongodb://0.0.0.0:27017/auth", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server: http://localhost:${PORT}`);
    });
  });