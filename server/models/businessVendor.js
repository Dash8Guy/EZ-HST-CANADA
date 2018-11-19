const mongoose = require("mongoose");

const BusinessVendor = mongoose.model("BusinessVendor", {
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

module.exports = { BusinessVendor };
