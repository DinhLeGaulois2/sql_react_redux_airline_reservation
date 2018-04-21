const Sequelize = require('sequelize');
const models = require('../models') // DB's models
var sequelize = models.sequelize

const db = require("../models");

const flightInfo = () => {
    return db.flight.findAll({
        attributes: ['id', 'flightNumber', 'destination', 'departureTime', 'arrivalTime', 'airplaneId'],
        include: [
            {
                model: db.airplane,
                attributes: ['aircraftType']
            },
            {
                model: db.classSeatCapacity,
                attributes: ['id', 'seatCapacity', 'travelClassId', 'price'],
                include: [{
                    model: db.travelClass,
                    attributes: ['id', 'travelClassCode']
                }]
            }
        ]
    })
}

const getABooking = (bookingId) => {
    // return a "promise"
    return db.booking.findAll({
        where: { id: bookingId },
        attributes: ['id', 'bookingDate'],
        include: [
            {
                model: db.passenger,
                attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'address', 'zipcode', 'state', 'city', 'country']
            },
            {
                model: db.travelClass,
                attributes: ['travelClassCode']
            },
            {
                model: db.flight,
                attributes: ['flightNumber', 'destination', 'departureTime', 'arrivalTime'],
                include: [{
                    model: db.airplane,
                    attributes: ['aircraftType']
                }]
            },
            {
                model: db.bookingStatus,
                attributes: ['bookingStatusCode']
            },
            {
                model: db.ticketType,
                attributes: ['ticketTypeCode']
            },
            {
                model: db.payment,
                attributes: ['paymentAmount'],
                include: [
                    {
                        model: db.paymentStatus,
                        attributes: ['paymentStatusCode']
                    },
                    {
                        model: db.paymentMethod,
                        attributes: ['paymentMethodCode']
                    }
                ]
            }
        ]
    })
}

module.exports = function (app) {
    ///////////////////////////////////////////////////////////////
    /////////////////// Need to use TRANSACTION ///////////////////
    ///////////////////////////////////////////////////////////////
    app.get("/api/get/booking/:id", (req, res, next) => {
        getABooking(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }) // get 'booking' with 'id'

    app.get("/api/get/bookings", (req, res, next) => {
        db.booking.findAll({
            attributes: ['id'],
            order: [['id', 'ASC']]
        })
            .then(data => {
                let result = []
                const oneByOne = (list) => {
                    if (list.length) {
                        let ob = list.shift()
                        getABooking(ob.id)
                            .then(data => {
                                result.push(data[0])
                                oneByOne(list)
                            })
                            .catch(next)
                    }
                    else res.status(200).json(result)
                }
                oneByOne([...data])
            })
            .catch(next)
    }) // get 'booking' with 'id'

    app.get("/api/get/info4Booking", (req, res, next) => {
        let result = []
        // ATTENTION: these tables are NOT directly linked to each other
        //    ==> Could not use 'include' ...
        flightInfo().then(data => {
            let obj = { flight: data }
            db.bookingStatus.findAll({
                attributes: ['id', 'bookingStatusCode']
            }).then(data => {
                obj.bookingStatus = data
                db.ticketType.findAll({
                    attributes: ['id', 'ticketTypeCode']
                }).then(data => {
                    obj.ticketType = data
                    db.paymentMethod.findAll({
                        attributes: ['id', 'paymentMethodCode']
                    }).then(data => {
                        obj.paymentMethod = data
                        db.paymentStatus.findAll({
                            attributes: ['id', 'paymentStatusCode']
                        }).then(data => {
                            obj.paymentStatus = data
                            db.passenger.findAll({
                                attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'address', 'zipcode', 'state', 'city', 'country']
                            }).then(data => {
                                obj.passengers = data
                                res.status(200).json(obj)
                            })
                                .catch(next)
                        })
                            .catch(next)
                    })
                        .catch(next)
                })
                    .catch(next)
            })
                .catch(next)
        })
            .catch(next)
    })

    app.get("/api/get/passenger/:id", (req, res, next) => {
        db.passenger.findAll({
            where: { id: req.params.id },
            attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'address', 'zipcode', 'state', 'city', 'country']
        }).then(data => res.status(200).json(data))
            .catch(next)
    })

    app.get("/api/get/passengers", (req, res, next) => {
        db.passenger.findAll({
            attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'address', 'zipcode', 'state', 'city', 'country']
        }).then(data => res.status(200).json(data))
            .catch(next)
    })
}