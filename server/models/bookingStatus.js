module.exports = function (sequelize, Sequelize) {
    const BookingStatus = sequelize.define("bookingStatus", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bookingStatusCode: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
    });

    return BookingStatus;
}