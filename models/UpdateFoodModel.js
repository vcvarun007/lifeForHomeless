const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UpdateFoodSchema = new mongoose.Schema({
    rest_id: "String",
    rname: "String",
    rnumber: "Number",
    food_type: "String",
    qty: "Number",
    location: "String",
  });
  
const UpdateFoodData = mongoose.model("UpdateFoodData", UpdateFoodSchema);
module.exports = UpdateFoodData;
