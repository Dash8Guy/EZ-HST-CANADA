const mongoose = require("mongoose");

const BusinessVendor = mongoose.model("BusinessVendor", {
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

module.exports = { BusinessVendor };
