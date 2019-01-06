
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {

  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
} else {
  process.env.MONGODB_URI = "mongodb://Dash8Guy:MaxTop405540@ds141972.mlab.com:41972/ez-hst-canada";
}
