/********************************************
Revision History

Version       Name          Date            Description 
1.0         Aman Das    07/02/2023      

*********************************************/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SignupSchema = new Schema({
  hpp_id: "ObjectId",
  name: String,
  email: String,
  contact:Number,
  Address: String,
  password: String,
  type:Number,
  rname: String,
});


const signupinfo = mongoose.model("signupinfo", SignupSchema);
module.exports = signupinfo;
