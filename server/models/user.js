const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');

SALT_WORK_FACTOR = 12;

module.exports = function (sequelize, Sequelize) {
  let User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      }
    }
  }, {
      instanceMethods: {
        validPassword(candidatePwd, cb) {
          bcrypt.compare(this.password, candidatePwd, (err, isMatch) => {
            if (err) cb(err)
            if (isMatch)
              return cb(null, user)
            else return cb(null, false)
          })
        }
      }
    }
  )

  User.beforeCreate(function (user, options) {
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      return salt;
    });
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
    })
  });

  return User;
}