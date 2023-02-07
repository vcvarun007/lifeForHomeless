const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
  hpp_id: "ObjectId",
  email: String,
  password: String,
});

const signupinfo = mongoose.model("logininfo", LoginSchema);
module.exports = logininfo;