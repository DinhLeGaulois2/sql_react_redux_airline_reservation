module.exports = function (sequelize, Sequelize) {
    const Passenger = sequelize.define("passenger", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        lastName: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        zipcode: {
            type: Sequelize.INTEGER,
            validate: {
                notEmpty: true,
            }
        },
        state: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        city: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        country: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
    });

    return Passenger;
}