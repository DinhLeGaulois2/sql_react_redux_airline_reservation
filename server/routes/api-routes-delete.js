const Sequelize = require('sequelize');
const models = require('../models') // DB's models
var sequelize = models.sequelize

const db = require("../models");

module.exports = function (app) {
    ///////////////////////////////////////////////////////////////
    /////////////////// Need to use TRANSACTION ///////////////////
    ///////////////////////////////////////////////////////////////

    app.delete("/api/delete/booking/:id", (req, res, next) => {
        db.booking.findAll({ where: { id: req.params.id }, attributes: ['id', 'flightId', 'travelClassId'] })
            .then(data => {
                const bookingId = data[0].id
                const flightId = data[0].flightId
                const travelClassId = data[0].travelClassId
                db.classSeatCapacity.findAll({ where: { travelClassId: data[0].travelClassId, flightId: data[0].flightId }, attributes: ['id', "seatCapacity"] })
                    .then(data => {
                        return sequelize.transaction(t => {
                            return db.classSeatCapacity.update({ seatCapacity: data[0].seatCapacity + 1 },
                                { where: { travelClassId: travelClassId, flightId: flightId } }, { transaction: 1 }
                            )
                                .then(data => {
                                    return db.payment.destroy({ where: { bookingId: bookingId } }, { transaction: 1 })
                                        .then(data => {
                                            return db.booking.destroy({ where: { id: bookingId } })
                                        })
                                })
                        })
                            .then(data => res.status(200).json(data))
                            .catch(next)
                    })
            })
            .catch(next)
    })

    app.delete("/api/delete/passenger/:id", (req, res, next) => {
        db.booking.findAll({ where: { passengerId: req.params.id }, attributes: ['id', 'flightId', 'travelClassId'] })
            .then(data => {
                if (data.length == 0) { // no booking for this passenger
                    db.passenger.destroy({ where: { id: req.params.id } })
                        .then(data => res.status(200).json(data))
                        .catch(next)
                }
                else {
                    const bookingId = data[0].id
                    const flightId = data[0].flightId
                    const travelClassId = data[0].travelClassId
                    db.classSeatCapacity.findAll({ where: { travelClassId: data[0].travelClassId, flightId: data[0].flightId }, attributes: ['id', "seatCapacity"] })
                        .then(data => {
                            return sequelize.transaction(t => {
                                return db.classSeatCapacity.update({ seatCapacity: data[0].seatCapacity + 1 },
                                    { where: { travelClassId: travelClassId, flightId: flightId } }, { transaction: 1 }
                                )
                                    .then(data => {
                                        return db.payment.destroy({ where: { bookingId: bookingId } }, { transaction: 1 })
                                            .then(data => {
                                                return db.booking.destroy({ where: { id: bookingId } }, { transaction: 1 })
                                                    .then(data => {
                                                        return db.passenger.destroy({ where: { id: req.params.id } })
                                                    })
                                            })
                                    })
                            })
                                .then(data => res.status(200).json(data))
                                .catch(next)
                        })
                }
            })
            .catch(next)
    })
}