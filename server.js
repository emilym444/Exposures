//
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var http = require("http");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
require("dotenv").config();
const User = require("./user");
const port = 5000;

const app = express();
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/exposuresDB",
  { useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
// cors_proxy.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).listen(port, host, function() {
//     console.log('Running CORS Anywhere on ' + host + ':' + port);
// });
app.use(
  session({
    secret: "a secret only tuna could keep.",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);
app.use(cookieParser("a secret a tuna could keep!"));
app.use(passport.initialize());
app.use(passport.session());
// if (process.env.NODE_ENV === "production"){
//   app.use(express.static("client/build"));
// }

require("./passportConfig")(passport);

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    if (err) {
      res.status(500).json({response: "Houston we have a problem"});
    }
    if (!user) {
      res
        .status(400)
        .json({isLoggedIn: false, status: "Wrong username or password!"});
      console.log("not good");
    } else {
      req.logIn(user, err => {
        if (err) {
          res.status(500).send({response: "Houston we have a problem"});
        } else {
          res.status(200).json({isLoggedIn: true, email: req.user.email});
          console.log("good");
          console.log(req.user.email);
        }
      });
    }
  })(req, res, next);
});

// app.get("/user" , function(req, res) {
//   console.log(req.user.username);
//   if (req.user) {
//     res.status(200).json({
//       isLoggedIn: true,
//       username: user.username
//     });
//     console.log("good");
//   } else {
//     res.status(400).json({
//       isLoggedIn: false,
//       status: "Wrong username or password!"
//     });
//     console.log("not good");
//   }
// });

app.post("/register", async (req, res) => {
  User.findOne(
    {
      email: req.body.email
    },
    async (err, foundUser) => {
      if (err) {
        console.log(err);
      } else if (foundUser) {
        res.send("User Exists");
      } else if (!foundUser) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          email: req.body.email,
          password: hashedPassword
        });
        const registeredUser = await newUser.save();
        req.logIn(registeredUser, err => {
          // console.log(registeredUser);
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({isLoggedIn: true, email: req.user.email});
            // console.log("good");
            // console.log(req.user.email);
          }
        });
      }
    }
  );
});
//     if (err) {
//       console.log(err);
//       res.status(500).json({
//         response: "Houston we have a problem"
//       });
//     }
//     if (!user) {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
//       const newUser = new User({
//         email: req.body.email,
//         password: hashedPassword
//       });
//       const registeredUser = newUser.save();
//       await req.login(registeredUser);
//
//     }
//   })(req, res, next);
// });
app.get("/account", function(req, res) {
  User.findOne(
    {
      email: req.user.email
    },
    function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        foundUser.remove(req.user.email);
        res.send("good");
      }
    }
  );
});
// app.delete("/account/:id", function(req, res) {
//   const user = req.params.id;
//   console.log(user);
//   db.collection("user").findOneAndDelete({_id: user}, (err, result) => {
//     if (result) {
//       return res.status(200).json({isLoggedIn: true, email: req.user.email});
//       console.log("got deleted");
//     } else {
//       res.send(err);
//     }
//   });
// });

app.post("/journal", function(req, res) {
  var entry = req.body.entries;
  // console.log(entry);
  // console.log(entry.exposure);
  if (!entry.exposure) {
    return res.status(400).json({error_msg: "Require exposure"});
  }
  if (!entry.description) {
    return res
      .status(400)
      .json({status_code: 0, error_msg: "Require description"});
  }
  if (!entry.feeling) {
    return res.status(400).json({status_code: 0, error_msg: "Require feeling"});
  }
  if (!entry.date) {
    return res.status(400).json({status_code: 0, error_msg: "Require date"});
  }
  if (!entry.tag) {
    return res.status(400).json({status_code: 0, error_msg: "Require tag"});
  } else {
    User.findOne(
      {
        email: req.user.email
      },
      function(err, foundUser) {
        if (err) {
          console.log(err);
        } else {
          foundUser.entries.push(req.body.entries);
          // console.log(req.body.entries);
          foundUser.save();
          res.send("good");
        }
      }
    );
  }
});

app.get("/journal", function(req, res) {
  User.findOne(
    {
      email: req.user.email
    },
    function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        // console.log(req.user.email);
        // console.log("tuna is fat");
        res.send(foundUser.entries);
      }
    }
  );
});

app.get("/journal/:id", function(req, res, next) {
  console.log(req.params.id);
  console.log("hi");
  User.findOne(
    {
      email: req.user.email
    },
    function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundUser.entries);
        foundUser.entries.remove(req.params.id);
        // console.log(req.body.entries);
        foundUser.save();
        res.send("good");
      }
    }
  );
});

app.post("/ladder", function(req, res) {
  var tags = req.body.tags;
  console.log(tags);
  if (!tags.concern) {
    console.log("not cool");
    return res.status(400).json({status_code: 0, error_msg: "Require tag"});
  } else {
    User.findOne(
      {
        email: req.user.email
      },
      function(err, foundUser) {
        if (err) {
          console.log(err);
        } else {
          foundUser.tags.push(req.body.tags);
          console.log(req.body.tags);
          foundUser.save();
          res.send(foundUser.tags);
        }
      }
    );
  }
});
app.get("/ladder", function(req, res) {
  User.findOne(
    {
      email: req.user.email
    },
    function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        // console.log(req.user.email);
        // console.log(foundUser.tags);
        res.send(foundUser.tags);
      }
    }
  );
});
app.get("/ladder/:id", function(req, res, next) {
  var tagId = req.params.id;
  console.log(tagId);
  console.log("1");
  User.findOne(
    {
      email: req.user.email
    },
    function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        foundUser.tags.remove(tagId);
        // console.log(req.body.entries);
        foundUser.save();
        res.send("good");
      }
    }
  );
});
app.delete("/index",function(req, res, next) {
  console.log(req.user);
  req.logout(function(err) {
  if (err) { return next(err); }
  res.redirect('/');
});
  req.session.destroy(function(err) {
    if (!err) {
      res
        .status(200)
        .clearCookie("connect.sid", {path: "/"})
        .json({isLoggedIn: false, status: "See you next time!"});
      console.log("successful logout");
    } else {
      console.log(err);
    }
  });
  console.log("logged  out")
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on port ${port}`);
});
