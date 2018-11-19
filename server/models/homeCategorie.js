let mongoose = require("mongoose");

let HomeCategorie = mongoose.model("HomeCategorie", {
   text: {
      type: String,
      required: true
   },
   taxed: {
      type: Boolean,
      required: true
   }
});

module.exports = { HomeCategorie };