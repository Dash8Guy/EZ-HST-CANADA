let mongoose = require("mongoose");

let OtherCategorie = mongoose.model("OtherCategorie", {
   text: {
      type: String,
      required: true
   },
   taxed: {
      type: Boolean,
      required: true
   }
});

module.exports = { OtherCategorie };