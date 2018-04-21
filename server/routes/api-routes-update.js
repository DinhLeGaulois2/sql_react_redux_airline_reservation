const Sequelize = require('sequelize');
const models = require('../models') // DB's models
var sequelize = models.sequelize

const db = require("../models");

module.exports = function (app) {
    ///////////////////////////////////////////////////////////////
    /////////////////// Need to use TRANSACTION ///////////////////
    ///////////////////////////////////////////////////////////////

    // change: 
    //   - 'payment' (amount = 0)
    //      * 'paymentStatus'
    //   - 'booking'
    //      * 'bookingStatus'
    //   - 'classSeatCapacity' (plus 1)
    //      * 'seatCapacity'
    app.put("/api/update/booking", (req, res, next) => {
        db.travelClass.findAll({
            where: { id: req.body.travelClassId },
            attributes: ['id'],
            include: [
                {
                    model: db.classSeatCapacity,
                    attributes: ['id', 'flightId']
                }
            ]
        }).then(data => {
            const clSeatCapacityObj = data[0].classSeatCapacities.filter(a => a.flightId == req.body.flightId ? a : null)

            return sequelize.transaction(t => {
                return db.classSeatCapacity.update({ seatCapacity: req.body.seatCapacity }, { where: { id: clSeatCapacityObj[0].id } }, { transaction: t })
                    .then(data => {
                        return db.payment.update({
                            paymentAmount: req.body.paymentAmount,
                            paymentStatusId: req.body.paymentStatusId
                        }, { where: { bookingId: req.body.bookingId } }, { transaction: t })
                            .then(data => {
                                return db.booking.update({
                                    bookingStatusId: req.body.bookingStatusId
                                }, { where: { id: req.body.bookingId } })
                            })
                    })
            })
                .then(data => res.status(200).json(data))
                .catch(next)
        })
            .catch(next)
    })


    app.put("/api/update/passenger", (req, res, next) => {
        db.passenger.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            zipcode: req.body.zipcode,
            state: req.body.state,
            city: req.body.city,
            country: req.body.country,
        }, { where: { id: req.body.id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    })

}