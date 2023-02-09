const express = require('express');
const router = express.Router();
var session = require('express-session');
const HPProfileData = require("../models/CreateHPProfileModel");
const UpdateFoodData = require("../models/UpdateFoodModel"); 
const signupinfo = require("../models/Signup")

// Define a dashboard page route
router.get('/view', (req, res) => {
    if(typeof req.session.userid == 'undefined') {
      res.redirect('/')
      return true;
    }
    var userId = req.session.userid;
    var query = {
      email: 'dasaman5844@gmail.com'
    };
    var data = signupinfo.countDocuments(query, function(err, count) {
      console.log("Number of documents in the collection: " + count);
    })

    res.render("../public/views/Dashboard.ejs",{data: data});
  })

module.exports = router;
