const mongoose = require("mongoose");

const IncomeClient = mongoose.model("IncomeClient", {
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

module.exports = { IncomeClient };