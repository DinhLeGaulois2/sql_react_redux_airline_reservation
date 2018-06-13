const jwt = require('jwt-simple');
const config = require('../config');
const db = require("../models");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
  console.log("server, authentication, reqasdafafsd: " + JSON.stringify(req.user, null, 5))
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // See if a user with the given email exists
  db.user.findOne({ where: { email: email } })
    .then(existingUser => {
      // If a user with email does exist, return an error
      if (existingUser) 
        return res.status(422).send({ error: 'Email is in use' });

      db.user.create({
        email: email,
        password: password
      }) .then(newUser => {
          // Repond to request indicating the user was created
          res.json({ token: tokenForUser(newUser) });
        }).catch(err => next(err))
    }).catch(err => next(err))
}
