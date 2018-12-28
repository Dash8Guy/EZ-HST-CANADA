let mongoose = require("mongoose");

let FixedAsset = mongoose.model("FixedAsset", {
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  claimDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  startValue: {
    type: Number,
    required: true,
    min: 0
  },
  busPercent: {
    type: Number,
    required: true,
    min: 0
  },
  claimAmt: {
    type: Number,
    required: true,
    min: 0
  },
  itcClaimAmt: {
    type: Number,
    required: true,
    min: 0
  }
});



module.exports = { FixedAsset };
