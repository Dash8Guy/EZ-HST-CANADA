let mongoose = require("mongoose");

let VehicleCategorie = mongoose.model("VehicleCategorie", {
  text: {
    type: String,
    required: true
  },
  taxed: {
    type: Boolean,
    required: true
  }
});

module.exports = { VehicleCategorie };
