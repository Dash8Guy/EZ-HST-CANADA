let mongoose = require("mongoose");

let BusinessCategorie = mongoose.model("BusinessCategorie", {
  text: {
    type: String,
    required: true
  },
  taxed: {
    type: Boolean,
    required: true
  }
});

module.exports = { BusinessCategorie };
