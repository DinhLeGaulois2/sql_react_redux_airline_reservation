const Sequelize = require('sequelize');
const models = require('../models') // DB's models
var sequelize = models.sequelize

const db = require("../models");

module.exports = function (app) {
    ///////////////////////////////////////////////////////////////
    /////////////////// Need to use TRANSACTION ///////////////////
    ///////////////////////////////////////////////////////////////

    // 3 tables will be implied: 'classSeatCapacity' --> 'booking' --> 'payment'
    app.post("/api/add/booking", (req, res, next) => {
        const d = req.body

        return sequelize.transaction(t => {
            return db.classSeatCapacity.update({
                seatCapacity: d.classSeatCapacity.newSeatCapacity
            }, {
                    where: {
                        travelClassId: d.classSeatCapacity.travelClassId,
                        flightId: d.classSeatCapacity.flightId
                    }
                }, { transaction: t })
                .then(data => {
                    return db.booking.create({
                        bookingDate: d.booking.bookingDate,
                        passengerId: d.booking.passengerId,
                        bookingStatusId: d.booking.bookingStatusId,
                        ticketTypeId: d.booking.ticketTypeId,
                        flightId: d.booking.flightId,
                        travelClassId: d.booking.travelClassId
                    }, { transaction: t })
                        .then(data => {
                            db.booking.findAll({
                                limit: 1,
                                order: [ [ 'createdAt', 'DESC' ]] })
                                .then(data => {
                                    return db.payment.create({
                                        paymentDate: d.payment.paymentDate,
                                        paymentAmount: d.payment.paymentAmount,
                                        paymentMethodId: d.payment.paymentMethodId,
                                        paymentStatusId: d.payment.paymentStatusId,
                                        bookingId: data[0].id
                                    })
                                })
                        })
                })
        }).then(data => {
            res.status(200).json(data)
        })
            .catch(next)
    })

    app.post("/api/add/passenger", (req, res, next) => {
        const d = req.body
        db.passenger.findOrCreate({
            where: {
                firstName: d.firstName,
                lastName: d.lastName,
                phone: d.phone,
                email: d.email,
                address: d.address,
                zipcode: d.zipcode,
                state: d.state,
                city: d.city,
                country: d.country
            }
        }).then(data => {
            res.status(200).json(data)
        })
            .catch(next)
    })

    app.post("/api/add/airplane", (req, res, next) => {
        db.airplane.findOrCreate({
            where: { aircraftType: req.body.aircraftType }
        }).then(data => {
            res.status(200).json(data)
        })
            .catch(next)
    })

    app.post("/api/add/flight", (req, res, next) => {
        return sequelize.transaction(t => {
            return db.flight.findOrCreate({
                where: {
                    flightNumber: req.body.flight.flightNumber,
                    destination: req.body.flight.destination,
                    departureTime: req.body.flight.departureTime,
                    arrivalTime: req.body.flight.arrivalTime,
                    airplaneId: req.body.flight.airplaneId
                }
            }, { transaction: t })
                .then(data => {
                    const flightId = data[0].id
                    return db.classSeatCapacity.bulkCreate([
                        {
                            travelClassId: req.body.classSeatCapacity.travelClassId_1,
                            flightId: flightId,
                            seatCapacity: req.body.classSeatCapacity.seatCapacity
                        },
                        {
                            travelClassId: req.body.classSeatCapacity.travelClassId_2,
                            flightId: flightId,
                            seatCapacity: req.body.classSeatCapacity.seatCapacity
                        },
                        {
                            travelClassId: req.body.classSeatCapacity.travelClassId_3,
                            flightId: flightId,
                            seatCapacity: req.body.classSeatCapacity.seatCapacity
                        }
                    ])
                })
        }).then(data => {
            res.status(200).json(data)
        })
            .catch(next)
    })
}