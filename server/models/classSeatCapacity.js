module.exports = function (sequelize, Sequelize) {
    const ClassSeatCapacity = sequelize.define("classSeatCapacity", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        seatCapacity: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true,
            }
        },
        price: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true,
            }
        },
    });

    return ClassSeatCapacity;
}