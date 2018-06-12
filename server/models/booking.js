module.exports = function (sequelize, Sequelize) {
    const Booking = sequelize.define("booking", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bookingDate: {
            type: Sequelize.DATE
        },
    });

    return Booking;
}