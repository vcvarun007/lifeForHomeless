/********************************************
Revision History

Version       Name          Date            Description 
1.0         Aman Das    07/02/2023      

*********************************************/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  hpp_id: "ObjectId",
  email: String,
  password: String,
});

const signupinfo = mongoose.model("logininfo", LoginSchema);
module.exports = logininfo;