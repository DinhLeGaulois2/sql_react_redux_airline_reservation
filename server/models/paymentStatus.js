module.exports = function (sequelize, Sequelize) {
    const PaymentStatus = sequelize.define("paymentStatus", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        paymentStatusCode: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
    });

    return PaymentStatus;
}