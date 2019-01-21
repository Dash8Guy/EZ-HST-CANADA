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
   },
   JanPSTAmt: {
      type: Number,
      required: false
   },
   FebPSTAmt: {
      type: Number,
      required: false
   },
   MarPSTAmt: {
      type: Number,
      required: false
   },
   AprPSTAmt: {
      type: Number,
      required: false
   },
   MayPSTAmt: {
      type: Number,
      required: false
   },
   JunPSTAmt: {
      type: Number,
      required: false
   },
   JulPSTAmt: {
      type: Number,
      required: false
   },
   AugPSTAmt: {
      type: Number,
      required: false
   },
   SepPSTAmt: {
      type: Number,
      required: false
   },
   OctPSTAmt: {
      type: Number,
      required: false
   },
   NovPSTAmt: {
      type: Number,
      required: false
   },
   DecPSTAmt: {
      type: Number,
      required: false
   },
   Q1PSTAmt: {
      type: Number,
      required: false
   },
   Q2PSTAmt: {
      type: Number,
      required: false
   },
   Q3PSTAmt: {
      type: Number,
      required: false
   },
   Q4PSTAmt: {
      type: Number,
      required: false
   },
   YearPSTAmt: {
      type: Number,
      required: false
   }
});



module.exports = { Return_Data };