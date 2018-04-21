'use strict';

var conf = require('../../MY_PRIVATE_FOLDER/config_params')

// the Object from the library ...
var Sequelize = require('sequelize');

var db = {};

var DBInfo = {
    username: "root",
    password: conf.db_pwd,   // <----------------- Your Password here
    database: "airline_reservation",
    host: "127.0.0.1",
    dialect: "mysql",
};

var sequelize = new Sequelize(DBInfo.database, DBInfo.username, DBInfo.password, {
    host: DBInfo.host,
    dialect: DBInfo.dialect,
    logging: false,
    freezeTableName: true,
    operatorsAliases: false
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.airplane = require('../models/airplane.js')(sequelize, Sequelize)
db.booking = require('../models/booking.js')(sequelize, Sequelize)
db.bookingStatus = require('../models/bookingStatus.js')(sequelize, Sequelize)
db.classSeatCapacity = require('../models/classSeatCapacity.js')(sequelize, Sequelize)
db.flight = require('../models/flight.js')(sequelize, Sequelize)
db.passenger = require('../models/passenger.js')(sequelize, Sequelize)
db.payment = require('../models/payment.js')(sequelize, Sequelize)
db.paymentMethod = require('../models/paymentMethod.js')(sequelize, Sequelize)
db.paymentStatus = require('../models/paymentStatus.js')(sequelize, Sequelize)
db.ticketType = require('../models/ticketType.js')(sequelize, Sequelize)
db.travelClass = require('../models/travelClass.js')(sequelize, Sequelize)

db.passenger.hasMany(db.booking)
db.booking.belongsTo(db.passenger)

db.travelClass.hasMany(db.booking)
db.booking.belongsTo(db.travelClass)

db.travelClass.hasMany(db.classSeatCapacity)
db.classSeatCapacity.belongsTo(db.travelClass)

db.flight.hasMany(db.classSeatCapacity)
db.classSeatCapacity.belongsTo(db.flight)

db.flight.hasMany(db.booking)
db.booking.belongsTo(db.flight)

db.airplane.hasMany(db.flight)
db.flight.belongsTo(db.airplane)

db.bookingStatus.hasMany(db.booking)
db.booking.belongsTo(db.bookingStatus)

db.ticketType.hasMany(db.booking)
db.booking.belongsTo(db.ticketType)

db.booking.hasMany(db.payment)
db.payment.belongsTo(db.booking)

db.paymentMethod.hasMany(db.payment)
db.payment.belongsTo(db.paymentMethod)

db.paymentStatus.hasMany(db.payment)
db.payment.belongsTo(db.paymentStatus)

module.exports = db;