module.exports = function (sequelize, Sequelize) {
    const Payment = sequelize.define("payment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        paymentDate: {
            type: Sequelize.DATE
        },
        paymentAmount: {
            type: Sequelize.INTEGER
        },
    });

    return Payment;
}