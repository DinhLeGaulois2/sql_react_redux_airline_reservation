module.exports = function (sequelize, Sequelize) {
    const PaymentMethod = sequelize.define("paymentMethod", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        paymentMethodCode: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
    });

    return PaymentMethod;
}