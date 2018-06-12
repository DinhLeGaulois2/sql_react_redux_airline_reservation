module.exports = function (sequelize, Sequelize) {
    const Airplane = sequelize.define("airplane", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        aircraftType: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        seatCapacity: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true,
            }
        }
    });

    return Airplane;
}