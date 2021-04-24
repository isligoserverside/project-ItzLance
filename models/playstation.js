const mongoose = require("mongoose");


const playStationSchema = mongoose.Schema(
    {
    name: {type: String},
    titleOne: {type: String},
    imageOne: {type: String},
    releaseYearOne : {type: String},

    titleTwo: {type: String},
    imageTwo: {type: String},
    releaseYearTwo : {type: String},

    titleThree: {type: String},
    imageThree: {type: String},
    releaseYearThree : {type: String},

    titleFour: {type: String},
    imageFour: {type: String},
    releaseYearFour : {type: String},

    titleFive: {type: String},
    imageFive: {type: String},
    releaseYearFive : {type: String},

    titleSix: {type: String},
    imageSix: {type: String},
    releaseYearSix : {type: String},
 });

  let psModel = mongoose.model('model', playStationSchema);

  module.exports = psModel;

