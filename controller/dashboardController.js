const express = require("express");
const router = express.Router();
var session = require("express-session");
const HPProfileData = require("../models/CreateHPProfileModel");
const UpdateFoodData = require("../models/UpdateFoodModel");
const signupinfo = require("../models/Signup");

// Define a dashboard page route
router.get("/view", (req, res) => {
  if (typeof req.session.userid == "undefined") {
    res.redirect("/");
    return true;
  }
  var userId = req.session.userid;
  var userType = req.session.userType;
  // var query = {
  //   userid: userId
  // };
  // var data = HPProfileData.countDocuments(query, function(err, count) {
  //   console.log("Number of documents in the collection: " + count);
  // })
  if (userType != 1 && userType != 2) {
    HPProfileData.find({ vol_id: userId }, function (err, profileData) {
      res.render("../public/views/Dashboard.ejs", {
        profileData: profileData,
        userType: userType,
      });
    });
  }
  if (userType == 1 || userType == 2) {
    UpdateFoodData.find({}, function (err, foodData) {
      res.render("../public/views/Dashboard.ejs", {
        foodData: foodData,
        userType: userType,
      });
    });
  }
});

module.exports = router;
