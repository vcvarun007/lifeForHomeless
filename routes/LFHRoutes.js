/************************************************
Revision History

Version       Name          Date            Description 


1.0         Navin Raaj    08/02/2023      Connected UpdateFood page with Database
1.0         Navin Raaj    08/02/2023      Added Socket
***********************************************/

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
let projectCollection;
let http = require("http").createServer(app);
let io = require("socket.io")(http);
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
var session = require('express-session');
// Mapping the EJS template engine to ".html" files
app.engine('html', require('ejs').renderFile);

const HPProfileData = require("../models/CreateHPProfileModel");
const UpdateFoodData = require("../models/UpdateFoodModel"); //1.0
const signupinfo = require("../models/Signup")
const logininfo = require("../models/Signup")

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: "LFHPROJECT",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

//2.0 Socket Connection

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

//MongoDB Connection
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://vcvarun007:vcvarun007@cluster0.zfxgxdf.mongodb.net/LifeForHomeless?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//create collection
const createColllection = (collectionName) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName);
    if (!err) {
      console.log("MongoDB Connected");
    } else {
      console.log("DB Error: ", err);
      process.exit(1);
    }
  });
};

//---------- Create HP Profile---------- ---------- ---------- ---------- ----------
app.post("/views/CreateHPProfile.html", (req, res) => {
  const newProfile = new HPProfileData({
    fname: req.body.fname,
    lname: req.body.lname,
    age: req.body.age,
    idProof: req.body.idProof,
    idNo: req.body.idNo,
  });

  newProfile.save((error, profileData) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log(profileData);
      res.redirect("../views/CreateHPProfile.html");
    }
  });
});
//---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

app.get("/", (req, res) => {
  res.render("../public/index.html");
});

app.get('/dashboard', (req, res) => {
  res.render("../public/views/Dashboard.html");
})

app.get('/updateFood', (req, res) => {
  res.render("../public/views/UpdateFood.html");
})

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
  createColllection("createHPProfile");
});

/*********************************************************** //1.0
Author              :Navin Raaj M
Last Modified Date  :08-02-2023
Description         :The Below code is used to get the input data from the UI and send it to the server
**********************************************************/

app.post("/views/UpdateFood.html", (req, res) => {
  const UpdateFood = new UpdateFoodData({
    name: req.body.name,
    contact: req.body.contact,
    type: req.body.type,
    Quantity: req.body.Quantity,
    Location: req.body.Location,
  });

  UpdateFood.save((error, nextpage) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log(nextpage);
      res.send("successfully submitted");
    }
  });
});

/***********************************************************
Author              :
Last Modified Date  :-02-2023
Description         :
**********************************************************/

app.post("/views/signup.html", (req, res) => {
  const details = new signupinfo({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    Address: req.body.Address,
    password: req.body.password,
    type: req.body.type,
    rname: req.body.rname,
  });
  details.save((error, signuppage) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log(signuppage);
      res.send("successfully submitted");
    }
  });
});

/***********************************************************
Author              : jaskirat singh
Last Modified Date  :-02-2023
Description         : login code 
**********************************************************/

app.post('/login',(req,res) => {
  var query = {"email":req.body.email,"password":req.body.password};
  var test = signupinfo.find(query, function (err, docs) {
        if (err) {
          console.error(err);
          throw err;
        } else {
          if(docs[0] == undefined) {
            res.send('no data available');
            req.session.destroy();
          } else {
            var session       = req.session;
            session.userid    = docs[0]._id
            session.usernname = docs[0].name
            session.email     = docs[0].email
            res.redirect('/dashboard')
          }
        }
  });
  console.log(test);
});