const mongoose = require("mongoose");

const HomeVendor = mongoose.model("HomeVendor", {
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

module.exports = { HomeVendor };