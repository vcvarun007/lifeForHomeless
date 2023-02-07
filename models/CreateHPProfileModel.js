const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HPProfileSchema = new Schema({
  hpp_id: "ObjectId",
  fname: "String",
  lname: "String",
  img_upload: "String",
  age: "Number",
  idProof: "String",
  idNo: "String",
});

const HPProfileData = mongoose.model("HPProfileData", HPProfileSchema);
module.exports = HPProfileData;
