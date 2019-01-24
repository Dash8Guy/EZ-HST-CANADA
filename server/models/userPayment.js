let mongoose = require("mongoose");

let UserPayment = mongoose.model("UserPayment", {
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   },
   payID: {
      type: String,
      required: false,
   },
   payCart: {
      type: String,
      required: false
   },
   payDate: {
      type: Date,
      required: true
   },
   payAmt: {
      type: Number,
      required: true,
      min: 0
   },
   payhstAmt: {
      type: Number,
      required: false,
      min: 0
   },
   payTotalAmt: {
      type: Number,
      required: true,
      min: 0
   },
   payerID: {
      type: String,
      required: false
   },
   payerEmail: {
      type: String,
      required: false,
      minlength: 1,
      trim: true
   },
   payerAddress: {
      type: String,
      required: false,
      minlength: 1,
      trim: true
   },
   payerCity: {
      type: String,
      required: false,
      minlength: 1,
      trim: true
   },
   payerProvince: {
      type: String,
      required: false,
      minlength: 1,
      trim: true
   },
   payerPostalCode: {
      type: String,
      required: false,
      minlength: 1,
      trim: true
   },
   payerCountry: {
      type: String,
      required: false,
      minlength: 1,
      trim: true
   },

});

module.exports = { UserPayment };
