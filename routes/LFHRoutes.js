/************************************************
Revision History
Version       Name          Date            Description 
1.0         Navin Raaj    08/02/2023      Connected UpdateFood page with Database
2.0         Navin Raaj    08/02/2023      Added Socket
3.0         Aman Das      09/02/2023      Testing of all Apis 
4.0         Navin Raaj    09/02/2023      Implemented Delete action 
5.0         Navin Raaj    09/02/2023      Implemented Socket action 
6.0         Jaskirat      09/02/2023      Implemented render action  
***********************************************/

//libraries
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
let projectCollection;
let http = require("http").createServer(app);//5.0
let io = require("socket.io")(http);  //5.0

//configurations
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
var session = require("express-session"); //6.0
// Mapping the EJS template engine to ".html" files
app.engine("html", require("ejs").renderFile); //6.0
app.set("view engine", "ejs"); //6.0

//controllers
const dashboardController = require("../controller/dashboardController");
const loginController = require("../controller/loginController");

//models
const HPProfileData = require("../models/CreateHPProfileModel");
const UpdateFoodData = require("../models/UpdateFoodModel"); //1.0
const signupinfo = require("../models/Signup");
const logininfo = require("../models/Signup");

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "LFHPROJECT",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use("/dashboard", dashboardController);
app.use("/", loginController);


/*********************************************************** //5.0
Author              :Navin Raaj M
Last Modified Date  :09-02-2023
Description         :Implement Basic Socket connection
**********************************************************/

//-----------------START----------------------------------//
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

//-----------------END----------------------------------//


//mongoDB connection
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

//create HP profile
app.post("/CreateHPProfile", (req, res) => {
  const newProfile = new HPProfileData({
    vol_id: req.session.userid,
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
    }
  });
});



/*********************************************************** //6.0
Author              :Jaskirat
Last Modified Date  :09-02-2023
Description         :Implemented render action  
**********************************************************/

//-----------------START----------------------------------//
//index
app.get("/", (req, res) => {
  res.render("../public/index.ejs");
});

//logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//updateFood
app.get("/updateFood", (req, res) => {
  if (req.session.userid == undefined) {
    res.redirect("/");
    return true;
  }
  var userType = req.session.userType;
  res.render("../public/views/UpdateFood.html", { userType: userType });
});

//displayFood
app.get("/displayFoods", (req, res) => {
  if (req.session.userid == undefined) {
    res.redirect("/");
    return true;
  }
  var userType = req.session.userType;
  UpdateFoodData.find({}, function (err, updatefooddatas) {
    res.render("../public/views/Displayfoods.ejs", {
      Fooddata: updatefooddatas,
      userType: userType,
    });
  });
});

//getHPProfile
app.get("/CreateHPProfile", (req, res) => {
  if (req.session.userid == undefined) {
    res.redirect("/");
    return true;
  }
  var userType = req.session.userType;

  res.render("../public/views/CreateHPProfile.html", { userType: userType });
});

//restaurantAvailabilityCheck
app.get("/restaurants", (req, res) => {
  if (req.session.userid == undefined) {
    res.redirect("/");
    return true;
  }
  var userType = req.session.userType;

  UpdateFoodData.find({}, function (err, foodData) {
    res.render("../public/views/RestaurantAvailabilityCheck.ejs", {
      foodData: foodData,
      userType: userType,
    });
  });
});
//-----------------Stop----------------------------------//

//server listen config
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
  createColllection("createHPProfile");
});


/*********************************************************** //1.0
Author              :Navin Raaj M
Last Modified Date  :08-02-2023
Description         :The Below code is used to get the input data from the UI and send it to the server
**********************************************************/
//-----------------START----------------------------------//
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
      res.redirect("/UpdateFood");
    }
  });
});

//-----------------END----------------------------------//


/*********************************************************** //4.0
Author              :Navin Raaj M
Last Modified Date  :09-02-2023
Description         :The Below code is used to delete the select food item fron the database
**********************************************************/
//-----------------START----------------------------------//

app.post('/delete/:id', async (req, res) => {
  await UpdateFoodData.deleteOne({_id: req.params.id})
  return res.redirect('/displayfoods')
});

//-----------------END----------------------------------//




/*********************************************************** //3.0
Author              :Aman Das 
Last Modified Date  :09-02-2023
Description         :Unit Testing
**********************************************************/
//-----------------START----------------------------------//

//testing
app.get("/restaurants/:test1", function (req, res, next) {
  var test1 = parseInt(req.params.test1);
  var check = test1 || null;
  if (check == null) {
    res.json({ check: check, statusCode: 400 }).status(400);
  } else {
    res.json({ check: check, statusCode: 200 }).status(200);
  }
});

app.get("/CreateHPProfile/:test2", function (req, res, next) {
  var test2 = parseInt(req.params.test2);
  var check = test2 || null;
  if (check == null) {
    res.json({ check: check, statusCode: 400 }).status(400);
  } else {
    res.json({ check: check, statusCode: 200 }).status(200);
  }
});
app.get("/displayFoods/:test3", function (req, res, next) {
  var test3 = parseInt(req.params.test3);
  var check = test3 || null;
  if (check == null) {
    res.json({ check: check, statusCode: 400 }).status(400);
  } else {
    res.json({ check: check, statusCode: 200 }).status(200);
  }
});

app.get("/displayFoods/:test3", function (req, res, next) {
  var test3 = parseInt(req.params.test3);
  var check = test3 || null;
  if (check == null) {
    res.json({ check: check, statusCode: 400 }).status(400);
  } else {
    res.json({ check: check, statusCode: 200 }).status(200);
  }
});

app.get("/dashboard/:test4", function (req, res, next) {
  var test4 = parseInt(req.params.test4);
  var check = test4 || null;
  if (check == null) {
    res.json({ check: check, statusCode: 400 }).status(400);
  } else {
    res.json({ check: check, statusCode: 200 }).status(200);
  }
});

app.get("/logout/:test5", function (req, res, next) {
  var test5 = parseInt(req.params.test5);
  var check = test5 || null;
  if (check == null) {
    res.json({ check: check, statusCode: 400 }).status(400);
  } else {
    res.json({ check: check, statusCode: 200 }).status(200);
  }
});

//-----------------END----------------------------------//
