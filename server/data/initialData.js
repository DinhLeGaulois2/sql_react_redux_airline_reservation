const Sequelize = require('sequelize');
const db = require("../models");

const airplane = require("./airplane.js");
const booking = require("./booking.js");
const bookingStatus = require("./bookingStatus.js");
const classSeatCapacity = require("./classSeatCapacity.js");
const flight = require("./flight.js");
const passenger = require("./passenger.js");
const payment = require("./payment.js");
const paymentMethod = require("./paymentMethod.js");
const paymentStatus = require("./paymentStatus.js");
const ticketType = require("./ticketType.js");
const travelClass = require("./travelClass.js");

let letInitiate = () => {
    // We could use Sequelize 'transaction' to avoid to build some 'table' but not some other. However, 
    //    (only for development purpose only) by using this (dump) way, we could get error's message
    //    corresponding to the 'table' that had problem, it's easier to see the errors ...
    db.paymentStatus.findAll()
        .then(data => {
            if (data.length == 0) { // initiate only if it wasn't initiated yet
                db.paymentStatus.bulkCreate(paymentStatus)
                    .then(data => {
                        db.paymentMethod.bulkCreate(paymentMethod)
                            .then(data => {
                                db.ticketType.bulkCreate(ticketType)
                                    .then(data => {
                                        db.bookingStatus.bulkCreate(bookingStatus)
                                            .then(data => {
                                                db.airplane.bulkCreate(airplane)
                                                    .then(data => {
                                                        db.passenger.bulkCreate(passenger)
                                                            .then(data => {
                                                                db.travelClass.bulkCreate(travelClass)
                                                                    .then(data => {
                                                                        db.flight.bulkCreate(flight)
                                                                            .then(data => {
                                                                                db.classSeatCapacity.bulkCreate(classSeatCapacity)
                                                                                    .then(data => {
                                                                                        db.booking.bulkCreate(booking)
                                                                                            .then(data => {
                                                                                                db.payment.bulkCreate(payment)
                                                                                                    .then(data => {
                                                                                                        console.log("Database Initiated Successfully!")
                                                                                                    })
                                                                                                    .catch(err => console.log("Could not insert 'payment'! err: " + err))
                                                                                            })
                                                                                            .catch(err => console.log("Could not insert 'booking'! err: " + err))
                                                                                    })
                                                                                    .catch(err => console.log("Could not insert 'classSeatCapacity'! err: " + err))
                                                                            })
                                                                            .catch(err => console.log("Could not insert 'flight'! err: " + err))
                                                                    })
                                                                    .catch(err => console.log("Could not insert 'travelClass'! err: " + err))
                                                            })
                                                            .catch(err => console.log("Could not insert 'passenger'! err: " + err))
                                                    })
                                                    .catch(err => console.log("Could not insert 'airplane'! err: " + err))
                                            })
                                            .catch(err => console.log("Could not insert 'bookingStatus'! err: " + err))
                                    })
                                    .catch(err => console.log("Could not insert 'ticketType'! err: " + err))
                            })
                            .catch(err => console.log("Could not insert 'paymentMethod'! err: " + err))
                    })
                    .catch(err => console.log("Could not insert 'paymentStatus'! err: " + err))
            }
            else console.log("Already Initiated!")
        }) // if it is already "initiated", no need to do one more time
        .catch(err => console.log("Error of Initiation! err: " + err))
}

module.exports = letInitiate;