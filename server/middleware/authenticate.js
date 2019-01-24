const { User } = require("./../models/user");

let authenticate = (req, res, next) => {
  console.log(`Body: ${req.body.auth}`);
  console.log(`Query: ${req.query.auth}`);
  if (req.body.auth === undefined || req.body.auth === null) {
    token = req.query.auth;
    // console.log(`Query: ${req.query.auth}`);
  } else {
    token = req.body.auth;
    // console.log(`Body: ${req.body.auth}`);
  }

  User.findByToken(token)
    .then(user => {
      if (!user) {
        console.log('Authenticate failed!');
        return Promise.reject("User was not found. Authentication Failed!");
      }
      req.user = user; //this goes to the originating function and can be use in the response
      req.token = token;
      next(); //Next lets the originating function complete its code
    })
    .catch(e => {
      res.status(401).send();
    });
};

module.exports = { authenticate };
