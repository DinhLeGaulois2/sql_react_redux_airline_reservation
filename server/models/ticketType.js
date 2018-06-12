module.exports = function (sequelize, Sequelize) {
    const TicketType = sequelize.define("ticketType", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ticketTypeCode: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
    });

    return TicketType;
}