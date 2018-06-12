const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');

SALT_WORK_FACTOR = 12;

module.exports = function (sequelize, Sequelize) {
  let User = sequelize.define("User", {
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
      classMethods: {
        validPassword: (password, passwd, done, user) =>
          bcrypt.compare(password, passwd, (err, isMatch) => {
            if (err) console.log(err)
            if (isMatch)
              return done(null, user)
            else return done(null, false)
          })
      }
    },
    {
      dialect: 'mysql'
    }
  );

  User.hook('beforeCreate', (user, callback) => {
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      return salt;
    });
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return callback(null, user);
    })
  });

  return User;
}