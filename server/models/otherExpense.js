let mongoose = require("mongoose");

let OtherExpense = mongoose.model("OtherExpense", {
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   },
   carDate: {
      type: Date,
      required: true
   },
   carnetAmt: {
      type: Number,
      required: true,
      min: 0
   },
   carhstAmt: {
      type: Number,
      required: true,
      min: 0
   },
   carpstAmt: {
      type: Number,
      required: true,
      min: 0
   },
   carTotalAmt: {
      type: Number,
      required: true,
      min: 0
   },
   carDescription: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
   },
   vendorSelect: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
   },
   carExpCatSelect: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
   },
   receiptPath: {
      type: Boolean,
      required: true
   }
});



module.exports = { OtherExpense };
