const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const HPProfileData = require("../models/CreateHPProfileModel");
const UpdateFoodData = require("../models/UpdateFoodModel");


app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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
    img_upload: req.body.img_upload,
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
      res.send("Profile Created!");
    }
  });
});
//---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

app.get("/", (req, res) => {
  res.render("../public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  createColllection("createHPProfile");
});
