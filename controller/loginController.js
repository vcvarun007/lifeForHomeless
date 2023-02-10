
//libraries
const express = require('express');
const router = express.Router();
var session = require('express-session');

//models
const signupinfo = require("../models/Signup")

/***********************************************************
Author              : Aman Das
Last Modified Date  : 09-02-2023
Description         : signup inserting data
**********************************************************/

router.post("/signupUser", (req, res) => {
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
        res.render("../public/index.ejs",{status: 200,message: 'user created successfully.'});
      }
    });
  });

  
/***********************************************************
Author              : jaskirat singh
Last Modified Date  : 09-02-2023
Description         : login code 
**********************************************************/

router.post('/login',(req,res) => {
    var query = {"email":req.body.email,"password":req.body.password};
    var test = signupinfo.find(query, function (err, docs) {
          if (err) {
            console.error(err);
            throw err;
          } else {
            if(docs[0] == undefined) {
              res.render("../public/index.ejs",{status: 500,message: 'login credentials are wrong.'});
              req.session.destroy();
            } else {
              var session       = req.session;
              session.userid    = docs[0]._id
              session.usernname = docs[0].name
              session.email     = docs[0].email
              session.userType  = docs[0].type
              res.redirect('/dashboard/view')
            }
          }
    });
    console.log(test);
  });

module.exports = router;
