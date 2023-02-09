const express = require('express');
const router = express.Router();
var session = require('express-session');
const HPProfileData = require("../models/CreateHPProfileModel");
const UpdateFoodData = require("../models/UpdateFoodModel"); 

// Define a dashboard page route
router.get('/view', (req, res) => {
    if(typeof req.session.userid == 'undefined') {
      res.redirect('/')
      return true;
    }
    res.render("../public/views/Dashboard.ejs");
  })

module.exports = router;
