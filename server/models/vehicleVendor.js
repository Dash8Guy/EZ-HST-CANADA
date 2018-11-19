const mongoose = require("mongoose");

const VehicleVendor = mongoose.model("VehicleVendor", {
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

module.exports = { VehicleVendor };
