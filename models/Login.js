/*********************************************************** 
Author              :Aman das
Last Modified Date  :07-02-2023
Description         :Schema for Logininfo database
**********************************************************/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  hpp_id: "ObjectId",
  email: String,
  password: String,
});

const signupinfo = mongoose.model("logininfo", LoginSchema);
module.exports = logininfo;