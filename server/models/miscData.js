let mongoose = require("mongoose");

let MiscData = mongoose.model("MiscData", {
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  odometerV1: {
    type: Number,
    required: true,
    min: 0
  },
  odometerV2: {
    type: Number,
    required: true,
    min: 0
  },
  lockDate: {
    type: Date,
    required: true
  },
  homePercJan: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercFeb: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercMar: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercApr: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercMay: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercJun: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercJul: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercAug: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercSep: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercOct: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercNov: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homePercDec: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  NLPSTExempt: {
    type: Boolean,
    required: true,
  },
  PEIPSTExempt: {
    type: Boolean,
    required: true,
  },
  NSPSTExempt: {
    type: Boolean,
    required: true,
  },
  NBPSTExempt: {
    type: Boolean,
    required: true,
  },
  QCPSTExempt: {
    type: Boolean,
    required: true,
  },
  ONPSTExempt: {
    type: Boolean,
    required: true,
  },
  MBPSTExempt: {
    type: Boolean,
    required: true,
  },
  SKPSTExempt: {
    type: Boolean,
    required: true,
  },
  ABPSTExempt: {
    type: Boolean,
    required: true,
  },
  BCPSTExempt: {
    type: Boolean,
    required: true,
  },
  YTPSTExempt: {
    type: Boolean,
    required: true,
  },
  NTPSTExempt: {
    type: Boolean,
    required: true,
  },
  NLPSTExempt: {
    type: Boolean,
    required: true,
  },
  IncludeRentalHSTForm: {
    type: Boolean,
    required: true,
  },
});



module.exports = { MiscData };
