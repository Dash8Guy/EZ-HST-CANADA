const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const options = { useNewUrlParser: true, useCreateIndex: true };
mongoose.connect(
  "mongodb://Dash8Guy:MaxTop405540@ds141972.mlab.com:41972/ez-hst-canada",
  options
);

module.exports = { mongoose };

// "mongodb://Dash8Guy:MaxTop405540@ds141972.mlab.com:41972/ez-hst-canada"
// "mongodb://localhost:27017/EZ-HST-CANADA"