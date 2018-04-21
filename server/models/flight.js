module.exports = function (sequelize, Sequelize) {
    const Flight = sequelize.define("flight", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        flightNumber: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        destination: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        departureTime: {
            type: Sequelize.DATE,
            validate: {
                notEmpty: true,
            }
        },
        arrivalTime: {
            type: Sequelize.DATE,
            validate: {
                notEmpty: true,
            }
        },
    });

    return Flight;
}