const mongoose = require("mongoose");

const OtherVendor = mongoose.model("OtherVendor", {
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   },
   text: {
      type: String,
      required: true,
      unique: true
   }
});

module.exports = { OtherVendor };