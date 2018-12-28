let mongoose = require("mongoose");

let PaymentEntry = mongoose.model("PaymentEntry", {
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   },
   paymentDate: {
      type: Date,
      required: true
   },
   taxAmt: {
      type: Number,
      required: false,
      min: 0
   },
   hstAmt: {
      type: Number,
      required: false,
      min: 0
   },
   pstAmt: {
      type: Number,
      required: false,
      min: 0
   },
   description: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
   }
});



module.exports = { PaymentEntry };
