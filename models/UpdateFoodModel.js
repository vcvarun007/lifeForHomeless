const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UpdateFoodSchema = new Schema({
    hpp_id: "ObjectId",
    name: "String",
    contact: "Number",
    type: "String",
    Quantity: "Number",
  });
  
const UpdateFoodData = mongoose.model("UpdateFoodData",UpdateFoodSchema);
module.exports = UpdateFoodData;
