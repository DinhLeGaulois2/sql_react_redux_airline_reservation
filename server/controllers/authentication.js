const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const db = require("../models");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res) {
  //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
  console.log("server, authentication, signin: " + tokenForUser(req.user))
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
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }

      db.user.create({
        email: email,
        password: password
      })
        .then(user => {
          //KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
          console.log("server, authentication, user: " + JSON.stringify(user, null, 5))
          // Repond to request indicating the user was created
          res.json({ token: tokenForUser(user) });
        }).catch(err => next(err))
    }).catch(err => next(err))
}
