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
const HPProfileData = require("../models/CreateHPProfileModel");
const UpdateFoodData = require("../models/UpdateFoodModel"); //1.0
const signupinfo = require("../models/Signup");
const logininfo = require("../models/Signup");

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
      // res.send(profileData);
      console.log(profileData);
      // res.send("Profile Created!");
      res.redirect("../views/CreateHPProfile.html");
    }
  });
});
//---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

app.get("/", (req, res) => {
  res.render("../public/index.html");
});

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
Author              :
Last Modified Date  :-02-2023
Description         :
**********************************************************/

app.post("/views/signup.html", (req, res) => {
  const details = new logininfo({
    name: req.body.name,
    email: req.body.email,
  });

  details.save((error, loginpage) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log(loginpage);
      res.send("successfully submitted");
    }
  });
});
