/************************************************
Revision History

Version       Name          Date            Description 
1.0         Navin Raaj    07/02/2023      Creating Schema for the Database
***********************************************/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UpdateFoodSchema = new Schema({
    hpp_id: "ObjectId",
    name: "String",
    contact: "Number",
    type: "String",
    Quantity: "Number",
    Location: "String",
  });
  
const UpdateFoodData = mongoose.model("UpdateFoodData",UpdateFoodSchema);
module.exports = UpdateFoodData;
