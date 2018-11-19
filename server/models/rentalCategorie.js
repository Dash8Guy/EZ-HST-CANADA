let mongoose = require("mongoose");

let RentalCategorie = mongoose.model("RentalCategorie", {
   text: {
      type: String,
      required: true
   },
   taxed: {
      type: Boolean,
      required: true
   }
});

module.exports = { RentalCategorie };