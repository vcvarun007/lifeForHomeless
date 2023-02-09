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
const dashboardController = require('../controller/dashboardController');
const loginController = require('../controller/loginController');
// Mapping the EJS template engine to ".html" files
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
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
app.use('/dashboard', dashboardController);
app.use('/',loginController)
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
app.post("/CreateHPProfile", (req, res) => {
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
      res.redirect("/CreateHPProfile");
    }
  });
});
//---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

app.get('/', (req, res) => {
  res.render("../public/index.ejs");
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})



app.get('/updateFood', (req, res) => {
  if(req.session.userid == undefined) {
    res.redirect('/')
    return true;
  }
  res.render("../public/views/UpdateFood.html");
})

app.get('/displayFoods', (req, res) => {
  if(req.session.userid == undefined) {
    res.redirect('/')
    return true;
  }

  UpdateFoodData.find({}, function(err, updatefooddatas) {
    res.render("../public/views/Displayfoods.ejs", {Fooddata: updatefooddatas
    })
})

})

app.get('/CreateHPProfile', (req, res) => {
  if(req.session.userid == undefined) {
    res.redirect('/')
    return true;
  }
  res.render("../public/views/CreateHPProfile.html");
})

app.get('/restaurants', (req, res) => {
  if(req.session.userid == undefined) {
    res.redirect('/')
    return true;
  }
  res.render("../public/views/RestaurantAvailabilityCheck.html");
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

app.post("/updateFood", (req, res) => {
  const UpdateFood = new UpdateFoodData({
    name: req.body.name,
    contact: req.body.contact,
    type: req.body.type,
    Quantity: req.body.Quantity,
    Location: req.body.Location,
    UserID: req.session.Id,
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



