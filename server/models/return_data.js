let mongoose = require("mongoose");

let Return_Data = mongoose.model("Return_Data", {
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   },
   LineNumber: {
      type: String,
      required: true,
      minlength: 1,
      unique: true
   },
   JanAmt: {
      type: Number,
      required: false
   },
   FebAmt: {
      type: Number,
      required: false
   },
   MarAmt: {
      type: Number,
      required: false
   },
   AprAmt: {
      type: Number,
      required: false
   },
   MayAmt: {
      type: Number,
      required: false
   },
   JunAmt: {
      type: Number,
      required: false
   },
   JulAmt: {
      type: Number,
      required: false
   },
   AugAmt: {
      type: Number,
      required: false
   },
   SepAmt: {
      type: Number,
      required: false
   },
   OctAmt: {
      type: Number,
      required: false
   },
   NovAmt: {
      type: Number,
      required: false
   },
   DecAmt: {
      type: Number,
      required: false
   },
   Q1Amt: {
      type: Number,
      required: false
   },
   Q2Amt: {
      type: Number,
      required: false
   },
   Q3Amt: {
      type: Number,
      required: false
   },
   Q4Amt: {
      type: Number,
      required: false
   },
   YearAmt: {
      type: Number,
      required: false
   }
});



module.exports = { Return_Data };