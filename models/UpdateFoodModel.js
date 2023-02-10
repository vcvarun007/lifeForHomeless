/*********************************************************** 
Author              :Navin Raaj M
Last Modified Date  :07-02-2023
Description         :Schema for Updatefooddatas database
**********************************************************/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UpdateFoodSchema = new Schema({
    hpp_id: "ObjectId",
    name: "String",
    contact: "Number",
    type: "String",
    Quantity: "Number",
    Location: "String",
    UserID: "String",
  });
  
const UpdateFoodData = mongoose.model("UpdateFoodData",UpdateFoodSchema);
module.exports = UpdateFoodData;
