const mongoose = require("mongoose");

const RentalVendor = mongoose.model("RentalVendor", {
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   },
   text: {
      type: String,
      required: true,
      unique: false
   }
});

module.exports = { RentalVendor };