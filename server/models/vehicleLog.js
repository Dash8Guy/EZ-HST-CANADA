let mongoose = require("mongoose");

let VehicleLog = mongoose.model("VehicleLog", {
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   },
   logDate: {
      type: Date,
      required: true,
      unique: true
   },
   PersKMV1: {
      type: Number,
      required: false,
      min: 0
   },
   BusKMV1: {
      type: Number,
      required: false,
      min: 0
   },
   PersKMV2: {
      type: Number,
      required: false,
      min: 0
   },
   BusKMV2: {
      type: Number,
      required: false,
      min: 0
   }
});



module.exports = { VehicleLog };