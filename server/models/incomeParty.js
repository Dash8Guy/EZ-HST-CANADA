let mongoose = require("mongoose");

let IncomeParty = mongoose.model("IncomeParty", {
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   },
   text: {
      type: String,
      required: false
   }
});

module.exports = { IncomeParty };