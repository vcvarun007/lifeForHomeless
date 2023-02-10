/*********************************************************** 
Author              :Aman das
Last Modified Date  :07-02-2023
Description         :Schema for signupinfo database
**********************************************************/

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
