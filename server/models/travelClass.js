module.exports = function (sequelize, Sequelize) {
    const travelClass = sequelize.define("travelClass", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        travelClassCode: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        defaultPercent: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true,
            }
        }
    });

    return travelClass;
}